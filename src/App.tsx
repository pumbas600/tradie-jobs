import { ChakraProvider } from '@chakra-ui/react';
import Jobs from './pages/Jobs';

const App = () => {
    return (
        <ChakraProvider>
            <Jobs />
        </ChakraProvider>
    );
};

export default App;
