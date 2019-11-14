from django.shortcuts import render
from django.http import JsonResponse
from mp3playist.models import  Track,Album,Album_track,Composer,Artist
from django.core import serializers

# Create your views here.
def artist(request):
    albums_artist = []
    for k in Artist.objects.raw(
            """
                                           SELECT
                                           DISTINCT
                                            mp3playist_artist.id,
                                            mp3playist_artist.name  AS 'a_name'
                                            FROM
                                             (
                                                (mp3playist_playlist
                                                INNER JOIN mp3playist_artist on mp3playist_playlist.artist_id_id = mp3playist_artist.id)
                                                INNER JOIN  mp3playist_track on mp3playist_playlist.track_id_id = mp3playist_track.id)
             """

    ):
        album = {
            'a_id': k.id,
            't_id': k.id,
            'artist_name': k.a_name,
            'track_name': k.name,
            'photo_url': k.photo_url
        }

        albums_artist.append(album)

    return JsonResponse({'value': albums_artist})
