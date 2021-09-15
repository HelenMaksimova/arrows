from rest_framework import serializers
from notes.models import Project, Note
from users.serializers import ArrowsUserModelSerializer


class ProjectModelSerializer(serializers.ModelSerializer):
    users = ArrowsUserModelSerializer(many=True, read_only=True)
    notes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(serializers.ModelSerializer):
    project = ProjectModelSerializer()
    created_by_user = ArrowsUserModelSerializer()

    class Meta:
        model = Note
        fields = '__all__'
