import MainNavBar from './components/Layout/MainNavBar';
import Carousel from './components/Carousel/Carousel';
import Content from './components/Content/Content';
import CardSlider from './components/CardSlider/CardSlider';

import './App.css';

function App() {
    const cards = [
        {
            id: 1,
            imageUrl: require('./images/slider-card-1.png'),
            title: 'New Card',
            description: 'Card details',
            discount: '56%',
        },
        {
            id: 1,
            imageUrl: require('./images/slider-card-2.png'),
            title: 'New Card',
            description: 'Card details',
            discount: '70%',
        },
        {
            id: 1,
            imageUrl: require('./images/slider-card-3.png'),
            title: 'New Card',
            description: 'Card details',
            discount: '45%',
        },
        {
            id: 1,
            imageUrl: require('./images/slider-card-4.png'),
            title: 'New Card',
            description: 'Card details',
            discount: '67%',
        },
        {
            id: 1,
            imageUrl: require('./images/slider-card-5.png'),
            title: 'New Card',
            description: 'Card details',
            discount: '46%',
        },
        {
            id: 1,
            imageUrl: require('./images/slider-card-6.png'),
            title: 'New Card',
            description: 'Card details',
            discount: '72%',
        },
        {
            id: 1,
            imageUrl: require('./images/slider-card-7.png'),
            title: 'New Card',
            description: 'Card details',
            discount: '33%',
        },
        {
            id: 1,
            imageUrl: require('./images/slider-card-8.png'),
            title: 'New Card',
            description: 'Card details',
            discount: '83%',
        },
    ];
    return (
        <div className='App'>
            <MainNavBar />
            <Content>
                <Carousel />
                <CardSlider cards={cards} category="Today's deals" />
                <CardSlider cards={cards} category='Best Sellers of the week' />
            </Content>
        </div>
    );
}

export default App;
