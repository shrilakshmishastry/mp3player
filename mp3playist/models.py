from django.db import models
from django.contrib.auth import get_user_model


# table to maintain artist data
class Artist(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    photo_url = models.CharField(max_length=1000)


# table to maintain composer data
class Composer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    photo_url = models.CharField(max_length=1000)


# table to maintain Trach data
class Track(models.Model):
    id = models.AutoField(primary_key=True)
    Artist_id = models.ManyToManyField(Artist, through='Playlist')
    Track_id = models.ManyToManyField(Composer, through='ComposedBy')
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=1000)
    photo_url = models.CharField(max_length=1000)
    release_date = models.DateField()


# table to maintain m to m relation ship between artist and track
class Playlist(models.Model):
    artist_id = models.ForeignKey(Artist, on_delete=models.CASCADE)
    track_id = models.ForeignKey(Track, on_delete=models.CASCADE)


# table to maintain m to m relation ship between composer and track
class ComposedBy(models.Model):
    composer_id = models.ForeignKey(Composer, on_delete=models.CASCADE)
    track_id = models.ForeignKey(Track, on_delete=models.CASCADE)


# table to album data
class Album(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    date_release = models.DateField()
    language = models.CharField(max_length=50)
    Track_id = models.ManyToManyField(Track, through='Album_track')
    img_url = models.CharField(max_length=1000)


# table to m to m relation ship between Album ans track
class Album_track(models.Model):
    track_id = models.ForeignKey(Track, on_delete=models.CASCADE)
    album_id = models.ForeignKey(Album, on_delete=models.CASCADE)


# table to maintain data of user



# table to m to m relationship between user ans track
class Favorite(models.Model):
    User_id = models.ForeignKey(get_user_model(),
      on_delete=models.CASCADE)
    Track_id = models.ForeignKey(Track, on_delete=models.CASCADE)
