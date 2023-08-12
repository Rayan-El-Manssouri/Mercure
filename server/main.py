from Route.RouteManger import RouteManager
from flask import request, jsonify
from Utils.Message import Message

# Configuration du serveur
PORT = 8000

# Créez une instance de la classe RouteManager
route_manager = RouteManager()
messages = Message.read_messages_from_file()

function_mapping = {
    'init': Message.init,
    'connect': Message.login,
    'fetchUser': lambda data: Message.fetch_user(data['UserEmail']),
    'fetchUserFilter': lambda data: Message.fetch_user_filter(data['UserEmail']),
    'Message': Message.message,
    'fetchCompte': Message.fetch_compte,
    'fetchUserUniqueComunity': lambda data: Message.fetchUserUniqueComunity(data['UserEmail']),
    'sendMessage': Message.send_message,
    'logout': Message.logout,
    'checklogin': Message.check_login,
}

@route_manager.app.route('/api', methods=['POST'])
def proxy():
    # Récupérer les données JSON de la requête
    data = request.get_json()
    apiKey = data['apikey']
    
    # Vérifier la clé API
    if apiKey != route_manager.VALIDE_API_KEY:
        return jsonify({"error": "API key invalide"}), 401, {'Content-Type': 'application/json'}
    
    # Chercher le nom de la fonction à appeler
    function_name = data['functionName']
    
    # Vérifier si la fonction existe dans le mapping, sinon renvoyer une erreur
    if function_name not in function_mapping:
        return jsonify({"error": "Invalid function name"}), 400, {'Content-Type': 'application/json'}
    
    # Appeler la fonction correspondante en passant les données si nécessaire
    if function_name in ['fetchUser', 'fetchUserFilter', 'fetchUserUniqueComunity']:
        result = function_mapping[function_name](data)
    else:
        result = function_mapping[function_name]()
    
    return result

@route_manager.app.route('/', methods=['GET'])
def index():
    with open('./server/www/index.html', 'r', encoding='utf-8') as f:
        return f.read()

@route_manager.app.route('/logo', methods=['GET'])
def logo():
    with open('./server/www/assets/simplified.png', 'rb') as f:
        return f.read()
    
@route_manager.app.route('/logo_svg', methods=['GET'])
def logo_svg():
    with open('./server/www/assets/detailled light.svg', 'rb') as f:
        svg_content = f.read()
    return svg_content, 200, {'Content-Type': 'image/svg+xml'}

@route_manager.app.route('/css/style.css', methods=['GET'])
def css():
    with open('./server/www/css/style.css', 'r', encoding='utf-8') as f:
        # Le faire charger comme fichier css et non comme texte
        return  f.read(), 200, {'Content-Type': 'text/css'}
    
if __name__ == '__main__':
    route_manager.run(PORT)