import Sales from '@/views/Sales.vue';
import Stock from '@/views/Stock.vue';
import TransactionList from '@/views/TransactionList.vue';
import Users from '@/views/Users.vue';
import AddStock from '@/views/AddStock.vue';
import { createRouter, createWebHistory } from 'vue-router';
import AddProduct from '../views/AddProduct.vue';
import Dashboard from '../views/Dashboard.vue';
import LoginForm from '../views/LoginForm.vue';
import Layout from '../components/Layout.vue';
import Products from '../views/Products.vue';

const routes = [
  {
    path: '/',
    component: LoginForm,
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      { path: '', component: Dashboard },
      { path: '/products', component: Products },
      { path: '/stocks', component: Stock },
      {
        path: '/add-product/:id?',
        name: 'AddProduct',
        component: AddProduct,
        props: true, // Allows passing route params as props
      },      
      { path: '/sales', component: Sales },
      { path: '/add-stock', component: AddStock },
      { path: '/users', component: Users },
      { path: '/transaction-list', component: TransactionList },

    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth'); 
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
