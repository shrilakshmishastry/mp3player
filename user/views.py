from django.shortcuts import render
from django.http import JsonResponse
from mp3playist.models import  User
from django.contrib.auth.hashers import make_password,check_password
from django.views.decorators.csrf import csrf_protect,ensure_csrf_cookie, csrf_exempt
from django.middleware import csrf
from django.template import RequestContext
from rest_framework.authtoken.models import Token
# Create your views here.
@csrf_exempt
def user_login(request):

    print(request.META.get('CSRF_COOKIE',None))
    if(request.method=="POST"):
        token = Token.objects.create('shri')
        print(token.key)
        return JsonResponse({'value':'hello'})
    pw =make_password("hello")
    print(check_password("hello",pw))
    return JsonResponse({'value':"hello"})

def user_signin(request):
    if(request.method == 'POST'):

        return JsonResponse({'value':'hello'})
    return JsonResponse({'value':'hello'})
