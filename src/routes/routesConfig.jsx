import { lazy } from 'react';

// Страницы с Header
export const pagesWithHeader = [
  { path: '/', component: lazy(() => import('../pages/Index')) },
];

// 404
export const notFoundRoute = { path: '/*', component: lazy(() => import('../pages/PageNotFound')) };
