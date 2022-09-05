import { Box, Container, Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { getAllJobs } from '../../../data/JobManager';
import JobInfo from '../../../types/JobInfo';
import StatusTag from '../../status/StatusTag';
import Job from './Job';

const Jobs = () => {
    const [visibleJobs, setVisibleJobs] = useState(getAllJobs());
    const [selectedJob, setSelectedJob] = useState<JobInfo | null>(null);

    const renderJobRow = (job: JobInfo) => {
        return (
            <Tr key={job.id} onClick={() => setSelectedJob(job)} sx={{ _hover: { bg: 'gray.100' } }}>
                <Td p={2}>
                    <StatusTag status={job.status} />
                </Td>
                <Td p={2}>{job.id}</Td>
                <Td p={2}>{job.name}</Td>
                <Td p={2}>{job.client.name}</Td>
            </Tr>
        );
    };

    return (
        <Container maxW="1200px" my={4}>
            <Heading color="blue.600">Tradie Jobs</Heading>
            <Stack direction="row" gap={2}>
                <TableContainer w="full">
                    <Table variant="simple" size="md">
                        <Thead>
                            <Tr>
                                <Th>Status</Th>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th>Client</Th>
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
