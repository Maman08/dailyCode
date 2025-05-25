from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Player
import requests
import json

@api_view(['GET', 'POST'])
def player_list(request):
    if request.method == 'GET':
        try:
            players = Player.find_all()
            players_data = [player.to_dict() for player in players]
            return Response({
                'success': True,
                'count': len(players_data),
                'data': players_data
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Error fetching players',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    elif request.method == 'POST':
        try:
            data = request.data
            player = Player(
                name=data.get('name'),
                position=data.get('position'),
                age=data.get('age'),
                team_id=data.get('team_id'),
                jersey_number=data.get('jersey_number')
            )
            
            if player.save():
                return Response({
                    'success': True,
                    'data': player.to_dict()
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    'success': False,
                    'message': 'Failed to create player'
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Error creating player',
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def player_detail(request, player_id):
    try:
        player = Player.find_by_id(player_id)
        if not player:
            return Response({
                'success': False,
                'message': 'Player not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            'success': True,
            'data': player.to_dict()
        })
    except Exception as e:
        return Response({
            'success': False,
            'message': 'Error fetching player',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def players_by_team(request, team_id):
    try:
        players = Player.find_by_team(team_id)
        players_data = [player.to_dict() for player in players]
        
        return Response({
            'success': True,
            'team_id': team_id,
            'count': len(players_data),
            'data': players_data
        })
    except Exception as e:
        return Response({
            'success': False,
            'message': 'Error fetching players by team',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def player_with_team_info(request, player_id):
    try:
        player = Player.find_by_id(player_id)
        if not player:
            return Response({
                'success': False,
                'message': 'Player not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Call Express API to get team information
        team_info = None
        if player.team_id:
            try:
                response = requests.get(f'http://express_api:3000/api/teams/{player.team_id}')
                if response.status_code == 200:
                    team_data = response.json()
                    team_info = team_data.get('data')
            except Exception as e:
                print(f"Error fetching team info: {str(e)}")
        
        return Response({
            'success': True,
            'data': {
                'player': player.to_dict(),
                'team': team_info
            }
        })
    except Exception as e:
        return Response({
            'success': False,
            'message': 'Error fetching player with team info',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)