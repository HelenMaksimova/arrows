from rest_framework.viewsets import ModelViewSet
from users.models import ArrowsUser
from users.serializers import ArrowsUserModelSerializer


class ArrowsUserViewSet(ModelViewSet):
    serializer_class = ArrowsUserModelSerializer
    queryset = ArrowsUser.objects.all()

