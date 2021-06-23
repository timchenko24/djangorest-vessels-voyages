from rest_framework import status, permissions, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from ..utils import get_query_data, label_clustered_data, process_query_params
from sklearn.cluster import KMeans, AgglomerativeClustering


class KMeansView(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        df = get_query_data(key=request.query_params.get('query'))

        k = int(request.query_params.get('k', 3))
        df = process_query_params(df, request.query_params)

        kmeans = KMeans(n_clusters=k).fit(df)

        result = label_clustered_data(df=df, labels=kmeans.labels_)

        return Response(result, status=status.HTTP_200_OK)


class AgglomerativeView(APIView):

    def get(self, request):
        df = get_query_data(key=request.query_params.get('query'))

        linkage = request.query_params.get('linkage', 'single')
        df = process_query_params(df, request.query_params)

        agg = AgglomerativeClustering(linkage=linkage).fit(df)

        result = label_clustered_data(df=df, labels=agg.labels_)

        return Response(result, status=status.HTTP_200_OK)