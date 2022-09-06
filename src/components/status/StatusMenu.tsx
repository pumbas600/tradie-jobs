import { background, Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { allValues, darken } from '../../helpers/Utilities';
import { Status } from '../../types/JobInfo';
import StatusTag, { StatusColours } from './StatusTag';

const StatusMenu = ({ status, handleChange }: { status: Status; handleChange(newStatus: Status): void }) => {
    return (
        <Box>
            <Menu>
                <MenuButton
                    as={StatusTag}
                    status={status}
                    isEditable
                    w="min"
                    h="min"
                    _hover={{ bg: darken(StatusColours[status]) }}
                />
                <MenuList minW={0}>
                    {allValues(Status).map((status) => (
                        <MenuItem key={status} onClick={() => handleChange(status)}>
                            <StatusTag status={status} />
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
};

export default StatusMenu;
