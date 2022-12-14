import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { IconButton, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchFilter } from '../../redux/slices/Sorting.slice';

const SearchBar = ({ placeholder }: { placeholder: string }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => dispatch(setSearchFilter(search)), 300);
        return () => clearTimeout(timeout);
    }, [search, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(setSearchFilter(search));
        } else if (e.key === 'Escape') {
            setSearch('');
        }
    };

    return (
        <InputGroup maxW="500px">
            <InputLeftElement>
                <SearchIcon color={search.length === 0 ? 'gray.500' : 'inherit'} />
            </InputLeftElement>
            <Input
                value={search}
                placeholder={placeholder}
                bg="white"
                onChange={handleChange}
                _focusVisible={{ boxShadow: 'none' }}
                onKeyDown={handleKeyPress}
            />
            {search.length !== 0 && (
                <InputRightElement>
                    <IconButton
                        title="Clear Search"
                        aria-label="Clear Search"
                        onClick={() => setSearch('')}
                        icon={<CloseIcon />}
                    />
                </InputRightElement>
            )}
        </InputGroup>
    );
};

export default SearchBar;
