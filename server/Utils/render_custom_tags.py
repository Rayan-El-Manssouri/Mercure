from bs4 import BeautifulSoup
from Utils.RenderCustomTags import RenderCustomTags
def render_custom_tags(emplacement: str, content_type: str, base_path: str, route: str) -> str:
    """Rendre le contenu en fonction du type de contenu."""
    content = RenderCustomTags.read_file(emplacement, content_type)
    
    if content_type == "text/html":
        soup = BeautifulSoup(content, 'html.parser')
        process_imports(soup, base_path)
        RenderCustomTags.add_active_class_to_links(soup, route)
        return soup.prettify()
    
    return content

def process_imports(soup: BeautifulSoup, base_path: str):
    """Traite les balises <import> dans le contenu HTML."""
    import_tags = soup.find_all('import')
    import_list = []

    for import_tag in import_tags:
        src = import_tag.get('src')
        if src:
            with open(base_path + src, "r", encoding='utf-8') as file:
                content_import = file.read()
                import_list.append((import_tag, content_import))

    # Remplacer les balises <import> par le contenu des fichiers importés
    for import_tag, content_import in import_list:
        import_tag.replace_with(BeautifulSoup(content_import, 'html.parser'))

    # Vérifier si le contenu importé contient des balises <import> imbriquées
    while soup.find('import'):
        process_imports(soup, base_path)
