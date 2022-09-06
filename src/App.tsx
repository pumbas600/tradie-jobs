import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Jobs from './components/pages/jobs/Jobs';
import { generateRandomJobs, getAllJobs } from './redux/slices/JobManager.slice';
import { setVisibleJobs } from './redux/slices/Sorting.slice';
import { AppDispatch } from './redux/Store';

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    const allJobs = useSelector(getAllJobs);

    useEffect(() => {
        const jobs = Object.keys(allJobs);
        if (jobs.length === 0) {
            dispatch(generateRandomJobs(5));
        } else {
            dispatch(setVisibleJobs(jobs));
        }
    }, [allJobs, dispatch]);

    return (
        <ChakraProvider>
            <Jobs />
        </ChakraProvider>
    );
};

export default App;
