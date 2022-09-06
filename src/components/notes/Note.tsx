import NoteInfo from '../../types/NoteInfo';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Editable,
    EditablePreview,
    EditableTextarea,
    Flex,
    IconButton,
    Stack,
    useEditable,
    useEditableControls,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../../redux/slices/JobManager.slice';

const Note = ({ index, note }: { index: number; note: NoteInfo }) => {
    const dispatch = useDispatch();
    const [newValue, setNewValue] = useState(note.message);

    const handleUpdateMessage = (newMessage: string) => {
        dispatch(updateNote({ noteIndex: index, newMessage }));
    };

    const handleDelete = () => {
        dispatch(deleteNote(index));
    };

    return (
        <Editable
            itemRef=""
            defaultValue={newValue}
            isPreviewFocusable={false}
            onChange={(value) => setNewValue(value)}
            onSubmit={handleUpdateMessage}
        >
            <Stack direction="row" justifyContent="space-between">
                <EditablePreview borderColor="gray.400" borderLeftWidth={4} pl={3} py={1} borderRadius="none" />
                <EditableTextarea px={2} />
                <EditableControls canSave={newValue.trim().length !== 0} handleDelete={handleDelete} />
            </Stack>
        </Editable>
    );
};

const EditableControls = ({ canSave, handleDelete }: { canSave: boolean; handleDelete(): void }) => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
        <Stack direction="column" justifyContent="center" px={0.5}>
            {canSave && (
                <IconButton
                    variant="ghost"
                    title="Save changes"
                    aria-label="Save changes"
                    icon={<CheckIcon />}
                    size="xs"
                    {...getSubmitButtonProps()}
                />
            )}
            <IconButton
                variant="ghost"
                title="Discard changes"
                aria-label="Discard changes"
                icon={<CloseIcon />}
                size="xs"
                {...getCancelButtonProps()}
            />
            <IconButton
                variant="ghost"
                title="Delete note"
                aria-label="Delete note"
                icon={<DeleteIcon />}
                size="xs"
                {...getSubmitButtonProps()}
                onClick={handleDelete}
            />
        </Stack>
    ) : (
        <Flex justifyContent="center">
            <IconButton
                variant="ghost"
                title="Edit note"
                aria-label="Edit note"
                size="sm"
                icon={<EditIcon />}
                {...getEditButtonProps()}
            />
        </Flex>
    );
};

export default Note;
