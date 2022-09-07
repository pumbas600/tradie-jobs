import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Jobs from './components/pages/jobs/Jobs';
import { generateRandomJobs, getAllJobs } from './redux/slices/JobManager.slice';
import Client from './types/Client';

const App = () => {
    const dispatch = useDispatch();

    const allJobs = useSelector(getAllJobs);

    useEffect(() => {
        const jobs = Object.keys(allJobs);
        if (jobs.length === 0) {
            dispatch(generateRandomJobs(10));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const allClients: Record<string, Client> = {};
    [...new Set(Object.values(allJobs).map((job) => job.client))].forEach((job) => (allClients[job.clientCode] = job));

    return (
        <ChakraProvider>
            {Object.keys(allJobs).length !== 0 && <Jobs allJobs={allJobs} allClients={allClients} />}
        </ChakraProvider>
    );
};

export default App;
