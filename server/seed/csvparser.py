import csv
import json
from datetime import datetime

values_list = []

def parse_bool(value):
    if value == 'true':
        return True
    elif value == 'false':
        return False

def strip_empty_fields(data):
    return {key: value for key, value in data.items() if value !=''}

def parse_array(s):
    return [item.strip() for item in s[1:-1].split(':')]

def parse_int_array(s):
    return[int(item.strip()) for item in s[1:-1].split(':')]

def parse_date(date_str):
    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
    return date_obj.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

def player_csv_to_json(csv_path, json_path):
    with open(csv_path, mode='r', encoding='utf-8-sig') as csv_file:
        csv_data = csv.DictReader(csv_file)
        for row in csv_data:
            player = strip_empty_fields({
                '_id': row['_id'],
                # 'first_name': row['first_name'],
                # 'last_name': row['last_name'],
                # 'status': strip_empty_fields({
                #     'active': parse_bool(row['active']),
                #     'turned_pro': int(row['turned_pro']),
                #     'retired': int(row['retired'])
                # }),
                # 'country': parse_array(row['country']),
                # 'birthday': parse_date(row['birthday']),
                # 'right_handed': parse_bool(row['right_handed']),
                # 'backhand': int(row['backhand']),
                # 'height': strip_empty_fields({
                #     'cm': row['cm'],
                #     'ft': parse_int_array(row['ft'])
                # }),
                # 'coach': parse_array(row['coach']),
                # 'fav_surface': parse_array(row['fav_surface']),
                # 'age_started': int(row['age_started']),
                # 'rank': strip_empty_fields({
                #     'career_high': int(row['career_high']),
                #     'date': parse_date(row['career_high'])
                # }),
                # 'pm_USD': int(row['pm_USD']),
                # 'titles': parse_int_array(row['titles']),
                # 'gladiator': parse_bool(row['gladiator']),
                'headshot': parse_bool(row['headshot'])
            })

            values_list.append(player)

    with open(json_path, mode='w') as output_file:
        json.dump(values_list, output_file, indent=2)

player_csv_to_json('./players.csv', './players.json')