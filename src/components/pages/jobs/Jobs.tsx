import { Box, Heading, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedJob, setSelectedJob } from '../../../redux/slices/JobManager.slice';
import {
    getFilters,
    getSorting,
    getVisibleJobs,
    setClientFilters,
    setSorting,
    setStatusFilters,
    setVisibleJobs,
} from '../../../redux/slices/Sorting.slice';
import { Comparator, SortedBy, SortingInfo } from '../../../types/Sorting';
import { ReactNode, useCallback, useEffect } from 'react';
import Sortable from '../../tableheaders/Sortable';
import StatusTag from '../../status/StatusTag';
import JobInfo, { Status } from '../../../types/JobInfo';
import Job from './Job';
import Content from '../../Content';
import Header from '../../header';
import SearchBar from '../../searchbar';
import Filterable, { FilterOption } from '../../tableheaders/Filterable';
import { allValues, capitalise } from '../../../helpers/Utilities';
import Client from '../../../types/Client';

type TableColumn = { property: SortedBy; label?: string };

const comparators: Record<SortedBy, Comparator<JobInfo>> = {
    created: (a, b) => a.created - b.created,
    status: (a, b) => -a.status.localeCompare(b.status),
    id: (a, b) => -a.id.localeCompare(b.id),
    name: (a, b) => -a.name.localeCompare(b.name),
    client: (a, b) => -a.client.name.localeCompare(b.client.name),
};

const statusFilterOptions: FilterOption<Status>[] = allValues(Status).map((status) => ({
    value: status,
    render: <StatusTag status={status} />,
}));

const Jobs = ({ allJobs, allClients }: { allJobs: Record<string, JobInfo>; allClients: Record<string, Client> }) => {
    const dispatch = useDispatch();
    const selectedJob = useSelector(getSelectedJob);
    const visibleJobs = useSelector(getVisibleJobs);
    const sorting = useSelector(getSorting);
    const filters = useSelector(getFilters);

    const clientFilterOptions: FilterOption[] = Object.values(allClients).map((client) => ({
        value: client.clientCode,
        render: <Text>{client.name}</Text>,
    }));

    useEffect(() => {
        dispatch(setVisibleJobs(Object.keys(allJobs)));
        dispatch(setClientFilters(Object.keys(allClients)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const applySorting = useCallback(
        (sorting: SortingInfo, visibleJobs: string[]) => {
            const comparator: Comparator<JobInfo> =
                sorting.direction === 'asc' ? comparators[sorting.by] : (a, b) => -comparators[sorting.by](a, b);

            visibleJobs.sort((a, b) => comparator(allJobs[a], allJobs[b]));
            dispatch(setVisibleJobs(visibleJobs));
        },
        [allJobs, dispatch],
    );

    const handleFilters = useCallback(() => {
        let filteredJobs = Object.keys(allJobs);
        if (filters.search !== '') {
            const loweredSearch = filters.search.toLowerCase();
            filteredJobs = filteredJobs.filter((id) => {
                const job = allJobs[id];
                return (
                    job.name.toLowerCase().includes(loweredSearch) ||
                    allJobs[id].id.toLowerCase().includes(loweredSearch)
                );
            });
        }
        if (filters.status.length !== statusFilterOptions.length) {
            filteredJobs = filteredJobs.filter((id) => filters.status.includes(allJobs[id].status));
        }
        applySorting(sorting, filteredJobs);
    }, [filters, sorting, allJobs, applySorting]);

    useEffect(() => {
        handleFilters();
    }, [filters, handleFilters]);

    const handleChangeSort = (sorting: SortingInfo) => {
        applySorting(sorting, [...visibleJobs]);
        dispatch(setSorting(sorting));
    };

    const renderJobRow = (jobId: string) => {
        const job = allJobs[jobId];

        return (
            <Tr key={jobId} onClick={() => dispatch(setSelectedJob(jobId))} sx={{ _hover: { bg: 'gray.100' } }}>
                <Td py={2}>
                    <StatusTag status={job.status} />
                </Td>
                <Td py={2}>{job.id}</Td>
                <Td py={2}>{job.name}</Td>
                <Td py={2}>{job.client.name}</Td>
            </Tr>
        );
    };

    const renderColumnLabel = (column: TableColumn): ReactNode => {
        return (
            <Sortable
                isApplied={column.property === sorting.by}
                handleApply={(direction) => handleChangeSort({ by: column.property, direction })}
            >
                {column.label ?? capitalise(column.property)}
            </Sortable>
        );
    };

    return (
        <Box>
            <Header>
                <SearchBar placeholder="Search by name or id..." />
            </Header>
            <Content>
                <Stack direction="row" gap={2} mt={5}>
                    <TableContainer w="full">
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th py={2} w="170px">
                                        <Filterable
                                            filters={filters.status}
                                            filterOptions={statusFilterOptions}
                                            handleChangeFilters={(newFilters) => dispatch(setStatusFilters(newFilters))}
                                        >
                                            {renderColumnLabel({ property: 'status' })}
                                        </Filterable>
                                    </Th>
                                    <Th py={2}>{renderColumnLabel({ property: 'id', label: 'ID' })}</Th>
                                    <Th py={2}>{renderColumnLabel({ property: 'name' })}</Th>
                                    <Th py={2}>
                                        <Filterable
                                            filters={filters.client}
                                            filterOptions={clientFilterOptions}
                                            handleChangeFilters={(newFilters) => dispatch(setClientFilters(newFilters))}
                                        >
                                            {renderColumnLabel({ property: 'client' })}
                                        </Filterable>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>{visibleJobs.map(renderJobRow)}</Tbody>
                        </Table>
                    </TableContainer>
                    <Box maxW="360px" minW="360px" h="full">
                        {selectedJob ? <Job job={selectedJob} /> : <Heading color="gray.600">No Selected Job</Heading>}
                    </Box>
                </Stack>
            </Content>
        </Box>
    );
};

export default Jobs;
