from django.http import Http404
from rest_framework import status, permissions, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import *
from ..queries import queries
from ..utils import get_query_data, label_clustered_data
from sklearn.cluster import KMeans, AgglomerativeClustering
import numpy as np


class KMeansView(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, key):
        df = get_query_data(key=key)

        k = int(request.query_params.get('k', 3))
        log_bool = bool(request.query_params.get('log', False))

        df = np.log(df) if log_bool else df

        kmeans = KMeans(n_clusters=k).fit(df)

        result = label_clustered_data(df=df, labels=kmeans.labels_)

        return Response({'result': result}, status=status.HTTP_200_OK)


class AgglomerativeView(APIView):

    def get(self, request, key):
        df = get_query_data(key=key)

        linkage = request.query_params.get('linkage', 'single')
        log_bool = bool(request.query_params.get('log', False))

        df = np.log(df) if log_bool else df

        agg = AgglomerativeClustering(linkage=linkage).fit(df)

        result = label_clustered_data(df=df, labels=agg.labels_)

        return Response({'result': result}, status=status.HTTP_200_OK)