from functools import reduce
import random
from ..constants import Items


def to_camel_case(str):
    if len(str) > 0:
        temp = str.split('_')
        res = temp[0] + ''.join(ele.title() for ele in temp[1:])
        return res
    else:
        return str


def dict_keys_to_camel_case(dict):
    dict_copy = dict.copy()
    for key in dict:
        dict_copy[to_camel_case(key)] = dict_copy.pop(key)
    return dict_copy


def to_snake_case(str):
    temp = str
    return reduce(lambda x, y: x + ('_' if y.isupper() else '') + y, temp).lower()


def get_params_if_params_exist(request):
    if request.json.get('params') is None:
        return None
    else:
        return request.get_json()['params']


def get_item_for_key(key):
    # this is a safety measure in case a bad character makes it to this function
    if key != 'd' or 'h' or 's' or 'f' or 'c' or 'm' or 'D' or 'H' or 'S' or 'F' or 'C' or 'M':
        item = Items.DVDS.value
    if key == 'd' or key == 'D':
        item = Items.DVDS.value
    if key == 'h' or key == 'H':
        item = Items.HOT_SAUCE.value
    if key == 's' or key == 'S':
        item = Items.SWITCHBLADES.value
    if key == 'f' or key == 'F':
        item = Items.FAKE_SHOES.value
    if key == 'c' or key == 'C':
        item = Items.CELL_PHONES.value
    if key == 'm' or key == 'M':
        item = Items.MASSAGE_CHAIRS.value
    return item


def randomize(lower_bound, upper_bound):
    return round(random.randint(lower_bound, upper_bound)/10)*10


def d_100_dice_roll():
    return random.randint(1, 100)
