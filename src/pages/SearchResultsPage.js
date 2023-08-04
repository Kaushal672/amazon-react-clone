import { json, useLoaderData } from 'react-router-dom';

import BGWhite from '../components/Helper/BGWhite';
import SearchResults from '../components/Product/SearchResults/SearchResults';

export const SearchResultsPage = () => {
    const data = useLoaderData();

    return (
        <>
            <BGWhite />
            <SearchResults products={data.products} query={data.query} />
        </>
    );
};

export async function loader({ request }) {
    const url = new URL(request.url);

    const res = await fetch(
        'http://localhost:8080/products/search?' + url.searchParams
    );

    if (!res.ok)
        throw json(
            { message: 'Something went wrong!!' },
            { status: res.status }
        );

    return res;
}
