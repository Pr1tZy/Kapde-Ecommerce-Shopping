from rest_framework import generics
from .models import Collection, Cart, CartItem,Profile
from .serializers import CollectionSerializer, UserSerializer, CartSerializer, CartItemSerializer, ProfileSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.db.utils import IntegrityError

class CollectionList(generics.ListCreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

class CollectionDetail(generics.RetrieveAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class SignupView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        try:
            # Check if the profile already exists; create only if it doesn't
            Profile.objects.get_or_create(
                user=user,
                defaults={
                    'name': self.request.data.get('name'),
                    'phone_number': self.request.data.get('phone'),
                    'address': self.request.data.get('address'),
                    'pincode': self.request.data.get('pincode'),
                }
            )
        except IntegrityError:
            # Handle the case where the profile already exists
            pass

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            # Fetch profile information
            profile = get_object_or_404(Profile, user=user)
            return Response({
                "token": token.key,
                "name": profile.name,
                "phone": profile.phone_number,
                "address": profile.address,
                "pincode": profile.pincode,
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, collection_id):
        user = request.user
        collection = get_object_or_404(Collection, id=collection_id)
        
        # Ensure a cart exists for the user
        cart, created = Cart.objects.get_or_create(user=user)

        # Add or update the cart item
        cart_item, created = CartItem.objects.get_or_create(cart=cart, collection=collection)
        cart_item.quantity += 1
        cart_item.save()

        return Response({"message": "Item added to cart"}, status=status.HTTP_200_OK)

class CartDetailView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Cart, user=self.request.user)

class CartItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, item_id):
        user = request.user
        cart = get_object_or_404(Cart, user=user)
        
        # Fetch the specific cart item
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        
        # Serialize the cart item
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, item_id):
        user = request.user
        cart = get_object_or_404(Cart, user=user)

        # Debugging log
        print("Attempting to delete CartItem with ID:", item_id)
        
        # Find the specific cart item
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)

        cart_item.delete()
        return Response({"message": "Item removed from cart"}, status=status.HTTP_204_NO_CONTENT)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = get_object_or_404(Profile, user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        profile = get_object_or_404(Profile, user=request.user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
