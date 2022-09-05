import { Container, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { getAllJobs } from '../../data/JobManager';
import JobInfo, { Status } from '../../types/JobInfo';
import StatusTag from '../status/StatusTag';

const Jobs = () => {
    const [visibleJobs, setVisibleJobs] = useState(getAllJobs());

    const renderJobRow = (job: JobInfo) => {
        return (
            <Tr>
                <Td>
                    <StatusTag status={job.status} />
                </Td>
                <Td>{job.id}</Td>
                <Td>{job.name}</Td>
                <Td>{job.client.name}</Td>
            </Tr>
        );
    };

    return (
        <Container maxW="container.lg" my={4}>
            <Heading color="blue.600">Jobs</Heading>
            <TableContainer>
                <Table variant="simple">
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
            <StatusTag status={Status.Completed} />
        </Container>
    );
};

export default Jobs;
