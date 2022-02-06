def get_params_if_params_exist(request):
    if request.json.get('params') is None:
        return None
    else:
        return request.get_json()['params']
