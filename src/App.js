import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import Bus from './utils/Bus';

import './App.css';
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

function App() {
    return <RouterProvider router={router} />;
}

export default App;
