import { Box, Stack, Text } from '@chakra-ui/react';
import JobInfo from '../../../types/JobInfo';
import StatusTag from '../../status/StatusTag';

const Job = ({ job }: { job: JobInfo }) => {
    return (
        <Stack px={2} minW="320px">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                        {job.name}
                    </Text>
                    <Text fontWeight="semibold" color="gray.500" mt={-1}>
                        {job.id}
                    </Text>
                </Box>
                <StatusTag status={job.status} />
            </Stack>
        </Stack>
    );
};

export default Job;
