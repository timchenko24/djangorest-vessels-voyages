from django.http import Http404
from .queries import queries
from sklearn.preprocessing import StandardScaler, MinMaxScaler, FunctionTransformer
import numpy as np
import pandas as pd


def get_query_data(key):
    try:
        return queries[key]
    except KeyError:
        raise Http404


def label_clustered_data(df, labels):
    return [{'point': {'x': col1, 'y': col2}, 'label': lbl}
            for col1, col2, lbl in zip(df[list(df.columns)[0]], df[list(df.columns)[1]], labels)]


def process_query_params(df, params):
    new_df = df

    conditions = {
        "log": FunctionTransformer(np.log1p, validate=True).transform,
        "std": StandardScaler().fit_transform,
        "minmax": MinMaxScaler().fit_transform
    }

    for key in params.keys():
        if key in conditions:
            new_df = conditions[key](df)

    return pd.DataFrame(new_df, index=df.index, columns=df.columns)
