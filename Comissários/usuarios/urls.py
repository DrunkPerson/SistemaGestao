from django.urls import include, path, re_path
from . import views


urlpatterns = [
    re_path(r'^api/usuarios/(?P<pk>[0-9]+)$', # Url to get update or delete a Usuario
        views.get_delete_update_Usuario.as_view(),
        name='get_delete_update_Usuario'
    ),
    path('api/usuarios/', # urls list all and create new one
        views.get_post_usuarios.as_view(),
        name='get_post_usuarios'
    )
]