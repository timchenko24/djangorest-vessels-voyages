from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .queries import queries


class AvailableQueries(APIView):

    def get(self, request):
        titles = ['Дедвейт - Затраты на топливо', 'Длина судна - Прибыль за рейс']
        titled_queries = {title: query for query, title in zip(queries.keys(), titles)}

        funcs = {
          'Без преобразования': '',
          'MinMax': 'minmax',
          'Standard': 'std',
          'Log': 'log',
        }

        algs = {
          'Agglomerative': 'agglomerative',
          'K-means': 'kmeans',
        }

        linkages = {
            'Single': 'single',
            'Complete': 'complete',
            'Average': 'average',
            'Ward': 'ward',
        }

        return Response({'datasets': titled_queries, 'funcs': funcs, 'algs': algs, 'linkages': linkages}, status=status.HTTP_200_OK)