from django.http import JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.viewsets import ModelViewSet, ViewSet

from core.serializers import *
from core.models import *


class VesselTypeViewSet(ModelViewSet):
    serializer_class = VesselTypeSerializer
    queryset = VesselType.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class VesselBuildViewSet(ModelViewSet):
    serializer_class = VesselBuildSerializer
    queryset = VesselBuild.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class VesselFlagViewSet(ModelViewSet):
    serializer_class = VesselFlagSerializer
    queryset = VesselFlag.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class VesselViewSet(ModelViewSet):
    serializer_class = VesselSerializer
    queryset = Vessel.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class PortCountryViewSet(ModelViewSet):
    serializer_class = PortCountrySerializer
    queryset = PortCountry.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class PortViewSet(ModelViewSet):
    serializer_class = PortSerializer
    queryset = Port.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class RouteViewSet(ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class DateViewSet(ModelViewSet):
    serializer_class = DateSerializer
    queryset = Date.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class VoyageViewSet(ModelViewSet):
    serializer_class = VoyageSerializer
    queryset = Voyage.objects.all()

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]