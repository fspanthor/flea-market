def to_camel_case(str):
    temp = str.split('_')
    res = temp[0] + ''.join(ele.title() for ele in temp[1:])
    return res


def dict_keys_to_camel_case(dict):
    for key in dict.copy():
        dict[to_camel_case(key)] = dict.pop(key)


def get_params_if_params_exist(request):
    if request.json.get('params') is None:
        return None
    else:
        return request.get_json()['params']
