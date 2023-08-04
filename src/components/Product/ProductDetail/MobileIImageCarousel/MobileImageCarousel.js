import { Carousel } from 'react-carousel-minimal';

import './MobileImageCarousel.css';

const MobileImageCarousel = ({ images }) => {
    const data = images.map((img) => {
        return { image: img.url, caption: 'product' };
    });
    return (
        <Carousel
            captionStyle={{ display: 'none' }}
            width={'100%'}
            data={data}
            dots={true}
            slideBackgroundColor='white'
            showNavBtn={false}
            slideImageFit='contain'
        />
    );
};

export default MobileImageCarousel;
