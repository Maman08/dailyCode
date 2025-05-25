from django.urls import path
from . import views

urlpatterns = [
    # GET /api/players/ - Get all players
    # POST /api/players/ - Create a new player
    path('', views.player_list, name='player_list'),
    
    # GET /api/players/{id}/ - Get player by ID
    path('<str:player_id>/', views.player_detail, name='player_detail'),
    
    # GET /api/players/team/{team_id}/ - Get players by team ID
    path('team/<str:team_id>/', views.players_by_team, name='players_by_team'),
    
    # GET /api/players/{id}/with-team/ - Get player with team information
    path('<str:player_id>/with-team/', views.player_with_team_info, name='player_with_team_info'),
]