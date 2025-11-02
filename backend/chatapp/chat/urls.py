from django.urls import path
from . import views

urlpatterns = [
    # Auth endpoints
    path('api/csrf/', views.get_csrf_token, name='get_csrf_token'),
    path('api/register/', views.register_view, name='register'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/check-auth/', views.check_auth, name='check_auth'),
    
    # Room endpoints
    path('api/rooms/', views.room_list, name='room_list'),
    path('api/rooms/<str:room_name>/', views.room_detail, name='room_detail'),
]
