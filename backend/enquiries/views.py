from rest_framework import viewsets
from django.db.models import Q

from .models import Enquiry
from .serializers import EnquirySerializer


class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all().order_by('-created_at')
    serializer_class = EnquirySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        q = self.request.query_params.get('q')

        if q:
            queryset = queryset.filter(
                Q(name__icontains=q) | Q(email__icontains=q)
            )

        return queryset
