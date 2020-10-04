from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework_jwt.serializers import User

from project.serializers import UserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.exclude(username='admin')
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)

        return super(UserViewSet, self).get_permissions()