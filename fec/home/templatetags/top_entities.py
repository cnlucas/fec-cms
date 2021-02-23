from django import template
from data import constants

from django.conf import settings
from data import utils

register = template.Library()


@register.inclusion_tag('partials/raising-spending.html')
def raising_spending(request):
    office = request.GET.get('office', 'S')

    election_year = int(request.GET.get('election_year', constants.DEFAULT_ELECTION_YEAR))

    max_election_year = utils.current_cycle() + 4
    election_years = utils.get_cycles(max_election_year)

    FEATURES = settings.FEATURES

    return {
        'name_field': 'name',
        'id_field:': 'candidate_id',
        'candidate': 'candidate_id',
        'action': 'raised',
        'title': 'Raising: by the numbers',
        'election_years': election_years,
        'election_year': election_year,
        'office': office,
        'FEATURES': FEATURES
    }
