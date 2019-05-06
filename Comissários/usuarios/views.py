from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .models import Usuario
from .permissions import IsOwnerOrReadOnly, IsAuthenticated
from .serializers import usuarioserializer
from .pagination import CustomPagination

class get_delete_update_Usuario(RetrieveUpdateDestroyAPIView):
    serializer_class = usuarioserializer
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly,)

    def get_queryset(self, pk):
        try:
            Usuario = Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            content = {
                'status': 'Not Found'
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        return Usuario

    def get(self, request, pk):

        Usuario = self.get_queryset(pk)
        serializer = usuarioserializer(Usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        
        Usuario = self.get_queryset(pk)

        if(request.user == Usuario.creator):
            serializer = usuarioserializer(Usuario, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            content = {
                'status': 'Acesso Negado'
            }
            return Response(content, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk):

        Usuario = self.get_queryset(pk)

        if(request.user == Usuario.creator):
            Usuario.delete()
            content = {
                'status': 'Sem conteúdo'
            }
            return Response(content, status=status.HTTP_204_NO_CONTENT)
        else:
            content = {
                'status': 'Acesso Negado'
            }
            return Response(content, status=status.HTTP_401_UNAUTHORIZED)
   

class get_post_usuarios(ListCreateAPIView):
    serializer_class = usuarioserializer
    permission_classes = (IsAuthenticated,)
    pagination_class = CustomPagination
    
    def get_queryset(self):
       usuarios = Usuario.objects.all()
       return usuarios

    def get(self, request):
        usuarios = self.get_queryset()
        paginate_queryset = self.paginate_queryset(usuarios)
        serializer = self.serializer_class(paginate_queryset, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = usuarioserializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

