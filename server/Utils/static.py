import json

def serve_static_file(route):
    with open("./server/www/admin/route.json", "r") as json_file:
        data = json.load(json_file)

    # Extract the base path and files information from the JSON
    base_path = data.get("base_path", "")
    files = data.get("route", {})

    # Determine the file category and route within the category
    file_category = None
    file_route = None
    for category, category_files in files.items():
        if route in category_files:
            file_category = category
            file_route = route
            break

    if file_category and file_route:
        file_info = files[file_category][file_route]
        emplacement = base_path + file_info["path"]
        content_type = file_info.get("mine-type", files[file_category]["_common"]["mine-type"])

        with open(emplacement, 'rb') as f:
            content = f.read()

        return content, 200, {'Content-Type': content_type}
    else:
        return "File not found", 404, {'Content-Type': 'text/plain'}