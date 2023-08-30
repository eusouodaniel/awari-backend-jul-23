import axios from 'axios';

class PaymentService {
  async processPayment(input) {
    const payment = this.mountPaymentBody(input);
    try {
      const response = await axios.post(`${process.env.PAYMENT_GATEWAY_BASE_URL}/orders`, payment, {
        headers: {
          'Authorization': `${process.env.PAYMENT_GATEWAY_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return false;
    }
  }

  mountPaymentBody(body) {
    const unitAmount = body.item.unitAmount * 100;
    const referenceId = Math.random().toString().replace('.','');
    return {
      reference_id: `purchase-${referenceId}`,
      customer: {
        name: body.user.name,
        email: body.user.email,
        tax_id: body.user.documentNumber
      },
      shipping: {
        address: {
          street: body.user.address.street,
          number: body.user.address.number,
          complement: body.user.address.complement,
          locality: body.user.address.locality,
          city: body.user.address.city,
          region_code: body.user.address.regionCode,
          country: body.user.address.country,
          postal_code: body.user.address.postalCode
        }
      },
      items: [
        {
          name: body.item.name,
          quantity: body.item.quantity,
          unit_amount: unitAmount
        }
      ],
      charges: [
        {
          amount: {
            value: unitAmount * body.item.quantity,
            currency: 'BRL'
          },
          payment_method: {
            card: {
              holder: {
                name: body.payment.cardHolderName
              },
              number: body.payment.cardNumber,
              exp_month: body.payment.cardExpMonth,
              exp_year: body.payment.cardYearMonth,
              security_code: body.payment.cardSecurityCode
            },
            type: 'CREDIT_CARD',
            installments: 3,
            capture: true,
            soft_descriptor: `Loja teste-${body.item.name}`
          },
          reference_id: `payment-${referenceId}`,
          description: `Compra de uma ${body.item.name}`
        }
      ]
    }
  }
}

export default new PaymentService();