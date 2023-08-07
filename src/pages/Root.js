import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';

import MainNavBar from '../components/Layout/MainNavBar/MainNavBar';
import Content from '../components/Content/Content';
import Flash from '../components/Flash/Flash';
import Footer from '../components/Layout/Footer/Footer';

const RootLayout = function () {
    const navigation = useNavigation();
    return (
        <>
            <ScrollRestoration />
            <Flash />
            <MainNavBar isNavigating={navigation.state !== 'idle'} />
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </>
    );
};

export default RootLayout;
