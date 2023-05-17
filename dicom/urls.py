"""
URL configuration for dicom project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
from django.urls import path, re_path,include


debugger_path = []
frontend_path = []

# Add Django Debug Toolbar
if settings.DEBUG:
    import debug_toolbar
    debugger_path +=[
        path('__debug__/', include(debug_toolbar.urls)),
    ]
else:
    from django.views.static import serve
    frontend_path += [
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT})
    ]
frontend_path += [
    re_path(r"^.*$", TemplateView.as_view(template_name="base.html")),
]
    
urlpatterns = debugger_path + [
    path('admin/', admin.site.urls),
    path('', include("backend.urls")),
] + frontend_path
