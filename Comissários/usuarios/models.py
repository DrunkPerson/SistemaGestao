from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    senha = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    tipo = models.IntegerField()
    creator = models.ForeignKey('auth.User', related_name='usuarios', on_delete=models.CASCADE)





