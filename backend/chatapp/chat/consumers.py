import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from .models import Room, Message
from datetime import datetime


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        
        # Check if user is authenticated
        user = self.scope.get('user')
        if user and user.is_authenticated:
            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()
    
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message')
        username = text_data_json.get('username')
        
        if not message:
            return
        
        # Save message to database
        saved_message = await self.save_message(username, self.room_name, message)
        
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'timestamp': saved_message['timestamp'],
                'id': saved_message['id']
            }
        )
    
    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        timestamp = event['timestamp']
        message_id = event.get('id')
        
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'id': message_id,
            'message': message,
            'username': username,
            'timestamp': timestamp
        }))
    
    @database_sync_to_async
    def save_message(self, username, room_name, message):
        user = User.objects.get(username=username)
        room = Room.objects.get(slug=room_name)
        msg = Message.objects.create(user=user, room=room, content=message)
        return {
            'id': msg.id,
            'timestamp': msg.timestamp.isoformat()
        }
