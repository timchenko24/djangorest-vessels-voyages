from rest_framework.viewsets import ModelViewSet, ViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from core.serializers import *
from core.models import *


class VesselTypeViewSet(ModelViewSet):
    serializer_class = VesselTypeSerializer
    queryset = VesselType.objects.all()


class VesselBuildViewSet(ModelViewSet):
    serializer_class = VesselBuildSerializer
    queryset = VesselBuild.objects.all()


class VesselFlagViewSet(ModelViewSet):
    serializer_class = VesselFlagSerializer
    queryset = VesselFlag.objects.all()


class VesselViewSet(ModelViewSet):
    serializer_class = VesselSerializer
    queryset = Vessel.objects.all()

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = {'type': ['in'],
                        'flag': ['in'],
                        'build__year': ['gte', 'lte'],
                        'length': ['gte', 'lte'],
                        'width': ['gte', 'lte'],
                        'grt': ['gte', 'lte'],
                        'dwt': ['gte', 'lte']}
    ordering_fields = ['type', 'flag', 'build', 'name', 'length', 'width', 'grt', 'dwt']
    search_fields = ['mmsi', 'type__type', 'flag__flag', 'build__year', 'name', 'imo', 'call_sign', 'length', 'width',
                     'grt', 'dwt']


class PortCountryViewSet(ModelViewSet):
    serializer_class = PortCountrySerializer
    queryset = PortCountry.objects.all()


class PortViewSet(ModelViewSet):
    serializer_class = PortSerializer
    queryset = Port.objects.all()


class RouteViewSet(ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all()


class DateViewSet(ModelViewSet):
    serializer_class = DateSerializer
    queryset = Date.objects.all()


class VoyageViewSet(ModelViewSet):
    serializer_class = VoyageSerializer
    queryset = Voyage.objects.all()

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = {'route': ['in'],
                        'mmsi': ['in'],
                        'departure_date': ['in'],
                        'arrival_date': ['in'],
                        'time_in_port': ['gte', 'lte'],
                        'fuel_costs': ['gte', 'lte'],
                        'crew_costs': ['gte', 'lte'],
                        'port_charges': ['gte', 'lte'],
                        'insurance_costs': ['gte', 'lte'],
                        'total_costs': ['gte', 'lte'],
                        'cargo_income': ['gte', 'lte'],
                        'net_total_freight': ['gte', 'lte'],
                        'voyage_profit': ['gte', 'lte'],
                        }
    ordering_fields = ['route', 'mmsi', 'departure_date', 'arrival_date', 'time_in_port', 'fuel_costs', 'crew_costs',
                       'port_charges', 'insurance_costs', 'total_costs', 'cargo_income', 'net_total_freight',
                       'voyage_profit']
    search_fields = ['route', 'mmsi', 'departure_date', 'arrival_date', 'time_in_port', 'fuel_costs', 'crew_costs',
                     'port_charges', 'insurance_costs', 'total_costs', 'cargo_income', 'net_total_freight',
                     'voyage_profit']
