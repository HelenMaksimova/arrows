from rest_framework import serializers
from notes.models import Project, Note


class ProjectModelSerializer(serializers.ModelSerializer):
    notes = serializers.PrimaryKeyRelatedField(many=True, queryset=Note.objects.all(), required=False)

    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'
