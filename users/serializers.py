from rest_framework.serializers import HyperlinkedModelSerializer
from users.models import ArrowsUser


class ArrowsUserModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = ArrowsUser
        fields = ('username', 'first_name', 'last_name', 'email')
