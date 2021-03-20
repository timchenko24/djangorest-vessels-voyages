from django.urls import path, include


urlpatterns = [
    path('clustering/', include('ml.clustering.urls'))
]