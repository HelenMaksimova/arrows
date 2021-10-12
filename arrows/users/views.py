from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from users.models import ArrowsUser
from users.serializers import ArrowsUserModelSerializer


class ArrowsUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = ArrowsUser.objects.all()
    serializer_class = ArrowsUserModelSerializer
