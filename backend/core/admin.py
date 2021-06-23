from django.contrib import admin
from .models import VesselType, VesselBuild, VesselFlag, Vessel, PortCountry, Port, Route, Date, Voyage


admin.site.register(VesselType)
admin.site.register(VesselBuild)
admin.site.register(VesselFlag)
admin.site.register(Vessel)
admin.site.register(PortCountry)
admin.site.register(Port)
admin.site.register(Route)
admin.site.register(Date)
admin.site.register(Voyage)
