import { json, useLoaderData } from 'react-router-dom';

import SearchResults from '../components/Product/SearchResults/SearchResults';
import useBgColor from '../hooks/use-bg-color';

export const SearchResultsPage = () => {
    const data = useLoaderData();
    useBgColor('white', '#e3e6e6');

    return <SearchResults products={data.products} query={data.query} />;
};

export async function loader({ request }) {
    const url = new URL(request.url);

    const res = await fetch(
        `${process.env.REACT_APP_REST_API_URL}/products/search?${url.searchParams}`
    );

    if (!res.ok)
        throw json(
            { message: 'Something went wrong!!' },
            { status: res.status }
        );

    return res;
}
