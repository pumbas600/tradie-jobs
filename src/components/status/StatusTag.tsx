import { ChevronDownIcon } from '@chakra-ui/icons';
import { forwardRef, Stack, Text, ThemeTypings } from '@chakra-ui/react';
import { Status } from '../../types/JobInfo';

export const StatusColours: Record<Status, ThemeTypings['colors']> = {
    [Status.Active]: 'green.500',
    [Status.Completed]: 'blue.600',
    [Status.Invoicing]: 'blue.300',
    [Status.Scheduled]: 'orange.300',
    [Status.ToPrice]: 'orange.500',
};

const StatusTag = forwardRef<{ status: Status; isEditable?: boolean }, 'div'>(
    ({ status, isEditable, ...props }, ref) => {
        return (
            <Stack
                ref={ref}
                maxW="120px"
                minW="120px"
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                direction="row"
                bg={StatusColours[status]}
                px={4}
                py={0.5}
                h="28px"
                color="white"
                {...props}
            >
                <Text fontWeight="semibold" whiteSpace="nowrap">
                    {status}
                </Text>
                {isEditable && <ChevronDownIcon w="20px" h="20px" />}
            </Stack>
        );
    },
);

export default StatusTag;
