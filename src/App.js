import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import Bus from './utils/Bus';

window.flash = (message) => Bus.emit('flash', message);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
