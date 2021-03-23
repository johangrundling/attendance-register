import React, {useState} from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    makeStyles,
    TablePagination,
    TableSortLabel,
    TableContainer, Paper, TableBody, Button
} from '@material-ui/core'
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

const headCells = [
    {id: 'fullName', label: 'Full Name'},
    {id: 'nickname', label: 'Nickname'},
    {id: 'grade', label: 'Grade'},
    {id: 'classroom', label: 'Classroom'},
    {id: 'religion', label: 'Religion'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const columns = [
    {field: 'fullName', headerName: 'ID', width: 70},
    {field: 'nickname', headerName: 'First name', width: 130},
    {field: 'grade', headerName: 'Last name', width: 130},
    {
        field: 'classroom',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];


export default function Datatable({items , launchPopup, launchDelete, deleteItem}) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>
        <div style={{height: 400}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table"
                       cellSpacing={0}
                       cellPadding={0}
                       size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fullname</TableCell>
                            <TableCell align="right">Classroom</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.fullName}
                                    </TableCell>
                                    <TableCell align="right">{row.classRoomName}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            className={`secondary`}
                                            onClick={() => { launchPopup(row) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Button>
                                        <Button
                                            className={`secondary`}
                                            onClick={() => {
                                                launchDelete({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this student?',
                                                    subTitle: "Students with attendance records will be marked as inactive.",
                                                    onConfirm: () => { deleteItem(row.id) }
                                                })
                                            }}
                                            >
                                            <CloseIcon fontSize="small" />
                                        </Button>


                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>


        </>
    );
}