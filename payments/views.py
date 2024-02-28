from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import stripe

# Create your views here.

stripe.api_key = 'sk_test_51OLAvzH7aI4EeVzAErUvtTrVVcJ7c4L05sofuZUqYmynnxgmFzOzccL0h4eqNcUqMq3YKAHalSNcpcuqSdcPRzxr00ui5lhVT5'


@api_view(['POST',])
def save_stripe_info(request):
    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    amount = data['amount']

    customer_data = stripe.Customer.list(email=email).data

    # if the array is empty it means the email has not been used yet
    if len(customer_data) == 0:
        customer = stripe.Customer.create(
            email=email, payment_method=payment_method_id
        )
    else:
        customer = customer_data[0]
        extra_msg = "Customer alredy existed"

    stripe.PaymentIntent.create(
        customer=customer,
        payment_method=payment_method_id,
        currency='usd',
        amount=int(amount),
        return_url='http://localhost:5173/',
        confirm=True
    )

    return Response(
        status=status.HTTP_200_OK,
        data={
            'message': 'Succes',
            'data': {'customer_id': customer.id,
                     'extra_msg': extra_msg}
        }
    )
