import { Box, Text } from '@chakra-ui/react';
import NoteInfo from '../../../types/NoteInfo';

const Note = ({ note }: { note: NoteInfo }) => {
    return (
        <Box borderColor="gray.500" borderLeftWidth={4} px={3} py={1}>
            <Text>{note.message}</Text>
        </Box>
    );
};

export default Note;
