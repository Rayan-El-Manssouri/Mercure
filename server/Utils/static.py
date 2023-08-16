import json

def serve_static_file(route):
    with open("./server/Utils/files_patchs.json", "r") as json_file:
        file_paths = json.load(json_file)
    if route in file_paths:
        file_info = file_paths[route]
        emplacement_connect = file_info['path']
        extension = file_info['extension']
        with open(emplacement_connect, 'rb') as f:
            data = f.read()    
            content_type = extension
        return data, 200, {'Content-Type': content_type}