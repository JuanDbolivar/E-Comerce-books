from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import stripe


# Create your views here.

stripe = stripe(
    'sk_test_51OLAvzH7aI4EeVzAErUvtTrVVcJ7c4L05sofuZUqYmynnxgmFzOzccL0h4eqNcUqMq3YKAHalSNcpcuqSdcPRzxr00ui5lhVT5')


@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln',
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)
