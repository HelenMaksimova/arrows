from django.contrib import admin
from django.urls import path, include, re_path
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import ArrowsUserViewSet
from notes.views import NotesViewSet, ProjectsViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Arrows",
      default_version='0.1',
      description="Documentation to out project Arrows",
      contact=openapi.Contact(email="super@user.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.IsAuthenticated,),
)

router = DefaultRouter()
router.register('users', ArrowsUserViewSet)
router.register('notes', NotesViewSet)
router.register('projects', ProjectsViewSet)

urlpatterns = [
    re_path(r'^api/(?P<version>\d\.\d)/', include(router.urls)),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/token-auth/', obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
