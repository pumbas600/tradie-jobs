import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, Stack, Text, Th } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { SortingDirection } from '../../types/Sorting';

export interface SortableProps {
    isApplied?: boolean;
    handleApply(direction: SortingDirection): void;
    children?: ReactNode;
}

const Sortable = ({ isApplied, handleApply, children }: SortableProps) => {
    const [direction, setDirection] = useState<SortingDirection>('desc');

    const handleOnClick = () => {
        if (isApplied) {
            const newDirection = direction === 'asc' ? 'desc' : 'asc';
            setDirection(newDirection);
            handleApply(newDirection);
        } else {
            handleApply(direction);
        }
    };

    const renderSortingButton = (): ReactNode => {
        const tooltip =
            direction === 'asc' || !isApplied ? 'Change to sort by descending' : 'Change to sort by ascending';

        const commonProps: IconButtonProps = {
            variant: 'ghost',
            size: 'xs',
            color: isApplied ? 'current' : 'gray.400',
            title: tooltip,
            h: '16px',
            w: '16px',
            onClick: handleOnClick,
            'aria-label': tooltip,
        };

        return direction === 'asc' ? (
            <IconButton icon={<TriangleUpIcon />} {...commonProps} />
        ) : (
            <IconButton icon={<TriangleDownIcon />} {...commonProps} />
        );
    };

    return (
        <Th py={2}>
            <Stack direction="row" spacing={0} ml={-1}>
                {renderSortingButton()}
                <Text>{children}</Text>
            </Stack>
        </Th>
    );
};

export default Sortable;
