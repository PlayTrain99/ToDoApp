from django.db import models

class ToDoIteam(models.Model):
    text = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return(self.task)
