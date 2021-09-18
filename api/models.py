from django.db import models
import string
import random

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    name = models.CharField(max_length=50, default="unNamed")
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


def generate_unique_code(lenth=6):
    
    while True:
        generated_code = ''.join(random.choice(string.ascii_uppercase, k=lenth))
        if Room.objects.filter(code=generated_code).count == 0:
            break
    return generated_code


