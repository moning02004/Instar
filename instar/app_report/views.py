from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Value, CharField
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.generic import ListView, UpdateView

from app_report.models import Report


class ReportListView(LoginRequiredMixin, ListView):
    login_url = reverse_lazy('app_user:login')
    template_name = 'app_report/list.html'
    context_object_name = 'report_list'

    def get_queryset(self):
        return Report.objects.filter(result='1').order_by('-created')


class ReportResultView(LoginRequiredMixin, UpdateView):
    login_url = reverse_lazy('app_user:login')
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        result_type = request.POST.get('result_type')
        if result_type:
            report = Report.objects.get(pk=kwargs.get('pk'))
            report.result = result_type
            report.save()
            if result_type == '2':
                instance = report.post or report.comment
                instance.delete()
            return JsonResponse(status=200, data={'data': True})
        return JsonResponse(status=400, data={'data': 'result_type'})
