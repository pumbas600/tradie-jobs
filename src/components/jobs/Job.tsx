import { PhoneIcon, EmailIcon, AddIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Box, IconButton, Stack, Text, Textarea } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateStatus } from '../../redux/slices/JobManager.slice';
import JobInfo, { Status } from '../../types/JobInfo';
import Note from '../notes/Note';
import StatusMenu from '../status/StatusMenu';

const Job = ({ job }: { job: JobInfo }) => {
    const dispatch = useDispatch();
    const [newNote, setNewNote] = useState<string | null>(null);

    useEffect(() => {
        // When the job is changed, discard the current note
        setNewNote(null);
    }, [job]);

    const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewNote(e.target.value);
    };

    const handleSaveNewNote = () => {
        // This will also only be called if there is a non-empty message
        dispatch(addNote({ message: newNote!.trim(), created: new Date().getTime() }));
        setNewNote(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Shortcut for discarding new note
        if (e.key === 'Escape') {
            setNewNote(null);
        }
    };

    const handleChangeStatus = (newStatus: Status) => {
        dispatch(updateStatus(newStatus));
    };

    const renderContactInfo = (icon: ReactNode, label: string): ReactNode => {
        return (
            <Stack direction="row" alignItems="center">
                {icon}, <Text>{label}</Text>
            </Stack>
        );
    };

    const renderNotes = (): ReactNode => {
        return job.notes.map((note, index) => <Note key={note.created} index={index} note={note} />);
    };

    const renderNoteButtons = (): ReactNode => {
        return newNote === null ? (
            <IconButton
                variant="ghost"
                title="Add new note"
                aria-label="Add new note"
                icon={<AddIcon />}
                size="sm"
                onClick={() => setNewNote('')}
            />
        ) : (
            <Box>
                {newNote.trim().length !== 0 && (
                    <IconButton
                        variant="ghost"
                        title="Save new note"
                        aria-label="Save new note"
                        icon={<CheckIcon />}
                        size="sm"
                        onClick={handleSaveNewNote}
                    />
                )}
                <IconButton
                    variant="ghost"
                    title="Discard new note"
                    aria-label="Discard new note"
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={() => setNewNote(null)}
                />
            </Box>
        );
    };

    return (
        <Stack px={2} w="full" spacing={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2}>
                <Stack spacing={1}>
                    <Text fontSize="2xl" lineHeight={1} fontWeight="bold" color="blue.600">
                        {job.name}
                    </Text>
                    <Text fontWeight="semibold" color="gray.600">
                        {job.id}
                    </Text>
                </Stack>
                <StatusMenu status={job.status} handleChange={handleChangeStatus} />
            </Stack>
            <Text>
                {new Date(job.created).toLocaleDateString(undefined, {
                    hour: 'numeric',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
            </Text>
            <Stack spacing={0}>
                <Text fontWeight="semibold">{job.client.name}</Text>
                {job.client.phone && renderContactInfo(<PhoneIcon />, job.client.phone)}
                {job.client.email && renderContactInfo(<EmailIcon />, job.client.email)}
            </Stack>
            {job.description && <Text>{job.description}</Text>}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">
                    Notes
                </Text>
                {renderNoteButtons()}
            </Stack>
            {newNote !== null && (
                <Textarea
                    placeholder="Enter note here..."
                    value={newNote}
                    onChange={handleChangeMessage}
                    onKeyDown={handleKeyPress}
                />
            )}
            <Stack>{renderNotes()}</Stack>
        </Stack>
    );
};

export default Job;
