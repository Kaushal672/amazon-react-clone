import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RootLayout from './pages/Root';
import ErrorElement from './pages/ErrorElement';
import { action as quickAddressAction } from './components/Modal/Modal';
import { action as logoutAction } from './pages/Logout';
import AddressForm from './components/Address/AddressForm/AddressForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: async (meta) => {
                    const { loader } = await import('./pages/HomePage');
                    return loader(meta);
                },
            },
            {
                path: 'cart',
                lazy: async () => {
                    const {
                        CartPage: Component,
                        loader,
                        action,
                    } = await import('./pages/CartPage');
                    return { Component, loader, action };
                },
            },
            {
                path: 'products',
                children: [
                    {
                        path: ':id',
                        id: 'product-detail',
                        loader: async (meta) => {
                            const { loader } = await import(
                                './pages/ProductDetailPage'
                            );
                            return loader(meta);
                        },
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    const {
                                        ProductDetailPage: Component,
                                        loader,
                                        action,
                                    } = await import(
                                        './pages/ProductDetailPage'
                                    );
                                    return { Component, loader, action };
                                },
                            },
                            {
                                path: 'edit',
                                lazy: async () => {
                                    const {
                                        ProductEditPage: Component,
                                        action,
                                    } = await import('./pages/ProductEditPage');
                                    return { Component, action };
                                },
                            },
                        ],
                    },
                    {
                        path: 'new',
                        lazy: async () => {
                            const { ProductNewPage: Component } = await import(
                                './pages/ProductNewPage'
                            );
                            const { action } = await import(
                                './pages/ProductEditPage'
                            );
                            return { Component, action };
                        },
                    },
                    { index: true, element: <Navigate to={'new'} replace /> },
                ],
            },
            {
                path: 'orders',
                lazy: async () => {
                    const {
                        OrdersPage: Component,
                        action,
                        loader,
                    } = await import('./pages/OrdersPage');
                    return { Component, action, loader };
                },
            },
            {
                path: 'account',
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const { AccountDetailPage: Component } =
                                await import('./pages/AccountDetailPage');
                            return {
                                Component,
                            };
                        },
                    },
                    {
                        path: 'edit',
                        lazy: async () => {
                            const {
                                AccountEdit: Component,
                                loader,
                                action,
                            } = await import(
                                './components/Account/AccountEdit/AccountEdit'
                            );
                            return { Component, action, loader };
                        },
                    },
                ],
            },
            {
                path: 'seller-account',
                lazy: async () => {
                    const {
                        SellerAccountPage: Component,
                        action,
                        loader,
                    } = await import('./pages/SellerAccountPage');
                    return { Component, loader, action };
                },
            },
            {
                path: '/address',
                action: quickAddressAction,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const {
                                AddressPage: Component,
                                action,
                                loader,
                            } = await import('./pages/AddressPage');
                            return { Component, action, loader };
                        },
                    },
                    {
                        path: 'new',
                        element: <AddressForm edit={false} />,
                    },
                    {
                        path: 'edit',
                        element: <AddressForm edit={true} />,
                    },
                ],
            },
            {
                path: '/auth',
                lazy: async () => {
                    const { AuthenticationPage: Component, action } =
                        await import('./pages/AuthenticationPage');
                    return { Component, action };
                },
            },
            {
                path: '/logout',
                action: logoutAction,
            },
            {
                path: '/search',
                lazy: async () => {
                    const { SearchResultsPage: Component, loader } =
                        await import('./pages/SearchResultsPage');
                    return { Component, loader };
                },
            },
        ],
    },
]);
