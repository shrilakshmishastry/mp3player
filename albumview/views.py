from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.core import serializers


# Create your views here.
from mp3playist.models import  Track,Album,Album_track


def album_board(request):
    if request.method == 'GET':
        album_data =[]
        if request.GET.get('type') == 'album':
            print(request.GET.get('key'))
            data = Album.objects.raw(
                """
                     SELECT
                        mp3playist_artist.name as a_name,
                        mp3playist_artist.id,
                        mp3playist_composer.id,
                        mp3playist_track.id ,
                        mp3playist_album.id,
                        mp3playist_track.name as track_name,
                        mp3playist_composer.name as c_name,
                        mp3playist_album.name as alname,
                        mp3playist_album.img_url as p_url,
                        mp3playist_track.url as t_url,
                        mp3playist_album.date_release as release_date
                    FROM
                        mp3playist_album,
                        mp3playist_album_track,
                        mp3playist_track,
                        mp3playist_artist,
                        mp3playist_playlist,
                        mp3playist_composer,
                        mp3playist_composedby
                    WHERE
                        mp3playist_album.id={0}
                        AND
                        mp3playist_album_track.album_id_id ={1}
                        AND
                        mp3playist_track.id = mp3playist_album_track.track_id_id
                        AND
                        mp3playist_playlist.track_id_id =mp3playist_album_track.track_id_id
                        AND
                        mp3playist_artist.id = mp3playist_playlist.artist_id_id
                        AND
                        mp3playist_composedby.track_id_id = mp3playist_playlist.track_id_id
                        AND
                        mp3playist_composer.id = mp3playist_composedby.composer_id_id ;
                """.format(request.GET.get('key'),request.GET.get('key'))
            )


            for d in data:
                alinfo={
                'type':'album',
                'album_name':d.alname,
                'track_name':d.track_name,
                'track_url':d.t_url,
                'photo_url':d.p_url,
                'artist_name':d.a_name,
                'composer_name':d.c_name,
                'release_date':d.release_date
                }

                album_data.append(alinfo)

        elif request.GET.get('type')  == 'artist'  :

            print(request.GET.get('key'))
            data = Album.objects.raw(
                """
                     SELECT
                        mp3playist_artist.name as a_name,
                        mp3playist_artist.id,
                        mp3playist_composer.id,
                        mp3playist_track.id ,
                        mp3playist_album.id,
                        mp3playist_track.name as track_name,
                        mp3playist_composer.name as c_name,
                        mp3playist_album.name as alname,
                        mp3playist_artist.photo_url as p_url,
                        mp3playist_track.url as t_url,
                        mp3playist_album.date_release as release_date
                    FROM
                        mp3playist_album,
                        mp3playist_album_track,
                        mp3playist_track,
                        mp3playist_artist,
                        mp3playist_playlist,
                        mp3playist_composer,
                        mp3playist_composedby
                    WHERE
                        mp3playist_artist.id={0}
                        AND
                        mp3playist_playlist.artist_id_id ={1}
                        AND
                        mp3playist_track.id = mp3playist_playlist.track_id_id
                        AND
                        mp3playist_album_track.track_id_id =mp3playist_playlist.track_id_id
                        AND
                        mp3playist_album.id = mp3playist_album_track.album_id_id
                        AND
                        mp3playist_composedby.track_id_id = mp3playist_playlist.track_id_id
                        AND
                        mp3playist_composer.id = mp3playist_composedby.composer_id_id ;
                """.format(request.GET.get('key'),request.GET.get('key'))
            )


            for d in data:
                alinfo={
                'type':'artist',
                'album_name':d.a_name,
                'track_name':d.track_name,
                'track_url':d.t_url,
                'photo_url':d.p_url,
                'artist_name':d.a_name,
                'composer_name':d.c_name,
                'release_date':d.release_date
                }

                album_data.append(alinfo)

        elif request.GET.get('type')    == 'composer':
            
            data = Album.objects.raw(
            """
                 SELECT
                    mp3playist_artist.name as a_name,
                    mp3playist_artist.id,
                    mp3playist_composer.id,
                    mp3playist_track.id ,
                    mp3playist_album.id,
                    mp3playist_track.name as track_name,
                    mp3playist_composer.name as c_name,
                    mp3playist_album.name as alname,
                    mp3playist_composer.photo_url as p_url,
                    mp3playist_track.url as t_url,
                    mp3playist_album.date_release as release_date
                FROM
                    mp3playist_album,
                    mp3playist_album_track,
                    mp3playist_track,
                    mp3playist_artist,
                    mp3playist_playlist,
                    mp3playist_composer,
                    mp3playist_composedby
                WHERE
                    mp3playist_composer.id={0}
                AND
                    mp3playist_composedby.composer_id_id ={1}
                AND
                    mp3playist_track.id = mp3playist_composedby.track_id_id
                AND
                    mp3playist_album_track.track_id_id =mp3playist_composedby.track_id_id
                AND
                    mp3playist_album.id = mp3playist_album_track.album_id_id
                AND
                    mp3playist_playlist.track_id_id= mp3playist_composedby.track_id_id
                AND
                    mp3playist_artist.id =mp3playist_playlist.artist_id_id ;
            """.format(request.GET.get('key'),request.GET.get('key'))
            )
            for d in data:
                alinfo={
                    'type':'composer',
                    'album_name':d.c_name,
                    'track_name':d.track_name,
                    'track_url':d.t_url,
                    'photo_url':d.p_url,
                    'artist_name':d.a_name,
                    'composer_name':d.c_name,
                    'release_date':d.release_date

                    }

                album_data.append(alinfo)

        elif request.GET.get('type')    == 'track':

            t_id = Album.objects.raw(
                """
                    SELECT
                        mp3playist_album.id
                    FROM
                        mp3playist_album,
                        mp3playist_album_track
                    WHERE
                        mp3playist_album_track.track_id_id={}
                        AND
                        mp3playist_album.id = mp3playist_album_track.album_id_id

                """.format(request.GET.get('key'))
            )

            for i in t_id:
                id=i.id
            print(id)
            data = Album.objects.raw(
                """
                     SELECT
                        mp3playist_artist.name as a_name,
                        mp3playist_artist.id,
                        mp3playist_composer.id,
                        mp3playist_track.id ,
                        mp3playist_album.id,
                        mp3playist_track.name as track_name,
                        mp3playist_composer.name as c_name,
                        mp3playist_album.name as alname,
                        mp3playist_album.img_url as p_url,
                        mp3playist_track.url as t_url,
                        mp3playist_album.date_release as release_date
                    FROM
                        mp3playist_album,
                        mp3playist_album_track,
                        mp3playist_track,
                        mp3playist_artist,
                        mp3playist_playlist,
                        mp3playist_composer,
                        mp3playist_composedby
                    WHERE
                        mp3playist_album.id={0}
                        AND
                        mp3playist_album_track.album_id_id ={1}
                        AND
                        mp3playist_track.id = mp3playist_album_track.track_id_id
                        AND
                        mp3playist_playlist.track_id_id =mp3playist_album_track.track_id_id
                        AND
                        mp3playist_artist.id = mp3playist_playlist.artist_id_id
                        AND
                        mp3playist_composedby.track_id_id = mp3playist_playlist.track_id_id
                        AND
                        mp3playist_composer.id = mp3playist_composedby.composer_id_id ;
                """.format(id,id)
            )


            for d in data:
                alinfo={
                'type':'track',
                'album_name':d.alname,
                'track_name':d.track_name,
                'track_url':d.t_url,
                'photo_url':d.p_url,
                'artist_name':d.a_name,
                'composer_name':d.c_name,
                'release_date':d.release_date
                }

                album_data.append(alinfo)

        return JsonResponse({'value':album_data})
    return JsonResponse({'value':'data'})
