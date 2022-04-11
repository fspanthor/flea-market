from functools import reduce

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
    if key != 'd' or 'h' or 's' or 'f' or 'c' or 'm':
        item = Items.DVDS.value
    if key == 'd':
        item = Items.DVDS.value
    if key == 'h':
        item = Items.HOT_SAUCE.value
    if key == 's':
        item = Items.SWITCHBLADES.value
    if key == 'f':
        item = Items.FAKE_SHOES.value
    if key == 'c':
        item = Items.CELL_PHONES.value
    if key == 'm':
        item = Items.MASSAGE_CHAIRS.value
    return item
