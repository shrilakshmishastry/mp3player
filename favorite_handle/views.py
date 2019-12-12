from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import  csrf_exempt
from mp3playist.models import Favorite,Track
from rest_framework.authtoken.models import Token
import json
from django.contrib.auth.models import User
# Create your views here.
@csrf_exempt
def favorite_view(request):
    if(request.method == 'POST'):
        data = json.loads(request.body.decode('utf-8'))
        print(data['track_name'])
        if(data['type']=='far'):
            user_token = data['token']
            token=Token.objects.get(key=user_token)
            print(token.user_id)
            user = User.objects.filter(id = token.user_id)
            for u in user:
                user_name = u
            track = Track.objects.filter(name=data['track_name'])
            for i in track:
                track_id =i
            favorite = Favorite(User_id=user_name,Track_id=track_id)
            favorite.save()
        elif(data['type']=='fas')    :
            user_token = data['token']
            token=Token.objects.get(key=user_token)
            print(token.user_id)
            user = User.objects.filter(id = token.user_id)
            for u in user:
                user_name = u
            track = Track.objects.filter(name=data['track_name'])
            for i in track:
                track_id =i
            Favorite.objects.filter(User_id=user_name,Track_id=track_id).delete()
        return JsonResponse({"value":"All set"})
    return JsonResponse({"value":"hello"})
