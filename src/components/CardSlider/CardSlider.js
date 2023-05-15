import { useState } from 'react';
import ArrowButtom from '../ArrowButton/ArrowButton';
import SliderCard from '../SliderCard/SliderCard';
import classes from './CardSlider.module.css';

const CardSlider = ({ cards, category }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    const handlePrevButton = () => {
        setSlideIndex((prevState) => {
            if (prevState === 0) {
                return (prevState = cards.length - 6 + 1);
            }
            return prevState - 1;
        });
    };
    const handleNextButton = () => {
        setSlideIndex((prevState) => {
            if (prevState + 6 - 1 === cards.length) {
                return (prevState = 0);
            }
            return prevState + 1;
        });
    };
    return (
        <div className={classes['card__slider-wrapper']}>
            <h2 className={classes['product-category']}>{category}</h2>
            <ArrowButtom
                direction='left'
                style={{
                    bottom: '150px',
                    backgroundColor: '#e9ecef',
                    width: '50px',
                    height: '80px',
                }}
                onClick={handlePrevButton}
            />
            <ArrowButtom
                direction='right'
                style={{
                    bottom: '150px',
                    backgroundColor: '#e9ecef',
                    width: '50px',
                    height: '80px',
                }}
                onClick={handleNextButton}
            />
            <div className={classes['card__sliders']}>
                <div
                    className={classes['card__slider-cards']}
                    style={{
                        transform: `translateX(-${slideIndex * (100 / 6)}%)`,
                    }}>
                    {cards.map((card, i) => (
                        <SliderCard card={card} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardSlider;
