import {
    Checkbox,
    Flex,
    Icon,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import { ReactNode, useState } from 'react';

export interface FilterOption {
    value: string;
    render: ReactNode;
}

const Filterable = ({ children, filterOptions }: { children?: ReactNode; filterOptions: FilterOption[] }) => {
    const [filters, setFilters] = useState<string[]>(filterOptions.map((option) => option.value));

    const isApplied = filters.length !== filterOptions.length;
    const allChecked = filters.length === filterOptions.length;
    const isIndeterminate = filters.length !== 0 && isApplied;

    const handleFilter = (value: string, filtered: boolean) => {
        if (filtered) {
            setFilters([...filters, value]);
        } else {
            setFilters(filters.filter((filter) => filter !== value));
        }
    };

    const setAllFilters = (filtered: boolean) => {
        if (filtered) {
            setFilters(filterOptions.map((option) => option.value));
        } else {
            setFilters([]);
        }
    };

    const renderFilterOptions = (): ReactNode => {
        return filterOptions.map((option) => {
            return (
                <Checkbox
                    key={option.value}
                    isChecked={filters.includes(option.value)}
                    onChange={(e) => handleFilter(option.value, e.target.checked)}
                >
                    {option.render}
                </Checkbox>
            );
        });
    };

    return (
        <Flex direction="row" alignItems="center" justifyContent="space-between">
            {children}
            <Popover>
                <PopoverTrigger>
                    <IconButton
                        aria-label="Filter column"
                        title="Filter column"
                        icon={<Icon as={FaFilter} />}
                        variant="ghost"
                        size="xs"
                        color={isApplied ? 'current' : 'gray.400'}
                    />
                </PopoverTrigger>
                <PopoverContent w="min">
                    <PopoverHeader>
                        <Stack direction="row">
                            <Checkbox
                                isChecked={allChecked}
                                isIndeterminate={isIndeterminate}
                                onChange={(e) => setAllFilters(e.target.checked)}
                                title={!allChecked && isIndeterminate ? 'Check all' : 'Uncheck all'}
                            />
                            <Text>Select filters</Text>
                        </Stack>
                    </PopoverHeader>
                    <PopoverBody>
                        <Stack>{renderFilterOptions()}</Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};

export default Filterable;
