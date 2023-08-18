import re

def render_custom_tags(content, base_path):
    def custom_tag_replacer(match):
        src = match.group(1)
        src = base_path + src.decode("utf-8")

        with open(src, "rb") as file:
            return file.read()

    content_rendered = re.sub(b'<Majax src="([^"]+)" />', custom_tag_replacer, content)
    return content_rendered