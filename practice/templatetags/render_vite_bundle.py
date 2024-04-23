import os
import json

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def render_vite_bundle():
    
    print('lol')
    
    """
    Template tag to render a vite bundle.
    Supposed to only be used in production.
    For development, see other files.
    """
  
    try:
        #STATIC_ROOT
        fd = open( f"{settings.STATIC_ROOT}manifest.json" )  #open(f"{settings.VITE_APP_DIR}/dist/.vite/manifest.json", "r")
        manifest = json.load(fd)
    except:
        raise Exception(
            f"Vite manifest file not found or invalid. Maybe your {settings.VITE_APP_DIR}/dist/manifest.json file is empty?"
        )

    # imports_files = f'<script type="module" src="/static/{manifest["index.html"]["file"]}"></script>'
    
    # imports_files = "".join(
    #     [
    #         f'<script type="module" src="/static/{manifest[file]["file"]}"></script>'
    #         for file in files #manifest["index.html"]["imports"]
    #     ]
    # )
    
    # <link rel="stylesheet" type="text/css" href="/static/{manifest['index.html']['css'][0]}" />

    return mark_safe(
        f"""<script type="module" src="/static/{manifest['index.html']['file']}"></script>"""
        # {imports_files}"""
    )