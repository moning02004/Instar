from rest_framework import permissions


class IsOwner(permissions.IsAuthenticated):

    def has_permission(self, request, view):
        super().has_permission(request, view)
        return view.request.user.id == view.kwargs.get('pk')
