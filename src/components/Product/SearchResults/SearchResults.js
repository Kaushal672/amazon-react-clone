import SearchResultCard from './SearchResultCard/SearchResultCard';
import classes from './SearchResults.module.css';

const SearchResults = ({ products = [], query }) => {
    return (
        <div className={classes['search__result-wrapper']}>
            <h3>
                {products.length} result{products.length > 1 ? 's' : ''} for "
                {query}"
            </h3>
            <div className={classes['search__result-container']}>
                {products.map((product) => (
                    <SearchResultCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
