from flask import request, jsonify
from Route.RouteManger import RouteManager
from Utils.Message import Message
from Utils.static import serve_static_file

# Configuration du serveur
PORT = 8000

# Créez une instance de la classe RouteManager
route_manager = RouteManager()
messages = Message.read_messages_from_file()

function_mapping = {
    'init': Message.init,
    'connect': Message.login,
    'connect_admin': Message.login_admin,
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

# Partie Web Admin
@route_manager.app.route('/<route>', methods=['GET'])
def index(route):
    return serve_static_file(route)

if __name__ == '__main__':
    route_manager.run(PORT)