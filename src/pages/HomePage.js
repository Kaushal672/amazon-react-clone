import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Carousel from '../components/Carousel/Carousel';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import CardSlider from '../components/CardSlider/CardSlider';

const HomePage = function () {
    const { products, isError, message } = useLoaderData();
    if (isError) {
        return <p>{message}</p>;
    }

    return (
        <>
            <Helmet>
                <title>Amazon</title>
            </Helmet>
            <Carousel />
            <Suspense fallback={<LoadingSpinner />}>
                <Await
                    resolve={products}
                    errorElement={
                        <p
                            style={{
                                fontWeight: 600,
                                fontSize: '18px',
                                margin: '2rem 0',
                            }}>
                            Could not fetch products. Try again later!
                        </p>
                    }>
                    {(loadedProd) => {
                        const tdProducts = loadedProd.products.filter(
                            (el) => el.offer === "Today's deals"
                        );
                        const bsProducts = loadedProd.products.filter(
                            (el) => el.offer === 'Best seller'
                        );
                        return (
                            <>
                                <CardSlider
                                    products={tdProducts}
                                    category="Today's deals"
                                />
                                <CardSlider
                                    products={bsProducts}
                                    category='Best Sellers of the week'
                                />
                            </>
                        );
                    }}
                </Await>
            </Suspense>
        </>
    );
};

export default HomePage;

async function loadProdcuts() {
    const res = await fetch('http://localhost:8080/products');
    if (!res.ok) {
        throw json({ message: 'Could not fetch products.' }, { status: 500 });
    }
    const data = await res.json();
    return data;
}

export function loader() {
    return defer({ products: loadProdcuts() });
}
