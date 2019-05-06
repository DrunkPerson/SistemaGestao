from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.models import User


class usuarioserializer(serializers.ModelSerializer): 
    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        model = Usuario
        fields = ('nome','senha', 'email', 'tipo', 'creator')


class UserSerializer(serializers.ModelSerializer):  
    usuarios = serializers.PrimaryKeyRelatedField(many=True, queryset=Usuario.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'usuarios')