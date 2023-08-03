import { useState, useEffect, useCallback } from 'react';

import ArrowButton from '../ArrowButton/ArrowButton';
import Card from '../Card/Card';
import classes from './Carousel.module.css';

const slideImages = [
    'https://res.cloudinary.com/dlds2z087/image/upload/v1690977892/Amazon-Products/slides/slide-1_qjrje0.jpg',
    'https://res.cloudinary.com/dlds2z087/image/upload/v1690977897/Amazon-Products/slides/slide-2_b4fhui.jpg',
    'https://res.cloudinary.com/dlds2z087/image/upload/v1690977894/Amazon-Products/slides/slide-3_wapunn.jpg',
    'https://res.cloudinary.com/dlds2z087/image/upload/v1690977896/Amazon-Products/slides/slide-4_tqxqit.jpg',
    'https://res.cloudinary.com/dlds2z087/image/upload/v1690977947/Amazon-Products/slides/slide-5_yfnfxw.png',
    'https://res.cloudinary.com/dlds2z087/image/upload/v1690977904/Amazon-Products/slides/slide-6_tanh45.jpg',
    'https://res.cloudinary.com/dlds2z087/image/upload/v1690977911/Amazon-Products/slides/slide-7_mvuoie.jpg',
];

const Carousel = function () {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);

    const moveCarousel = useCallback(
        (move) => {
            const totalSlides = slideImages.length;
            let nextSlide = (currentIndex + move) % totalSlides;

            if (nextSlide < 0) nextSlide = totalSlides - 1;
            setCurrentIndex(nextSlide);
        },
        [currentIndex]
    );

    useEffect(() => {
        let slideInterval;
        if (autoSlide) {
            slideInterval = setInterval(() => moveCarousel(1), 5000);
        }
        return () => clearInterval(slideInterval);
    }, [autoSlide, moveCarousel]);

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
                            onClick={() => {
                                moveCarousel(-1);
                                setAutoSlide((prevState) => !prevState);
                            }}
                        />
                        <ArrowButton
                            direction='right'
                            onClick={() => {
                                moveCarousel(1);
                                setAutoSlide((prevState) => !prevState);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={classes['card-container']}>
                <Card
                    id={1}
                    title='Up to 70% off | Clearance store'
                    img={require('../../images/Card-1.jpg')}
                />
                <Card
                    id={2}
                    title='Bluetooth Calling Smartwatch starts at ₹1,999'
                    img={require('../../images/Card-2.jpg')}
                />
                <Card
                    id={3}
                    title='Kitchen organizers from local shops'
                    img={require('../../images/Card-3.jpg')}
                />
                <Card
                    id={4}
                    title='Casual wear series from local shops'
                    img={require('../../images/Card-4.jpg')}
                />
            </div>
        </div>
    );
};

export default Carousel;
