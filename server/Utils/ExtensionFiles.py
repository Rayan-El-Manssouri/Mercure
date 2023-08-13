class ExtensionFiles:
    def __init__(self, extension):
        self.extension = extension
        self.content_type = {
            'html': 'text/html',
            'js': 'text/javascript',
            'css': 'text/css',
            'png': 'image/png',
            'svg': 'image/svg+xml',
            'ico': 'image/x-icon'
        }

    def get_content_type(self):
        return self.content_type.get(self.extension, 'application/octet-stream')