from rest_framework.viewsets import ModelViewSet
from notes.filters import ProjectFilter, NoteFilter
from notes.models import Project, Note
from notes.serializers import ProjectModelSerializer, NoteModelSerializer
from rest_framework.pagination import LimitOffsetPagination


class NotesLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 40


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 30


class NotesViewSet(ModelViewSet):
    serializer_class = NoteModelSerializer
    queryset = Note.objects.all()
    pagination_class = NotesLimitOffsetPagination
    filterset_class = NoteFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class ProjectsViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
