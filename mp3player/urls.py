"""mp3player URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from mp3playist import views
from albumview import views as album_board_view
from albums import views as album_view
from trending import views as trending_view
from artist  import views as artist_view


urlpatterns = [
    path('',views.index,name="index"),
    path('artist', artist_view.artist, name="artist"),
    path('trending', trending_view.trending, name='trending'),
    path('album', album_view.albums, name="albums"),
    path('album_board',album_board_view.album_board,name='album_board'),
    path('track', views.tracklist, name='tracklist'),
    path('admin/', admin.site.urls),
]
