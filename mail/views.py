from django.core.mail import send_mail
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action


class MailViewSet(viewsets.ModelViewSet):
    @action(detail=False, methods=['post'])
    def mail_to_send(self, request):
        data = request.data

        addressee = data.get['addressee']
        subject = data.get['subject']
        message = data.get['message']

        send_mail(subject, message, 'pflibrosgrupo07@gmail.com', [addressee])

        return Response({'message': 'successful email sending'})
