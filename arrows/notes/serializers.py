from rest_framework import serializers
from notes.models import Project, Note
from users.models import ArrowsUser
from users.serializers import ArrowsUserModelSerializer


class ProjectModelSerializer(serializers.ModelSerializer):
    users = ArrowsUserModelSerializer(many=True, required=False)
    notes = serializers.PrimaryKeyRelatedField(many=True, queryset=Note.objects.all(), required=False)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectBaseModelSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, queryset=ArrowsUser.objects.all(), required=False)
    notes = serializers.PrimaryKeyRelatedField(many=True, queryset=Note.objects.all(), required=False)

    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(serializers.ModelSerializer):
    project = ProjectModelSerializer()
    created_by_user = ArrowsUserModelSerializer()

    class Meta:
        model = Note
        fields = '__all__'


class NoteBaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
