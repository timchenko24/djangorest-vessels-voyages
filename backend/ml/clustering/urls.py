from django.urls import path, include

from ml.clustering.views import KMeansView, AgglomerativeView

urlpatterns = [
    path('kmeans/<str:key>/', KMeansView.as_view())
]