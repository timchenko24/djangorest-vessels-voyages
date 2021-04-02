from django.urls import path, include

from ml.clustering.views import KMeansView, AgglomerativeView

urlpatterns = [
    path('kmeans/', KMeansView.as_view()),
    path('agglomerative/', AgglomerativeView.as_view())
]