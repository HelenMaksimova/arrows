from rest_framework import serializers
from users.models import ArrowsUser


class ArrowsUserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ArrowsUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'projects', 'notes')


class ArrowsUserWideModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ArrowsUser
        fields = ('id',
                  'username',
                  'first_name',
                  'last_name',
                  'email',
                  'is_superuser',
                  'is_staff',
                  'projects',
                  'notes')
