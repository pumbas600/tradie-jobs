import { Box, Container, Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { getAllJobs } from '../../../data/JobManager';
import JobInfo from '../../../types/JobInfo';
import { SortingDirection } from '../../../types/Sorting';
import Sortable from '../../headers/Sortable';
import StatusTag from '../../status/StatusTag';
import Job from './Job';

type SortedBy = 'created' | 'status' | 'id' | 'name' | 'client';

const Jobs = () => {
    const [visibleJobs, setVisibleJobs] = useState(getAllJobs());
    const [selectedJob, setSelectedJob] = useState<JobInfo | null>(null);
    const [sortedBy, setSortedBy] = useState<SortedBy>('created');
    const [direction, setDirection] = useState<SortingDirection>('desc');

    const renderJobRow = (job: JobInfo) => {
        return (
            <Tr key={job.id} onClick={() => setSelectedJob(job)} sx={{ _hover: { bg: 'gray.100' } }}>
                <Td py={2}>
                    <StatusTag status={job.status} />
                </Td>
                <Td py={2}>{job.id}</Td>
                <Td py={2}>{job.name}</Td>
                <Td py={2}>{job.client.name}</Td>
            </Tr>
        );
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
                                <Sortable>Status</Sortable>
                                <Sortable>ID</Sortable>
                                <Sortable>Name</Sortable>
                                <Sortable>Client</Sortable>
                            </Tr>
                        </Thead>
                        <Tbody>{visibleJobs.map(renderJobRow)}</Tbody>
                    </Table>
                </TableContainer>
                <Box maxW="360px" minW="360px" h="full">
                    {selectedJob ? <Job job={selectedJob} /> : <Heading color="gray.500">No Selected Job</Heading>}
                </Box>
            </Stack>
        </Container>
    );
};

export default Jobs;
