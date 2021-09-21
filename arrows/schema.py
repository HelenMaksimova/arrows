import graphene
from graphene_django import DjangoObjectType

from notes.models import Note, Project
from users.models import ArrowsUser


class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = ArrowsUser
        fields = '__all__'


class Query(graphene.ObjectType):
    notes_all = graphene.List(NoteType)
    projects_all = graphene.List(ProjectType)
    users_all = graphene.List(UserType)
    users_by_project = graphene.List(UserType, pk=graphene.Int(required=True))
    notes_by_project = graphene.List(NoteType, pk=graphene.Int(required=True))
    notes_by_user = graphene.List(NoteType, pk=graphene.Int(required=True))
    projects_by_user = graphene.List(ProjectType, pk=graphene.Int(required=True))
    user_by_username = graphene.Field(UserType, username=graphene.String(required=True))

    def resolve_notes_all(self, info):
        return Note.objects.all()

    def resolve_projects_all(self, info):
        return Project.objects.all()

    def resolve_users_all(self, info):
        return ArrowsUser.objects.all()

    def resolve_users_by_project(self, info, pk):
        project = Project.objects.filter(pk=pk).first()
        return project.users.all()

    def resolve_notes_by_project(self, info, pk):
        project = Project.objects.filter(pk=pk).first()
        return project.notes.all()

    def resolve_notes_by_user(self, info, pk):
        user = ArrowsUser.objects.filter(pk=pk).first()
        return user.notes.all()

    def resolve_projects_by_user(self, info, pk):
        user = ArrowsUser.objects.filter(pk=pk).first()
        result = [project for project in Project.objects.all() if user in project.users.all()]
        return result

    def resolve_user_by_username(self, username):
        return ArrowsUser.objects.filter(username=username).first()


schema = graphene.Schema(query=Query)
