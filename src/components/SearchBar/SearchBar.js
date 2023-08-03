import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import classes from './SearchBar.module.css';

const SearchBar = (props) => {
    const [categoryState, setCategoryState] = useState('');
    const containerRef = useRef(null);

    const handleFocusOnInput = () => {
        containerRef.current.style['box-shadow'] = '0 0 0 2pt #ffa200';
    };
    const handleBlurOnInput = () => {
        containerRef.current.style['box-shadow'] = 'none';
    };

    const handleSelectChange = (evt) => {
        setCategoryState(evt.target.value);
    };

    return (
        <div className={classes.container}>
            <form>
                <div className={classes.controls} ref={containerRef}>
                    <div className={classes['nav-left']}>
                        <div id={classes['nav-search-dropdown-card']}>
                            <div
                                className={`${classes['nav-search-scope']} ${classes['nav-sprite']}`}>
                                <div className={classes['nav-search-facade']}>
                                    <span id={classes['nav-search-label']}>
                                        {categoryState || 'All'}
                                    </span>
                                    <FontAwesomeIcon
                                        className={classes.caretDown}
                                        icon={faCaretDown}
                                        size='sm'
                                    />
                                </div>
                                <label
                                    id={classes['select-label']}
                                    htmlFor={`search-category-${display}`}>
                                    Select category for your search
                                </label>
                                <select
                                    name='category'
                                    defaultValue={'All'}
                                    onChange={handleSelectChange}
                                    className={classes['nav-search-dropdown']}
                                    id={`search-category-${display}`}>
                                    <option value='All'>All categories</option>
                                    <option value='Electronics'>
                                        Electronics
                                    </option>
                                    <option value='Home Appliance'>
                                        Home Appliance
                                    </option>
                                    <option value='Travelling'>
                                        Travelling
                                    </option>
                                    <option value='Gaming'>Gaming</option>
                                    <option value='Office Products'>
                                        Office Products
                                    </option>
                                    <option value='Clothing & Accessories'>
                                        Clothing & Accessories
                                    </option>
                                    <option value='Grocery & Gourmet Food'>
                                        Grocery & Garmet Food
                                    </option>
                                    <option value='Furniture'>Furniture</option>
                                    <option value='Home & Kitchen'>
                                        Home & Kitchen
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <input
                        onFocus={handleFocusOnInput}
                        onBlur={handleBlurOnInput}
                        type='search'
                        name='q'
                        placeholder='Search anything'
                    />
                    <button type='submit' className={classes['search-btn']}>
                        <FontAwesomeIcon icon={faSearch} size='xl' />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
