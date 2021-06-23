from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


from core.models import *


class VesselTypeSerializer(ModelSerializer):
    class Meta:
        model = VesselType
        fields = '__all__'


class VesselBuildSerializer(ModelSerializer):
    class Meta:
        model = VesselBuild
        fields = '__all__'


class VesselFlagSerializer(ModelSerializer):
    class Meta:
        model = VesselFlag
        fields = '__all__'


class VesselSerializer(ModelSerializer):
    type = serializers.StringRelatedField()
    flag = serializers.StringRelatedField()
    build = serializers.StringRelatedField()

    class Meta:
        model = Vessel
        fields = '__all__'


class PortCountrySerializer(ModelSerializer):
    class Meta:
        model = PortCountry
        fields = '__all__'


class PortSerializer(ModelSerializer):
    country = serializers.StringRelatedField()

    class Meta:
        model = Port
        fields = '__all__'


class RouteSerializer(ModelSerializer):
    departure_port = serializers.StringRelatedField()
    destination_port = serializers.StringRelatedField()

    class Meta:
        model = Route
        fields = '__all__'


class DateSerializer(ModelSerializer):
    class Meta:
        model = Date
        fields = '__all__'


class VoyageSerializer(ModelSerializer):
    route = serializers.StringRelatedField()
    mmsi = serializers.StringRelatedField()
    departure_date = serializers.StringRelatedField()
    arrival_date = serializers.StringRelatedField()

    class Meta:
        model = Voyage
        fields = '__all__'
