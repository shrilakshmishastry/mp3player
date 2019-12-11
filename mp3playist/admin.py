from django.contrib import admin
from mp3playist.models import Artist,Composer,Track,Playlist,ComposedBy,Album,Album_track,Favorite

admin.site.register(Artist)
admin.site.register(Composer)
admin.site.register(Track)
admin.site.register(Playlist)
admin.site.register(ComposedBy)
admin.site.register(Album)
admin.site.register(Album_track)
admin.site.register(Favorite)
