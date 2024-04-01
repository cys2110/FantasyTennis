import csv
import json
from datetime import datetime

values_list = []

def parse_bool(value):
    if value == 'true':
        return True
    elif value == 'false':
        return False
    else:
        return None

def strip_empty_fields(data):
    return {key: value for key, value in data.items() if value !='' and value is not None}

def parse_array(s):
    if not s:
        return None
    return [item.strip() for item in s[1:-1].split(':')]

def parse_int_array(s):
    if not s:
        return None
    return[int(item.strip()) for item in s[1:-1].split(':')]

def parse_date(date_str):
    if not date_str:
        return None
    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
    return date_obj.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

def parse_int(s):
    return int(s) if s else None

def tournament_csv_to_json(csv_path, json_path):
    with open(csv_path, mode='r', encoding='utf-8-sig') as csv_file:
        csv_data = csv.DictReader(csv_file)
        for row in csv_data:
            tournament = strip_empty_fields({
                '_id': parse_int(row['_id']),
                'name': row['name'],
                'start_year': parse_int(row['start_year']),
                'end_year': parse_int(row['end_year']),
                'active': parse_bool(row['active']),
                'website': row['website']
            })
            values_list.append(tournament)
    with open(json_path, mode='w') as output_file:
        json.dump(values_list, output_file, indent=2)

def edition_csv_to_json(csv_path, json_path):
    with open(csv_path, mode='r', encoding='utf-8-sig') as csv_file:
        csv_data = csv.DictReader(csv_file)
        for row in csv_data:
            edition = strip_empty_fields({
                '_id': parse_int(row['_id']),
                'tourney': parse_int(row['tournament']),
                'year': parse_int(row['year']),
                'sponsor_name': row['sponsor_name'],
                'start_date': parse_date(row['start_date']),
                'end_date': parse_date(row['end_date']),
                'category': row['category'],
                'type_of_draw': parse_int(row['type_of_draw']),
                'currency': row['currency'],
                'prize_money': parse_int(row['prize_money']),
                'tfc': parse_int(row['tfc']),
                'location': strip_empty_fields({
                    'venue': row['venue'],
                    'city': row['city'],
                    'country': row['country']
                }),
                'surface': strip_empty_fields({
                    'environment': row['environment'],
                    'type': row['surface'],
                    'hard_type': row['hard_type']
                }),
                'supervisors': parse_array(row['supervisors']),
                'winner': row['winner'],
                'finalist': row['finalist'],
                'final_score': row['final_score'],
                'awards': strip_empty_fields({
                    'winner': strip_empty_fields({
                        'prize_money': parse_int(row['winner_pm']),
                        'points': parse_int(row['winner_pts'])
                    }),
                    'finalist': strip_empty_fields({
                        'prize_money': parse_int(row['finalist_pm']),
                        'points': parse_int(row['finalist_pts'])
                    }),
                    'semifinalist': strip_empty_fields({
                        'prize_money': parse_int(row['sf_pm']),
                        'points': parse_int(row['sf_pts'])
                    }),
                    'quarterfinalist': strip_empty_fields({
                        'prize_money': parse_int(row['qf_pm']),
                        'points': parse_int(row['qf_pts'])
                    }),
                    'round4': strip_empty_fields({
                        'prize_money': parse_int(row['r4_pm']),
                        'points': parse_int(row['r4_pts'])
                    }),
                    'round3': strip_empty_fields({
                        'prize_money': parse_int(row['r3_pm']),
                        'points': parse_int(row['r3_pts'])
                    }),
                    'round2': strip_empty_fields({
                        'prize_money': parse_int(row['r2_pm']),
                        'points': parse_int(row['r2_pts'])
                    }),
                    'round1': strip_empty_fields({
                        'prize_money': parse_int(row['r1_pm']),
                        'points': parse_int(row['r1_pts'])
                    })
                }),
                'seeds': [{
                    'seed': 1,
                    'player': row['seed1'],
                    'rank': parse_int(row['seed1_rank'])
                },
                {
                    'seed': 2,
                    'player': row['seed2'],
                    'rank': parse_int(row['seed2_rank'])
                },
                {
                    'seed': 3,
                    'player': row['seed3'],
                    'rank': parse_int(row['seed3_rank'])
                },
                {
                    'seed': 4,
                    'player': row['seed4'],
                    'rank': parse_int(row['seed4_rank'])
                },
                {
                    'seed': 5,
                    'player': row['seed5'],
                    'rank': parse_int(row['seed5_rank'])
                },
                {
                    'seed': 6,
                    'player': row['seed6'],
                    'rank': parse_int(row['seed6_rank'])
                },
                {
                    'seed': 7,
                    'player': row['seed7'],
                    'rank': parse_int(row['seed7_rank'])
                },
                {
                    'seed': 8,
                    'player': row['seed8'],
                    'rank': parse_int(row['seed8_rank'])
                },
                {
                    'seed': 9,
                    'player': row['seed9'],
                    'rank': parse_int(row['seed9_rank'])
                },
                {
                    'seed': 10,
                    'player': row['seed10'],
                    'rank': parse_int(row['seed10_rank'])
                },
                {
                    'seed': 11,
                    'player': row['seed11'],
                    'rank': parse_int(row['seed11_rank'])
                },
                {
                    'seed': 12,
                    'player': row['seed12'],
                    'rank': parse_int(row['seed12_rank'])
                },
                {
                    'seed': 13,
                    'player': row['seed13'],
                    'rank': parse_int(row['seed13_rank'])
                },
                {
                    'seed': 14,
                    'player': row['seed14'],
                    'rank': parse_int(row['seed14_rank'])
                },
                {
                    'seed': 15,
                    'player': row['seed15'],
                    'rank': parse_int(row['seed15_rank'])
                },
                {
                    'seed': 16,
                    'player': row['seed16'],
                    'rank': parse_int(row['seed16_rank'])
                },
                {
                    'seed': 17,
                    'player': row['seed17'],
                    'rank': parse_int(row['seed17_rank'])
                },
                {
                    'seed': 18,
                    'player': row['seed18'],
                    'rank': parse_int(row['seed18_rank'])
                },
                {
                    'seed': 19,
                    'player': row['seed19'],
                    'rank': parse_int(row['seed19_rank'])
                },
                {
                    'seed': 20,
                    'player': row['seed20'],
                    'rank': parse_int(row['seed20_rank'])
                },
                {
                    'seed': 21,
                    'player': row['seed21'],
                    'rank': parse_int(row['seed21_rank'])
                },
                {
                    'seed': 22,
                    'player': row['seed22'],
                    'rank': parse_int(row['seed22_rank'])
                },
                {
                    'seed': 23,
                    'player': row['seed23'],
                    'rank': parse_int(row['seed23_rank'])
                },
                {
                    'seed': 24,
                    'player': row['seed24'],
                    'rank': parse_int(row['seed24_rank'])
                },
                {
                    'seed': 25,
                    'player': row['seed25'],
                    'rank': parse_int(row['seed25_rank'])
                },
                {
                    'seed': 26,
                    'player': row['seed26'],
                    'rank': parse_int(row['seed26_rank'])
                },
                {
                    'seed': 27,
                    'player': row['seed27'],
                    'rank': parse_int(row['seed27_rank'])
                },
                {
                    'seed': 28,
                    'player': row['seed28'],
                    'rank': parse_int(row['seed28_rank'])
                },
                {
                    'seed': 29,
                    'player': row['seed29'],
                    'rank': parse_int(row['seed29_rank'])
                },
                {
                    'seed': 30,
                    'player': row['seed30'],
                    'rank': parse_int(row['seed30_rank'])
                },
                {
                    'seed': 31,
                    'player': row['seed31'],
                    'rank': parse_int(row['seed31_rank'])
                },
                {
                    'seed': 32,
                    'player': row['seed32'],
                    'rank': parse_int(row['seed32_rank'])
                }],
                'entry_info': strip_empty_fields({
                    'lda': strip_empty_fields({
                        'player': row['lda_player'],
                        'rank': parse_int(row['lda_rank'])
                    }),
                    'lls': parse_array(row['lls']),
                    'alts': parse_array(row['alts'])
                })
            })
            values_list.append(edition)
    with open(json_path, mode='w') as output_file:
        json.dump(values_list, output_file, indent=2)

# edition_csv_to_json('./editions.csv', './editions.json')
        
def matchScore_csv_to_json(csv_path, json_path):
    with open(csv_path, mode='r', encoding='utf-8-sig') as csv_file:
        csv_data = csv.DictReader(csv_file)
        for row in csv_data:
            match = strip_empty_fields({
                'edition': parse_int(row['edition']),
                'round': row['round'],
                'match_no': parse_int(row['no']),
                'player_1': row['p1'],
                'player_1_full_name': row['p1name'],
                'player_1_seed': parse_int(row['p1seed']),
                'player_1_status': row['p1status'],
                'player_1_rank': parse_int(row['p1rank']),
                'player_2': row['p2'],
                'player_2_full_name': row['p2name'],
                'player_2_seed': parse_int(row['p2seed']),
                'player_2_status': row['p2status'],
                'player_2_rank': parse_int(row['p2rank']),
                'winner': parse_int(row['winner']),
                'winner_id': row['winnerid'],
                'duration_mins': parse_int(row['duration']),
                'bye': parse_bool(row['bye']),
                'retirement': parse_bool(row['ret']),
                'default': parse_bool(row['def']),
                'walkover': parse_bool(row['wo']),
                'umpire': row['ump'],
                'date': parse_date(row['date']),
                'score': strip_empty_fields({
                    'set1': parse_int_array(row['set1']),
                    'tiebreak1': parse_int_array(row['tb1']),
                    'set2': parse_int_array(row['set2']),
                    'tiebreak2': parse_int_array(row['tb2']),
                    'set3': parse_int_array(row['set3']),
                    'tiebreak3': parse_int_array(row['tb3']),
                    'set4': parse_int_array(row['set4']),
                    'tiebreak4': parse_int_array(row['tb4']),
                    'set5': parse_int_array(row['set5']),
                    'tiebreak5': parse_int_array(row['tb5'])
                })
            })
            values_list.append(match)
    with open(json_path, mode='w') as output_file:
        json.dump(values_list, output_file, indent=2)

matchScore_csv_to_json('./matchScore.csv', './matchScore.json')

def player_csv_to_json(csv_path, json_path):
    with open(csv_path, mode='r', encoding='utf-8-sig') as csv_file:
        csv_data = csv.DictReader(csv_file)
        for row in csv_data:

            player = {
                '_id': row['_id'],
                'first_name': row['first_name'],
                'last_name': row['last_name'],
                'status': strip_empty_fields({
                    'active': parse_bool(row['active']),
                    'turned_pro': parse_int(row['turned_pro']),
                    'retired': parse_int(row['retired'])
                }),
                'country': row['country'],
                'country_yr': parse_int(row['country_yr']),
                'prev_country': row['prev_country'],
                'prev_country_yr': parse_int(row['prev_country_yr']),
                'dob': parse_date(row['dob']),
                'right_handed': parse_bool(row['right_handed']),
                'backhand': parse_int(row['backhand']),
                'height': strip_empty_fields({
                    'cm': row['cm'],
                    'ft': row['ft']
                }),
                'coaches': parse_array(row['coaches']),
                'preferred_surface': parse_array(row['preferred_surface']),
                'age_started': parse_int(row['age_started']),
                'rank': strip_empty_fields({
                    'career_high': parse_int(row['career_high']),
                    'date': parse_date(row['date'])
                }),
                'pm_USD': parse_int(row['pm_USD']),
                'titles': parse_int(row['titles']),
                'gladiator': parse_bool(row['gladiator']),
                'headshot': parse_bool(row['headshot']),
                'majors': strip_empty_fields({
                    'ao': strip_empty_fields({
                        'round': row['ao_round'],
                        'years': parse_int_array(row['ao_years']),
                    }),
                    'rg': strip_empty_fields({
                        'round': row['rg_round'],
                        'years': parse_int_array(row['rg_years']),
                    }),
                    'wimbledon': strip_empty_fields({
                        'round': row['w_round'],
                        'years': parse_int_array(row['w_years']),
                    }),
                    'uso': strip_empty_fields({
                        'round': row['uso_round'],
                        'years': parse_int_array(row['uso_years']),
                    }),
                    'finals': strip_empty_fields({
                        'round': row['finals_round'],
                        'years': parse_int_array(row['finals_years']),
                    }),
                    'gs_cup': strip_empty_fields({
                        'round': row['gs_cup_round'],
                        'years': parse_int_array(row['gs_cup_years']),
                    }),
                    'olympics': strip_empty_fields({
                        'round': row['olympics_round'],
                        'years': parse_int_array(row['olympics_years']),
                    }),
                    'wct': strip_empty_fields({
                        'round': row['wct_round'],
                        'years': parse_int_array(row['wct_years']),
                    }),
                    'davis': strip_empty_fields({
                        'round': row['davis_round'],
                        'years': parse_int_array(row['davis_years']),
                    }),
                    'hopman': strip_empty_fields({
                        'round': row['hopman_round'],
                        'years': parse_int_array(row['hopman_years']),
                    }),
                })
            }

            player=strip_empty_fields(player)

            values_list.append(player)

    with open(json_path, mode='w') as output_file:
        json.dump(values_list, output_file, indent=2)

# player_csv_to_json('./players.csv', './players.json')