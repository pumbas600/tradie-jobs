import { Stack, Text } from '@chakra-ui/react';
import { Status } from '../../types/JobInfo';

const StatusTag = ({ status }: { status: Status }) => {
    const colours: Record<Status, string> = {
        [Status.Active]: 'green.500',
        [Status.Completed]: 'blue.600',
        [Status.Invoicing]: 'blue.300',
        [Status.Scheduled]: 'orange.300',
        [Status.ToPrice]: 'orange.500',
    };

    return (
        <Stack maxW="120px" minW="120px" borderRadius="lg" bg={colours[status]} px={4} py={0.5} gap={2} h="min">
            <Text color="white" fontWeight="semibold" whiteSpace="nowrap" align="center">
                {status}
            </Text>
        </Stack>
    );
};

export default StatusTag;
