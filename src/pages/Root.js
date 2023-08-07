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
            <div
                style={{
                    overflowX: 'hidden',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}>
                <Flash />
            </div>
            <MainNavBar isNavigating={navigation.state !== 'idle'} />
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </>
    );
};

export default RootLayout;
