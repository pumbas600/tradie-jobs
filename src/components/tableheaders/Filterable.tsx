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
import { ReactNode } from 'react';

export interface FilterOption<T = string> {
    value: T;
    render: ReactNode;
}

function Filterable<T extends string>({
    children,
    filterOptions,
    filters,
    handleChangeFilters,
}: {
    children?: ReactNode;
    filterOptions: FilterOption<T>[];
    filters: T[];
    handleChangeFilters(newFilters: T[]): void;
}) {
    const isApplied = filters.length !== filterOptions.length;
    const allChecked = filters.length === filterOptions.length;
    const isIndeterminate = filters.length !== 0 && isApplied;

    const handleFilter = (value: T, filtered: boolean) => {
        if (filtered) {
            handleChangeFilters([...filters, value]);
        } else {
            handleChangeFilters(filters.filter((filter) => filter !== value));
        }
    };

    const setAllFilters = (filtered: boolean) => {
        if (filtered) {
            handleChangeFilters(filterOptions.map((option) => option.value));
        } else {
            handleChangeFilters([]);
        }
    };

    const renderFilterOptions = (): ReactNode => {
        return filterOptions.map((option) => {
            return (
                <Checkbox
                    key={option.value}
                    isChecked={filters.includes(option.value)}
                    onChange={(e) => handleFilter(option.value, e.target.checked)}
                    fontWeight="normal"
                    color="chakra-body-text"
                    fontFamily="body"
                    textTransform="none"
                    letterSpacing="normal"
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
}

export default Filterable;
