from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.mail import send_mail


@api_view(['POST'])
def mail_to_send(request):
    data = request.data

    subject = 'Compra Exitosa'
    addressee = data.get('addressee')
    message = data.get('message')

    send_mail(subject, message, 'pflibrosgrupo07@gmail.com', [addressee])

    return Response({'message': 'successful email sending'})
