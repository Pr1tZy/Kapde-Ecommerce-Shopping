# admin.py
from django.contrib import admin
from .models import Collection  # Import your Collection model

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'imageUrl')  # Customize this list as needed
    search_fields = ('name',)  # Add search capability
