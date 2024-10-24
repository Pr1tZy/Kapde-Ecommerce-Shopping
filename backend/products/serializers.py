from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Collection, Cart, CartItem, Profile

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True, required=False)
    phone_number = serializers.CharField(write_only=True, required=False)
    address = serializers.CharField(write_only=True, required=False)
    pincode = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'name', 'phone_number', 'address', 'pincode']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated_data):
        # Extract profile data from validated_data
        profile_data = {
            'name': validated_data.pop('name', None),
            'phone_number': validated_data.pop('phone_number', None),
            'address': validated_data.pop('address', None),
            'pincode': validated_data.pop('pincode', None),
        }
        
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        
        # Create a Profile for the new user with additional fields
        Profile.objects.create(user=user, **profile_data)  
        
        return user

class CartItemSerializer(serializers.ModelSerializer):
    collection = CollectionSerializer()  # Nested serializer for detailed collection info

    class Meta:
        model = CartItem
        fields = ['id', 'collection', 'quantity']  # Include 'id' to allow identification

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['name', 'phone_number', 'address', 'pincode']