from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .queries import queries


class AvailableQueries(APIView):

    def get(self, request):
        titles = ['Дедвейт - Затраты на топливо', 'Длина судна - Прибыль за рейс']

        res = {query: title for query, title in zip(queries.keys(), titles)}

        return Response([res], status=status.HTTP_200_OK)