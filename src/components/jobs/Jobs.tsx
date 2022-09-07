import { Box, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedJob } from '../../redux/slices/JobManager.slice';
import { setClientFilters, setVisibleJobs } from '../../redux/slices/Sorting.slice';
import { useEffect, useMemo } from 'react';
import { FilterOption } from '../tableheaders/Filterable';
import { allValues } from '../../helpers/Utilities';
import JobInfo, { Status } from '../../types/JobInfo';
import StatusTag from '../status/StatusTag';
import Job from './Job';
import Content from '../Content';
import Header from '../header';
import SearchBar from '../searchbar';
import Client from '../../types/Client';
import JobTable from './JobTable';
import NoSelectedJob from './NoSelectedJob';

const statusFilterOptions: FilterOption<Status>[] = allValues(Status).map((status) => ({
    value: status,
    render: <StatusTag status={status} />,
}));

const Jobs = ({ allJobs, allClients }: { allJobs: Record<string, JobInfo>; allClients: Record<string, Client> }) => {
    const dispatch = useDispatch();
    const selectedJob = useSelector(getSelectedJob);

    const clientFilterOptions: FilterOption[] = useMemo(
        () =>
            Object.values(allClients).map((client) => ({
                value: client.clientCode,
                render: <Text>{client.name}</Text>,
            })),
        [allClients],
    );

    useEffect(() => {
        dispatch(setVisibleJobs(Object.keys(allJobs)));
        dispatch(setClientFilters(Object.keys(allClients)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Stack h="100vh" alignItems="center">
            <Header>
                <SearchBar placeholder="Search by name or id..." />
            </Header>
            <Content>
                <Stack direction="row" gap={2} my={5}>
                    <JobTable
                        allJobs={allJobs}
                        clientFilterOptions={clientFilterOptions}
                        statusFilterOptions={statusFilterOptions}
                    />
                    <Box maxW="360px" minW="360px" h="full">
                        {selectedJob ? <Job job={selectedJob} /> : <NoSelectedJob />}
                    </Box>
                </Stack>
            </Content>
        </Stack>
    );
};

export default Jobs;
