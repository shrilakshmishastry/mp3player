from django.shortcuts import render
from django.http import JsonResponse
from mp3playist.models import  Track,Album,Album_track,Composer,Artist


# Create your views here.

def top_album(request):
    if(request.method=="GET"):
        album=[]
        value = Album.objects.raw(
            """
                SELECT *
                FROM  mp3playist_album
                LIMIT 10
            """
        )

        for i in value:
            alinfo={
            "name":i.name,
            "id":i.id,
            "category":i.category,
            "date_release":i.date_release,
            "img_url":i.img_url
            }
            album.append(alinfo)

        return JsonResponse({"value":album})
    return JsonResponse({"value":"hello"})
