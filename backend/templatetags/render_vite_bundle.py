# This template tag is needed for production
# Add it to one of your django apps (/appdir/templatetags/render_vite_bundle.py, for example)

import os
import json

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def render_vite_bundle():
    """
    Template tag to render a vite bundle.
    Supposed to only be used in production.
    For development, see other files.
    """
  
    try:
        # fd = open(f"{settings.VITE_APP_DIR}/dist/manifest.json", "r")
        fd = open(f"{settings.STATIC_ROOT}/manifest.json", "r")
        manifest = json.load(fd)
    except:
        raise Exception(
            # f"Vite manifest file not found or invalid. Maybe your {settings.VITE_APP_DIR}/dist/manifest.json file is empty?"
            f"Vite manifest file not found or invalid. Maybe your {settings.STATIC_ROOT}/manifest.json file is empty?"
        )

    # imports_files = "".join(
    #     [
    #         f'<link rel="icon" type="image/svg+xml" href="/static/{file}" />'
    #         for file in manifest["index.html"]["assets"]
    #     ]
    # )

    # return mark_safe(
    #     f"""<script type="module" src="/static/{manifest['index.html']['file']}"></script>
    #     <link rel="stylesheet" type="text/css" href="/static/{manifest['index.css']['file']}" />
    #     {imports_files}"""
    # )
    return mark_safe(
         f"""<script type="module" src="/static/{manifest['index.html']['file']}"></script>"""
     )