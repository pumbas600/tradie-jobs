import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import Jobs from './components/pages/jobs/Jobs';
import store from './redux/Store';

const App = () => {
    return (
        <Provider store={store}>
            <ChakraProvider>
                <Jobs />
            </ChakraProvider>
        </Provider>
    );
};

export default App;
