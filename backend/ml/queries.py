import pandas as pd
from core.models import Voyage


queries = dict()

queries['dwt_fuel'] = pd.DataFrame({'dwt': v.mmsi.dwt, 'fuel_costs': v.fuel_costs} for v in Voyage.objects.all())
queries['length_profit'] = pd.DataFrame({'lenght': v.mmsi.length, 'voyage_profit': v.voyage_profit} for v in Voyage.objects.all())