from bs4 import BeautifulSoup

class RenderCustomTags:

    def read_file(emplacement: str, content_type: str) -> str:
        """Lire le fichier en fonction du type de contenu."""
        if content_type == "application/octet-stream":
            with open(emplacement, 'rb') as f:
                content = f.read()
        else:
            with open(emplacement, 'r', encoding='utf-8') as f:
                content = f.read()
        return content

    def replace_import_tags(soup: BeautifulSoup, base_path: str) -> None:
        """Remplacer les balises <import> par leur contenu de fichier correspondant."""
        import_tags = soup.find_all('import')
        
        for import_tag in import_tags:
            src = import_tag.get('src')
            
            if src:
                with open(base_path + src, "r", encoding='utf-8') as file:
                    content_import = file.read()
                    # Remplace la balise <import> par le contenu du fichier
                    import_tag.replace_with(BeautifulSoup(content_import, 'html.parser'))

    def add_active_class_to_links(soup: BeautifulSoup, route: str) -> None:
        """Ajouter la classe 'active' aux liens <a> avec l'attribut 'exact' correspondant à 'route'."""
        target_links = soup.find_all('a', attrs={'exact': True})
        for link in target_links:
            if link.get('href') == route:
                link['class'] = 'active'
            del link['exact']

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
            RenderCustomTags.replace_import_tags(soup, base_path) 