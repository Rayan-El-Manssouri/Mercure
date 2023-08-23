from bs4 import BeautifulSoup
from Utils.RenderCustomTags import RenderCustomTags

def render_custom_tags(emplacement: str, content_type: str, base_path: str, route: str) -> str:
    """Rendre le contenu en fonction du type de contenu."""
    content = RenderCustomTags.read_file(emplacement, content_type)
    
    if content_type == "text/html":
        soup = BeautifulSoup(content, 'html.parser')
        RenderCustomTags.process_imports(soup, base_path)
        RenderCustomTags.add_active_class_to_links(soup, route)
        return soup.prettify()
    
    return content