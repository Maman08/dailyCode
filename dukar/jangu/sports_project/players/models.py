from pymongo import MongoClient
from django.conf import settings
from bson import ObjectId
import datetime

class MongoConnection:
    _instance = None
    _client = None
    _db = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MongoConnection, cls).__new__(cls)
            cls._client = MongoClient(settings.MONGO_URI)
            cls._db = cls._client.sportsdb
        return cls._instance
    
    @property
    def db(self):
        return self._db

class Player:
    def __init__(self, name=None, position=None, age=None, team_id=None, jersey_number=None, _id=None):
        self.name = name
        self.position = position
        self.age = age
        self.team_id = team_id
        self.jersey_number = jersey_number
        self._id = _id
        self.created_at = datetime.datetime.utcnow()
        self.updated_at = datetime.datetime.utcnow()
    
    def to_dict(self):
        return {
            '_id': str(self._id) if self._id else None,
            'name': self.name,
            'position': self.position,
            'age': self.age,
            'team_id': str(self.team_id) if self.team_id else None,
            'jersey_number': self.jersey_number,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data):
        player = cls()
        player._id = data.get('_id')
        player.name = data.get('name')
        player.position = data.get('position')
        player.age = data.get('age')
        player.team_id = data.get('team_id')
        player.jersey_number = data.get('jersey_number')
        player.created_at = data.get('created_at')
        player.updated_at = data.get('updated_at')
        return player
    
    def save(self):
        mongo = MongoConnection()
        collection = mongo.db.players
        
        if self._id:
            # Update existing player
            self.updated_at = datetime.datetime.utcnow()
            result = collection.update_one(
                {'_id': ObjectId(self._id)},
                {'$set': self.to_dict()}
            )
            return result.modified_count > 0
        else:
            # Create new player
            player_dict = self.to_dict()
            player_dict.pop('_id')  # Remove None _id
            result = collection.insert_one(player_dict)
            self._id = result.inserted_id
            return True
    
    @classmethod
    def find_all(cls):
        mongo = MongoConnection()
        collection = mongo.db.players
        players_data = collection.find()
        return [cls.from_dict(data) for data in players_data]
    
    @classmethod
    def find_by_team(cls, team_id):
        mongo = MongoConnection()
        collection = mongo.db.players
        players_data = collection.find({'team_id': team_id})
        return [cls.from_dict(data) for data in players_data]
    
    @classmethod
    def find_by_id(cls, player_id):
        mongo = MongoConnection()
        collection = mongo.db.players
        player_data = collection.find_one({'_id': ObjectId(player_id)})
        return cls.from_dict(player_data) if player_data else None