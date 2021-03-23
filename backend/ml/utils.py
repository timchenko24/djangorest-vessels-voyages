from django.http import Http404
from .queries import queries


def get_query_data(key):
    try:
        return queries[key]
    except KeyError:
        raise Http404


def label_clustered_data(df, labels):
    return [{'point': {'x': col1, 'y': col2}, 'label': lbl}
            for col1, col2, lbl in zip(df[list(df.columns)[0]], df[list(df.columns)[1]], labels)]
