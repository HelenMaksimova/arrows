from random import choice
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from rest_framework import status
from notes.models import Project, Note
from notes.views import ProjectsViewSet
from mixer.backend.django import mixer
from users.models import ArrowsUser


class TestProjectsViewSet(TestCase):
    API_URL = 'http://127.0.0.1:8000/api/projects/'

    def setUp(self):
        self.factory = APIRequestFactory()
        self.new_project = {
            'name': 'project1'
        }
        self.user_data = {
            'username': 'django',
            'email': 'test@example.com',
            'password': 'geekbrains'
        }
        self.user = get_user_model().objects.create_superuser(**self.user_data)
        self.client = APIClient()

    def test_get_list_guest(self):
        request = self.factory.get(self.API_URL)
        view = ProjectsViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project(self):
        request = self.factory.post(self.API_URL, self.new_project, format='json')
        force_authenticate(request, self.user)
        view = ProjectsViewSet.as_view({'post': 'create'})
        response = view(request)
        response.render()
        print('\ncreate_project', response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail_project(self):
        project = mixer.blend(Project)
        self.client.force_authenticate(self.user)
        response = self.client.get(f'{self.API_URL}{project.id}/')
        print('\nget_detail_project', response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_project(self):
        project = mixer.blend(Project)
        print('\nupdate_project', project.name)
        self.client.force_authenticate(self.user)
        response = self.client.put(f'{self.API_URL}{project.id}/', {'name': 'new_project'})
        print('\nupdate_project', response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_project(self):
        projects = mixer.cycle().blend(Project)
        print('\ndelete_project', Project.objects.all())
        self.client.force_authenticate(self.user)
        self.client.delete(f'{self.API_URL}{projects[-1].id}/')
        print('\ndelete_project', Project.objects.all())
        self.assertEqual(len(projects) - 1, len(Project.objects.all()))


class TestNotesViewSet(APITestCase):
    API_URL = 'http://127.0.0.1:8000/api/notes/'

    def setUp(self):
        self.user_data = {
            'username': 'django',
            'email': 'test@example.com',
            'password': 'geekbrains'
        }
        self.user = get_user_model().objects.create_superuser(**self.user_data)
        self.notes = mixer.cycle().blend(Note)

    def test_get_list_notes(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(self.API_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_note(self):
        note = choice(self.notes)
        self.client.force_authenticate(self.user)
        response = self.client.get(f'{self.API_URL}{note.id}/')
        print('\nget_detail_note', response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_note(self):
        user = choice(ArrowsUser.objects.all())
        project = choice(Project.objects.all())
        self.client.force_authenticate(self.user)
        data = {
            'project': project.id,
            'created_by_user': user.id,
            'text': 'text'
        }
        response = self.client.post(self.API_URL, data)
        print('\ncreate_note', data)
        print('\ncreate_note', response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_note(self):
        note = choice(Note.objects.all())
        print('\nupdate_note', note.text)
        new_text = 'new text'
        self.client.force_authenticate(self.user)
        response = self.client.put(f'{self.API_URL}{note.id}/', {'project': note.project.id, 'text': new_text})
        print('\nupdate_note', response.content)
        self.assertEqual(Note.objects.get(id=note.id).text, new_text)
