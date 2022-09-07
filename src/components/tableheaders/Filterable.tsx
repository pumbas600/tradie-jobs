import { Checkbox, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import { ReactNode, useState } from 'react';

export interface FilterOption {
    value: string;
    render: ReactNode;
}

const Filterable = ({ children, filterOptions }: { children?: ReactNode; filterOptions: FilterOption[] }) => {
    const [filters, setFilters] = useState<string[]>(filterOptions.map((option) => option.value));

    const isApplied = filters.length !== filterOptions.length;

    const handleFilter = (value: string, filtered: boolean) => {
        if (filtered) {
            setFilters([...filters, value]);
        } else {
            setFilters(filters.filter((filter) => filter !== value));
        }
    };

    const renderFilterOptions = (): ReactNode => {
        return filterOptions.map((option) => {
            return (
                <MenuItem key={option.value} minW={0}>
                    <Checkbox
                        isChecked={filters.includes(option.value)}
                        onChange={(e) => handleFilter(option.value, e.target.checked)}
                    >
                        {option.render}
                    </Checkbox>
                </MenuItem>
            );
        });
    };

    return (
        <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
            {children}
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Filter column"
                    title="Filter column"
                    icon={<Icon as={FaFilter} />}
                    variant="ghost"
                    size="xs"
                    color={isApplied ? 'current' : 'gray.400'}
                />
                <MenuList>{renderFilterOptions()}</MenuList>
            </Menu>
        </Flex>
    );
};

export default Filterable;
