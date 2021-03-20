from django.http import Http404
from rest_framework import status, permissions, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import *
from ..queries import queries
from sklearn.cluster import KMeans, AgglomerativeClustering
import numpy as np


class KMeansView(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    def get_data(self, key):
        try:
            return queries[key]
        except KeyError:
            raise Http404

    def label_clustered_data(self, df, labels):
        return [{'point': {'x': col1, 'y': col2}, 'label': lbl}
                  for col1, col2, lbl in zip(df[list(df.columns)[0]], df[list(df.columns)[1]], labels)]

    def get(self, request, key):
        df = self.get_data(key=key)

        kmeans = KMeans(n_clusters=3).fit(df)

        result = self.label_clustered_data(df=df, labels=kmeans.labels_)

        return Response({'result': result}, status=status.HTTP_200_OK)

    def post(self, request, key):
        df = self.get_data(key=key)

        k = request.data.get('k') or 3
        log_bool = bool(request.data.get('log'))

        df = np.log(df) if log_bool else df

        kmeans = KMeans(n_clusters=k).fit(df)

        result = self.label_clustered_data(df=df, labels=kmeans.labels_)

        return Response({'test': result}, status=status.HTTP_200_OK)
