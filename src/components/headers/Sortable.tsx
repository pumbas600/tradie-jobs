import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Stack, Text, Th } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { SortingDirection } from '../../types/Sorting';

const Sortable = ({ isApplied, children }: { isApplied?: boolean; children?: ReactNode }) => {
    const [direction, setDirection] = useState<SortingDirection>('desc');

    return (
        <Th py={2}>
            <Stack direction="row">
                <Box color={isApplied ? 'inherit' : 'gray.400'} mb="1px">
                    {direction === 'asc' ? <TriangleUpIcon /> : <TriangleDownIcon />}
                </Box>
                <Text>{children}</Text>
            </Stack>
        </Th>
    );
};

export default Sortable;
