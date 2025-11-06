from django.contrib import admin
from .models import Movie

class MovieAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'release_date', 'rating')

admin.site.register(Movie, MovieAdmin)
