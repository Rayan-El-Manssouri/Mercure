import re
from bs4 import BeautifulSoup

def render_custom_tags(emplacement, content_type, base_path):
    if content_type == "application/octet-stream":
        with open(emplacement, 'rb') as f:
            content = f.read()
        return content
    else:
        with open(emplacement, 'r', encoding='utf-8') as f:
            content = f.read()
            if content_type == "text/html":
                # Cercher tous les balise import du code html
                soup = BeautifulSoup(content, 'html.parser')
                import_tags = soup.find_all('import')
                # Chercher le contnu src de chaque balise import
                for tag in import_tags:
                    src = tag.get('src')
                    # Ouvrir le fichier src et remplacer le contenu de la balise import par le contenu du fichier
                    with open(base_path + src, "r", encoding='utf-8') as file:
                        content_import = file.read()
                        tag.replace_with(BeautifulSoup(content_import, 'html.parser'))
                    # Retourner le code html en text/html
                    content = str(soup)
        return content