import { Router } from 'express';
import { AuthRotues } from '../modules/auth/auth-route';
import { UserRotues } from '../modules/user/user-route';
import { ProductRoutes } from '../modules/product/product.route';
import { CartRoutes } from '../modules/addToCart/cart.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRotues,
  },
  {
    path: '/auth',
    route: AuthRotues,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
