import { Router } from 'express';
import UserController from './controllers/user/user.controller.js';
import PaymentController from './controllers/payment/payment.controller.js';

const routes = Router();

/* Rotas de usuário */
routes.get('/usuarios', UserController.list);
routes.post('/usuarios', UserController.create);
routes.put('/usuarios/:id', UserController.update);
routes.patch('/usuarios/:id', UserController.update);
routes.delete('/usuarios/:id', UserController.delete);

/* Rotas de pagamento */
routes.post('/payment', PaymentController.payment);

export default routes;