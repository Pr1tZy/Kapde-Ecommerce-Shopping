from django.urls import path
from .views import CollectionList, CollectionDetail, SignupView, LoginView, AddToCartView, CartDetailView, CartItemDetailView, ProfileView

urlpatterns = [
    path('collections/', CollectionList.as_view(), name='collection-list'),
    path('collections/<int:pk>/', CollectionDetail.as_view(), name='collection-detail'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('cart/add/<int:collection_id>/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/', CartDetailView.as_view(), name='cart-detail'),
    path('cart/items/<int:item_id>/', CartItemDetailView.as_view(), name='cart-item-detail'),
    path('api/profile/', ProfileView.as_view(), name='profile'),
]
