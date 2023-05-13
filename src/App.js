import MainNavBar from './components/Layout/MainNavBar';
import Carousel from './components/Carousel/Carousel';
import Content from './components/Content/Content';
import './App.css';

function App() {
    return (
        <div className='App'>
            <MainNavBar />
            <Content>
                <Carousel />
            </Content>
        </div>
    );
}

export default App;
