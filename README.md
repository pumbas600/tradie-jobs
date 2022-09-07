# Tradie Jobs 

The frontend for a job management web application that enables tradies to view jobs, add/edit notes and filter/sort the jobs. This was designed as part of the Fergus frontend technical assessment.

In this project, the filtering/sorting displayed in the `JobTable` is a fully functional custom built data-table using Chakra UI for the visuals and Redux for the state management.

The UI is populated using 10 randomly generated jobs. These jobs will be regenerated if you refresh the page.

## Tech stack

<div align="center">
<img src="https://img.shields.io/badge/react-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/chakra%20ui-%23319795.svg?&style=for-the-badge&logo=chakra%20ui&logoColor=white" />
<img src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/redux-%23764ABC.svg?&style=for-the-badge&logo=redux&logoColor=white" />
</div>

## Installation

It is recommended that you run this website using yarn. You can install it using: `npm i -g yarn`.

After cloning the repository, you can start it with:
```sh
yarn install
yarn start
```

## Examples

**Main UI**

![No Selected Job](./screenshots/NoSelectedJob.png)
![No Selected Job](./screenshots/SelectedJob.png)

**Sorting / Filtering**

Sortedby status and filtered by client
![Sorted by status and filtered by client](./screenshots/SortedByStatusAndFilteredByClient.png)

Sorted by status and filtered by search
![Sorted by status and filtered by search](./screenshots/SortedByStatusAndSortedBySearch.png)

Status column filter popup
![Status filter popover](./screenshots/StatusFilterPopover.png)

**Adding/Editing Notes**

Adding a new note
![Adding a new note](./screenshots/NewNote.png)

Editing a note
![Editing a note](./screenshots/EditNote.png)