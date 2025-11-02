from django.shortcuts import get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer, UserSerializer
from django.utils.text import slugify


@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    """Get CSRF token for frontend"""
    return JsonResponse({'csrfToken': get_token(request)})


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def register_view(request):
    """Register a new user"""
    username = request.data.get('username')
    password = request.data.get('password')
    password2 = request.data.get('password2')
    
    if not username or not password:
        return Response(
            {'error': 'Please provide username and password'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if password != password2:
        return Response(
            {'error': 'Passwords do not match'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return Response({
            'message': 'Registration successful',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def login_view(request):
    """Login user with session authentication"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Please provide username and password'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return Response({
            'message': f'Welcome back, {username}!',
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)
    else:
        return Response(
            {'error': 'Invalid username or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout user"""
    logout(request)
    return Response(
        {'message': 'You have been logged out'},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
    """Check if user is authenticated"""
    return Response({
        'isAuthenticated': True,
        'user': UserSerializer(request.user).data
    })


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def room_list(request):
    """Get all rooms or create a new room"""
    if request.method == 'GET':
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        room_name = request.data.get('name')
        room_description = request.data.get('description', '')
        
        if not room_name:
            return Response(
                {'error': 'Room name is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        slug = slugify(room_name)
        
        if Room.objects.filter(slug=slug).exists():
            return Response(
                {'error': 'Room with this name already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        room = Room.objects.create(
            name=room_name,
            slug=slug,
            description=room_description,
            created_by=request.user
        )
        
        serializer = RoomSerializer(room)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def room_detail(request, room_name):
    """Get room details and messages"""
    room = get_object_or_404(Room, slug=room_name)
    messages = Message.objects.filter(room=room).select_related('user')[:50]
    
    return Response({
        'room': RoomSerializer(room).data,
        'messages': MessageSerializer(messages, many=True).data,
        'username': request.user.username
    })
