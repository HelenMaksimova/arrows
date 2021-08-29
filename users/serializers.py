from rest_framework import serializers
from users.models import ArrowsUser


class ArrowsUserModelSerializer(serializers.ModelSerializer):
    projects = serializers.HyperlinkedRelatedField('project-detail', many=True, read_only=True)
    notes = serializers.HyperlinkedRelatedField('note-detail', many=True, read_only=True)

    class Meta:
        model = ArrowsUser
        fields = ('username', 'first_name', 'last_name', 'email', 'projects', 'notes')
