import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, Stack, Text } from '@chakra-ui/react';
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
        <Stack direction="row" spacing={1} ml={-1} alignItems="center">
            {renderSortingButton()}
            <Text>{children}</Text>
        </Stack>
    );
};

export default Sortable;
