from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from users.models import ArrowsUser
from users.serializers import ArrowsUserModelSerializer, ArrowsUserWideModelSerializer


class ArrowsUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = ArrowsUser.objects.all()

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return ArrowsUserWideModelSerializer
        return ArrowsUserModelSerializer

