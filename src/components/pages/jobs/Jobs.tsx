import { Box, Heading, Stack, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedJob, setSelectedJob } from '../../../redux/slices/JobManager.slice';
import { getSorting, getVisibleJobs, setSorting, setVisibleJobs } from '../../../redux/slices/Sorting.slice';
import { Comparator, SortedBy, SortingDirection } from '../../../types/Sorting';
import Sortable, { SortableProps } from '../../tableheaders/Sortable';
import StatusTag from '../../status/StatusTag';
import JobInfo from '../../../types/JobInfo';
import Job from './Job';
import { useEffect } from 'react';
import Content from '../../Content';
import Header from '../../header';

const comparators: Record<SortedBy, Comparator<JobInfo>> = {
    created: (a, b) => a.created - b.created,
    status: (a, b) => -a.status.localeCompare(b.status),
    id: (a, b) => -a.id.localeCompare(b.id),
    name: (a, b) => -a.name.localeCompare(b.name),
    client: (a, b) => -a.client.name.localeCompare(b.client.name),
};

const Jobs = ({ allJobs }: { allJobs: Record<string, JobInfo> }) => {
    const dispatch = useDispatch();
    const selectedJob = useSelector(getSelectedJob);
    const sorting = useSelector(getSorting);
    const visibleJobs = useSelector(getVisibleJobs);

    useEffect(() => {
        console.log('set visible');
        console.log(allJobs);
        dispatch(setVisibleJobs(Object.keys(allJobs)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleChangeSort = (by: SortedBy, direction: SortingDirection) => {
        applySorting(by, direction);
        dispatch(setSorting({ by, direction }));
    };

    const applySorting = (by: SortedBy, direction: SortingDirection) => {
        const comparator: Comparator<JobInfo> =
            direction === 'asc' ? comparators[by] : (a, b) => -comparators[by](a, b);

        const sortedJobs = [...visibleJobs];
        sortedJobs.sort((a, b) => comparator(allJobs[a], allJobs[b]));
        dispatch(setVisibleJobs(sortedJobs));
    };

    const renderJobRow = (jobId: string) => {
        const job = allJobs[jobId];

        return (
            <Tr key={jobId} onClick={() => dispatch(setSelectedJob(jobId))} sx={{ _hover: { bg: 'gray.100' } }}>
                <Td py={2}>
                    <StatusTag status={job.status} />
                </Td>
                <Td py={2}>{job.id}</Td>
                <Td py={2}>{job.name}</Td>
                <Td py={2}>{job.client.name}</Td>
            </Tr>
        );
    };

    const getSortableProps = (property: SortedBy): SortableProps => {
        return {
            isApplied: property === sorting.by,
            handleApply: (direction) => handleChangeSort(property, direction),
        };
    };

    return (
        <Box>
            <Header></Header>
            <Content>
                <Stack direction="row" gap={2} mt={5}>
                    <TableContainer w="full">
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Sortable {...getSortableProps('status')}>Status</Sortable>
                                    <Sortable {...getSortableProps('id')}>ID</Sortable>
                                    <Sortable {...getSortableProps('name')}>Name</Sortable>
                                    <Sortable {...getSortableProps('client')}>Client</Sortable>
                                </Tr>
                            </Thead>
                            <Tbody>{visibleJobs.map(renderJobRow)}</Tbody>
                        </Table>
                    </TableContainer>
                    <Box maxW="360px" minW="360px" h="full">
                        {selectedJob ? <Job job={selectedJob} /> : <Heading color="gray.600">No Selected Job</Heading>}
                    </Box>
                </Stack>
            </Content>
        </Box>
    );
};

export default Jobs;
