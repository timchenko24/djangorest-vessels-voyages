from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework_jwt.serializers import User

from project.serializers import UserSerializer


list_permission_classes = {
    "list": [AllowAny],
    "retrieve": [AllowAny],
    "create": [AllowAny],
    "update": [IsAuthenticated],
    "partial_update": [IsAuthenticated],
    "destroy": [IsAdminUser]
}


class UserViewSet(ModelViewSet):
    queryset = User.objects.exclude(username='admin')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in list_permission_classes[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
