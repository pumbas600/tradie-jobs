import NoteInfo from '../../types/NoteInfo';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
    Editable,
    EditablePreview,
    EditableTextarea,
    Flex,
    IconButton,
    Stack,
    useEditableControls,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../redux/slices/JobManager.slice';

const Note = ({ index, note }: { index: number; note: NoteInfo }) => {
    const dispatch = useDispatch();
    const [newValue, setNewValue] = useState(note.message);

    const handleUpdateMessage = (newMessage: string) => {
        dispatch(updateNote({ noteIndex: index, newMessage }));
    };

    return (
        <Editable
            defaultValue={newValue}
            isPreviewFocusable={false}
            onChange={(value) => setNewValue(value)}
            onSubmit={handleUpdateMessage}
        >
            <Stack direction="row" justifyContent="space-between">
                <EditablePreview borderColor="gray.400" borderLeftWidth={4} pl={3} py={1} borderRadius="none" />
                <EditableTextarea px={2} />
                <EditableControls canSave={newValue.trim().length !== 0} />
            </Stack>
        </Editable>
    );
};

const EditableControls = ({ canSave }: { canSave: boolean }) => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
        <Stack direction="column" justifyContent="center">
            {canSave && (
                <IconButton
                    variant="ghost"
                    title="Save changes"
                    aria-label="Save changes"
                    icon={<CheckIcon />}
                    size="sm"
                    {...getSubmitButtonProps()}
                />
            )}
            <IconButton
                variant="ghost"
                title="Discard changes"
                aria-label="Discard changes"
                icon={<CloseIcon />}
                size="sm"
                {...getCancelButtonProps()}
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
