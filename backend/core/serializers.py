from rest_framework.serializers import ModelSerializer
from core.models import *


class VesselTypeSerializer(ModelSerializer):
    class Meta:
        model = VesselType
        fields = ('__all__')


class VesselBuildSerializer(ModelSerializer):
    class Meta:
        model = VesselBuild
        fields = ('__all__')


class VesselFlagSerializer(ModelSerializer):
    class Meta:
        model = VesselFlag
        fields = ('__all__')


class VesselSerializer(ModelSerializer):
    class Meta:
        model = Vessel
        fields = ('__all__')


class PortCountrySerializer(ModelSerializer):
    class Meta:
        model = PortCountry
        fields = ('__all__')


class PortSerializer(ModelSerializer):
    class Meta:
        model = Port
        fields = ('__all__')


class RouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = ('__all__')


class DateSerializer(ModelSerializer):
    class Meta:
        model = Date
        fields = ('__all__')


class VoyageSerializer(ModelSerializer):
    class Meta:
        model = Voyage
        fields = ('__all__')