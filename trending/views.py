from django.shortcuts import render
from django.http import JsonResponse
from mp3playist.models import  Track,Album,Album_track,Composer,Artist
from django.core import serializers

# Create your views here.
def trending(request):
    albums_kannada = []
    albums_hindi = []
    albums_english = []
    albums_artist = []
    albums_composer = []
    for k in Track.objects.raw(
            """
                                           SELECT
                                           DISTINCT
                                           mp3playist_composer.id ,
                                           mp3playist_composer.name as 'c_name',
                                            mp3playist_composer.photo_url as 'p_url'
                                            FROM
                                             (
                                                (mp3playist_composedby
                                                INNER JOIN mp3playist_composer on mp3playist_composedby.composer_id_id = mp3playist_composer.id)
                                                INNER JOIN  mp3playist_track on mp3playist_composedby.track_id_id = mp3playist_track.id)

                                             LIMIT 16

                                           """

    ):
        album = {
            'c_id': k.id,
            't_id': k.id,
            'composer_name': k.c_name,
            'track_name': k.name,
            'photo_url': k.p_url
        }

        albums_composer.append(album)

    for k in Track.objects.raw(
            """
                                           SELECT
                                           mp3playist_album.id ,
                                           mp3playist_track.id as 'T_id',
                                            mp3playist_track.name as 't_name',
                                            mp3playist_album.name as 'a_name',
                                            mp3playist_track.photo_url as 'p_url'
                                            FROM
                                             (
                                                (mp3playist_album_track
                                                INNER JOIN mp3playist_album on mp3playist_album_track.album_id_id = mp3playist_album.id)
                                                INNER JOIN  mp3playist_track on mp3playist_album_track.track_id_id = mp3playist_track.id)
                                            WHERE
                                            mp3playist_album.language="Hindi"
                                             AND
                                             mp3playist_album.date_release >='2019-01-01'
                                             LIMIT 8

                                           """

    ):
        album = {
            'al_id': k.id,
            't_id': k.T_id,
            'album_name': k.a_name,
            'track_name': k.t_name,
            'photo_url': k.p_url
        }

        albums_hindi.append(album)
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
                                                WHERE
                                                 mp3playist_track.release_date >= '2019-06-01'

                                                LIMIT 12

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

    for k in Track.objects.raw(
            """
                                           SELECT
                                           mp3playist_album.id ,
                                           mp3playist_track.id as 'T_id',
                                            mp3playist_track.name as 't_name',
                                            mp3playist_album.name as 'a_name',
                                            mp3playist_track.photo_url as 'p_url'
                                            FROM
                                             (
                                                (mp3playist_album_track
                                                INNER JOIN mp3playist_album on mp3playist_album_track.album_id_id = mp3playist_album.id)
                                                INNER JOIN  mp3playist_track on mp3playist_album_track.track_id_id = mp3playist_track.id)
                                            WHERE
                                            mp3playist_album.language="English"

                                             LIMIT 8

                                           """

    ):
        album = {
            'al_id': k.id,
            't_id': k.T_id,
            'album_name': k.a_name,
            'track_name': k.t_name,
            'photo_url': k.p_url
        }

        albums_english.append(album)

    for k in Track.objects.raw(
            """
                                           SELECT
                                           mp3playist_album.id ,
                                           mp3playist_track.id as 'T_id',
                                            mp3playist_track.name as 't_name',
                                            mp3playist_album.name as 'a_name',
                                            mp3playist_track.photo_url as 'p_url'
                                            FROM
                                             (
                                                (mp3playist_album_track
                                                INNER JOIN mp3playist_album on mp3playist_album_track.album_id_id = mp3playist_album.id)
                                                INNER JOIN  mp3playist_track on mp3playist_album_track.track_id_id = mp3playist_track.id)
                                            WHERE
                                            mp3playist_album.language="Kannada"
                                             AND
                                             mp3playist_album.date_release >='2019-01-06'
                                             LIMIT 8

                                           """

    ):
        album = {
            'al_id': k.id,
            't_id': k.T_id,
            'album_name': k.a_name,
            'track_name': k.t_name,
            'photo_url': k.p_url
        }

        albums_kannada.append(album)

    return JsonResponse(
        {'value': albums_kannada, 'e_value': albums_english, 'h_value': albums_hindi, 'top_artist': albums_artist,
         'top_composer': albums_composer})
