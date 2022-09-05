import { PhoneIcon, EmailIcon, AddIcon } from '@chakra-ui/icons';
import { IconButton, Stack, Text } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import JobInfo from '../../../types/JobInfo';
import StatusTag from '../../status/StatusTag';

const Job = ({ job }: { job: JobInfo }) => {
    const [newNote, setNewNote] = useState<string | null>(null);

    const renderContactInfo = (icon: ReactNode, label: string): ReactNode => {
        return (
            <Stack direction="row" alignItems="center">
                {icon}, <Text>{label}</Text>
            </Stack>
        );
    };

    return (
        <Stack px={2} minW="360px" spacing={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack spacing={-1}>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                        {job.name}
                    </Text>
                    <Text fontWeight="semibold" color="gray.500">
                        {job.id}
                    </Text>
                </Stack>
                <StatusTag status={job.status} />
            </Stack>
            <Text>
                {job.created.toLocaleDateString(undefined, {
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
                <IconButton
                    title="Add new note"
                    aria-label="Add new note"
                    icon={<AddIcon />}
                    size="sm"
                    onClick={() => setNewNote('')}
                />
            </Stack>
        </Stack>
    );
};

export default Job;
