from django.shortcuts import render
from django.http import JsonResponse
from .models import Track, Album, Album_track, Composer, Artist
from django.core import serializers

# Create your views here.

# a router to return list of tracks
def index(request):
    return JsonResponse({"value":"hello"})
def tracklist(request):
    track_list = serializers.serialize('json', Track.objects.raw(
        """
                    SELECT
                    *
                    FROM
                        mp3playist_track
                    WHERE
                        release_date >= '2019-06-01'

                      """
    ), fields=('id', 'name', 'url', 'photo_url', 'release_date'))
    T_list = Track.objects.raw(
        """
            SELECT
            *
            FROM
                mp3playist_track
            WHERE
                release_date >= '2019-06-01'
        """
    )
    al_name = []

    for t in T_list:

        al = Album_track.objects.raw(
            """
                SELECT
                *
                FROM
                     mp3playist_album_track
                INNER JOIN
                    mp3playist_album
                ON
                    mp3playist_album_track.track_id_id = {}

            """.format(t.id)
        )
        for j in al:
            object_list = Album.objects.raw(
                """
                  SELECT
                   *
                  FROM
                    mp3playist_album
                  WHERE
                     id ={}
                """.format(j.album_id_id)
            )
        for k in object_list:
            al_name.append(k.name)

    return JsonResponse({'tracks': track_list, 'album_name': al_name})
