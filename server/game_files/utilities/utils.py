from functools import reduce


def to_camel_case(str):
    temp = str.split('_')
    res = temp[0] + ''.join(ele.title() for ele in temp[1:])
    return res


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
