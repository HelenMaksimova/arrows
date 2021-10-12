from rest_framework import serializers
from users.models import ArrowsUser


class ArrowsUserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ArrowsUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'projects', 'owned_projects', 'notes')
