import { Box, Container, Heading, Stack, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../../data/JobManager';
import { generateRandomJobs, getSelectedJob, setSelectedJob } from '../../../redux/slices/JobManager.slice';
import JobInfo from '../../../types/JobInfo';
import { SortingDirection } from '../../../types/Sorting';
import Sortable, { SortableProps } from '../../headers/Sortable';
import StatusTag from '../../status/StatusTag';
import Job from './Job';

type Comparator<T> = (a: T, b: T) => number;
type SortedBy = 'created' | 'status' | 'id' | 'name' | 'client';

const comparators: Record<SortedBy, Comparator<JobInfo>> = {
    created: (a, b) => a.created - b.created,
    status: (a, b) => -a.status.localeCompare(b.status),
    id: (a, b) => -a.id.localeCompare(b.id),
    name: (a, b) => -a.name.localeCompare(b.name),
    client: (a, b) => -a.client.name.localeCompare(b.client.name),
};

const Jobs = () => {
    const dispatch = useDispatch();
    const allJobs = useSelector(getAllJobs);
    const selectedJob = useSelector(getSelectedJob);

    const [visibleJobs, setVisibleJobs] = useState(allJobs);
    const [sortedBy, setSortedBy] = useState<SortedBy>('created');
    const [direction, setDirection] = useState<SortingDirection>('desc');

    useEffect(() => {
        // if (allJobs.length === 0) {
        //     dispatch(generateRandomJobs(5));
        // }
    }, [dispatch, allJobs]);

    const handleChangeSort = (by: SortedBy, direction: SortingDirection) => {
        setSortedBy(by);
        setDirection(direction);
        applySorting(by, direction);
    };

    const applySorting = (by: SortedBy, direction: SortingDirection) => {
        const comparator: Comparator<JobInfo> =
            direction === 'asc' ? comparators[by] : (a, b) => -comparators[by](a, b);

        const sortedJobs = [...visibleJobs];
        sortedJobs.sort(comparator);
        setVisibleJobs(sortedJobs);
    };

    const renderJobRow = (job: JobInfo) => {
        return (
            <Tr key={job.id} onClick={() => dispatch(setSelectedJob(job.id))} sx={{ _hover: { bg: 'gray.100' } }}>
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
            isApplied: property === sortedBy,
            handleApply: (direction) => handleChangeSort(property, direction),
        };
    };

    return (
        <Container maxW="1200px" my={4}>
            <Heading color="blue.600" mb={4}>
                Tradie Jobs
            </Heading>
            <Stack direction="row" gap={2}>
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
        </Container>
    );
};

export default Jobs;
