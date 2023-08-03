import { useSnapCarousel } from 'react-snap-carousel';

import ArrowButton from '../ArrowButton/ArrowButton';
import SliderCard from '../SliderCard/SliderCard';
import classes from './CardSlider.module.css';

const CardSlider = ({ products, category }) => {
    const { scrollRef, activePageIndex, pages, next, prev } = useSnapCarousel();

    const style = {
        width: '40px',
        height: '80px',
        bottom: '150px',
        backgroundColor: '#e9ecef',
    };

    return (
        <div className={classes['card__slider-wrapper']}>
            <h2 className={classes['product-category']}>{category}</h2>
            <ArrowButton
                disabled={activePageIndex === 0}
                direction={'left'}
                onClick={prev}
                style={style}
            />
            <ArrowButton
                data={`${(activePageIndex, pages.length - 1)}`}
                disabled={activePageIndex === pages.length - 1}
                direction={'right'}
                onClick={next}
                style={style}
            />
            <div ref={scrollRef} className={classes['card__slider-cards']}>
                {products.map((product, i) => (
                    <SliderCard card={product} key={product._id} />
                ))}
            </div>
        </div>
    );
};

export default CardSlider;
