import { useState } from 'react';
import ArrowButton from '../ArrowButton/ArrowButton';
import Card from '../Card/Card';
import classes from './Carousel.module.css';

const slideImages = [
    require('../../images/slide-1.jpg'),
    require('../../images/slide-2.jpg'),
    require('../../images/slide-3.jpg'),
    require('../../images/slide-4.jpg'),
    require('../../images/slide-5.png'),
    require('../../images/slide-6.jpg'),
    require('../../images/slide-7.jpg'),
];

const Carousel = function () {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePreviousButton = () => {
        setCurrentIndex(
            (currentIndex - 1 + slideImages.length) % slideImages.length
        );
    };
    const handleNextButton = () => {
        setCurrentIndex((currentIndex + 1) % slideImages.length);
    };

    return (
        <div className={classes['carousel-content']}>
            <div className={classes.carousel}>
                <div className={classes.slide}>
                    {slideImages.map((img, i) => (
                        <img
                            src={img}
                            alt={`slide ${i + 1}`}
                            className={i === currentIndex ? classes.active : ''}
                            key={i + 1}
                        />
                    ))}
                    <div className={classes.overlay}></div>
                    <div className={classes['carousel__slide-btns']}>
                        <ArrowButton
                            direction='left'
                            onClick={handlePreviousButton}
                        />
                        <ArrowButton
                            direction='right'
                            onClick={handleNextButton}
                        />
                    </div>
                </div>
            </div>
            <div className={classes['card-container']}>
                <Card
                    title='Up to 70% off | Clearance store'
                    img={require('../../images/Card-1.jpg')}
                />
                <Card
                    title='Bluetooth Calling Smartwatch starts at ₹1,999'
                    img={require('../../images/Card-2.jpg')}
                />
                <Card
                    title='Kitchen organizers from local shops'
                    img={require('../../images/Card-3.jpg')}
                />
                <Card
                    title='Casual wear series from local shops'
                    img={require('../../images/Card-4.jpg')}
                />
            </div>
        </div>
    );
};

export default Carousel;
