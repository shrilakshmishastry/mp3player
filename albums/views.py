from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.core import serializers


# Create your views here.
from mp3playist.models import  Track,Album,Album_track,Composer,Artist

# Create your views here.

def albums(request):
    track = Album_track.objects.raw(
        """
            SELECT
                *
            FROM
                mp3playist_album_track
             INNER JOIN
               mp3playist_composedby
            ON
                mp3playist_album_track.track_id_id = mp3playist_composedby.track_id_id
        """
    )
    value = []
    c_name = []
    t_id = []
    for i in track:
        value.append(i.composer_id_id)
        t_id.append(i.track_id_id)

    for i in value:

        l = Composer.objects.raw("""
            SELECT
                *
            FROM
                mp3playist_composer
            WHERE
                id = {}
        """.format(i))
        for j in l:
            c_name.append(j.name)

    a_id = []
    for i in t_id:
        t = Album_track.objects.raw(
            'SELECT * FROM mp3playist_album_track  where track_id_id = {} '.format(i))
        for k in t:
            a_id.append(k.album_id_id)
    al_name = []
    for i in a_id:
        a = Album.objects.raw('SELECT * FROM  mp3playist_album where id={}'.format(i))
        for j in a:
            al_name.append(j.name)

    album_list = serializers.serialize('json', Album.objects.raw('SELECT * FROM mp3playist_album'),
                                       fields=(
                                           'id', 'name', 'category', ' date_release', 'language', 'Track_id',
                                           'img_url'))

    return JsonResponse({'albums': album_list, 'c_name': c_name, 'a_name': al_name})
