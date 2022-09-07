import { Heading, Stack, Text } from '@chakra-ui/react';

const NoSelectedJob = () => {
    return (
        <Stack color="gray.600" alignItems="center" textAlign="center">
            <Heading>No Selected Job</Heading>
            <Text fontSize="lg" fontWeight="semibold" w="90%" lineHeight={1.2}>
                Click on a job in the table to see more info about it
            </Text>
        </Stack>
    );
};

export default NoSelectedJob;
