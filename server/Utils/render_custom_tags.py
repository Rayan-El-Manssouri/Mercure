import re

def render_custom_tags(content, base_path):
    def custom_tag_replacer(match):
        src = match.group(1).decode("utf-8")
        src = base_path + src.strip()

        with open(src, "rb") as file:
            return file.read()

    pattern = b'<import src="([^"]+)" />'
    content_rendered = re.sub(pattern, custom_tag_replacer, content)
    return content_rendered