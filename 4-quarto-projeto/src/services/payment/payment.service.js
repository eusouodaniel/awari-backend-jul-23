import axios from 'axios';

class PaymentService {
  async processPayment() {
    const payment = {
      customer: {
        name: "Daniel Rodrigues",
        email: "daniel@awari.com",
        tax_id: "22106265018"
      },
      reference_id: "1",
      items: [
        {
          name: "Tênis",
          quantity: 2,
          unit_amount: 10000
        }
      ]
    }
    try {
      const response = await axios.post('https://sandbox.api.pagseguro.com/orders', payment, {
        'Authorization': '',
        'accept': 'application/json',
        'content-type': 'application/json',
      });
      return response;
    } catch (error) {
      console.log(error.response.data);
      return false;
    }
  }
}

export default new PaymentService();