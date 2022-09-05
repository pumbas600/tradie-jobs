import { Stack, Text } from '@chakra-ui/react';
import { Status } from '../../types/JobInfo';

const StatusTag = ({ status }: { status: Status }) => {
    const colours: Record<Status, string> = {
        [Status.Active]: 'green.500',
        [Status.Completed]: 'blue.600',
        [Status.Invoicing]: 'blue.400',
        [Status.Scheduled]: 'orange.400',
        [Status.ToPrice]: 'orange.600',
    };

    return (
        <Stack w="120px" borderRadius="lg" bg={colours[status]} px={4} py={0.5} gap={2} h="min">
            <Text color="white" fontWeight="semibold" whiteSpace="nowrap" align="center">
                {status}
            </Text>
        </Stack>
    );
};

export default StatusTag;
