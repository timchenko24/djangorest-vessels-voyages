from django.urls import path, include
from .views import AvailableQueries


urlpatterns = [
    path('clustering/', include('ml.clustering.urls')),
    path('clustering/', AvailableQueries.as_view())
]