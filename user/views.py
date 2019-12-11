from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password,check_password
from django.views.decorators.csrf import csrf_protect,ensure_csrf_cookie, csrf_exempt
from django.middleware import csrf
from django.template import RequestContext
from rest_framework.authtoken.models import Token
import json
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

# Create your views here.
@csrf_exempt
def user_login(request):


    if(request.method=="POST"):
        data = json.loads(request.body.decode('utf-8'))
        username = data['name']
        password = data['password']
        # data = User.objects.filter(username=username,)
        # data =data.values()
        # print(data)
        # for i in data:
        #     print(i['id'])
        user = authenticate(username=username,password=password)
        if not user:
            response = JsonResponse({"value":"error"})
            response.status_code=404
            return response

        token, _ = Token.objects.get_or_create(user=user)

        response=JsonResponse({'token':token.key})
        response.status_code=200
        return response
    return JsonResponse({'value':"hello"})

@csrf_exempt
def user_signin(request):
    if(request.method == 'POST'):
        data = json.loads(request.body.decode('utf-8'))
        name = data['name']
        password = data['password']
        email = data['email']
        user = User.objects.filter(username=name)
        if(user):
            response = JsonResponse({"value":'error'})
            response.status_code =500
        else:
            user_info = User.objects.create_user(name,email,password)
            user_info.save()

            response = JsonResponse({"value":"success"})
            response.status_code=200
        return response
    return JsonResponse({'value':'hello'})
