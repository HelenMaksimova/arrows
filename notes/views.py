from rest_framework.viewsets import ModelViewSet
from notes.models import Project, Note
from notes.serializers import ProjectModelSerializer, NoteModelSerializer


class NotesViewSet(ModelViewSet):
    serializer_class = NoteModelSerializer
    queryset = Note.objects.all()


class ProjectsViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
