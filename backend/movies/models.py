from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_date = models.DateField()
    poster = models.ImageField(upload_to='posters/', null=True, blank=True) 
    rating = models.FloatField(default=0.0)  

    def __str__(self):
        return self.title
