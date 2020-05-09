from django.urls import path, include
from rest_framework.routers import DefaultRouter

from core.views import *


router = DefaultRouter()
router.register('vessel-type', VesselTypeViewSet)
router.register('vessel-build-year', VesselBuildViewSet)
router.register('vessel-flag', VesselFlagViewSet)
router.register('vessel', VesselViewSet)
router.register('port-country', PortCountryViewSet)
router.register('port', PortViewSet)
router.register('route', RouteViewSet)
router.register('voyage', VoyageViewSet)
router.register('date', DateViewSet)

urlpatterns = router.urls