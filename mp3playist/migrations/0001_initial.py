# Generated by Django 2.2.7 on 2019-11-06 15:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('date_release', models.DateField()),
                ('language', models.CharField(max_length=50)),
                ('img_url', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('photo_url', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='ComposedBy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Composer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('photo_url', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artist_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mp3playist.Artist')),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('url', models.CharField(max_length=1000)),
                ('photo_url', models.CharField(max_length=1000)),
                ('release_date', models.DateField()),
                ('Artist_id', models.ManyToManyField(through='mp3playist.Playlist', to='mp3playist.Artist')),
                ('Track_id', models.ManyToManyField(through='mp3playist.ComposedBy', to='mp3playist.Composer')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('Track_id', models.ManyToManyField(through='mp3playist.Favorite', to='mp3playist.Track')),
            ],
        ),
        migrations.AddField(
            model_name='playlist',
            name='track_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mp3playist.Track'),
        ),
        migrations.AddField(
            model_name='favorite',
            name='Track_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mp3playist.Track'),
        ),
        migrations.AddField(
            model_name='favorite',
            name='User_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mp3playist.User'),
        ),
        migrations.AddField(
            model_name='composedby',
            name='composer_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mp3playist.Composer'),
        ),
        migrations.AddField(
            model_name='composedby',
            name='track_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mp3playist.Track'),
        ),
        migrations.CreateModel(
            name='Album_track',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mp3playist.Album')),
                ('track_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mp3playist.Track')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='Track_id',
            field=models.ManyToManyField(through='mp3playist.Album_track', to='mp3playist.Track'),
        ),
    ]
