import React, {useState, useEffect} from "react";
import Datatable from '../components/Datatable'
import AddIcon from "@material-ui/icons/Add";
import Button from '@material-ui/core/Button';
import {InputAdornment, makeStyles, Paper, TextField, Toolbar} from "@material-ui/core";
import Popup from "../components/Popup";
import Student from "./Student";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import SearchIcon from '@material-ui/icons/Search';
import PageHeader from "../components/PageHeader";

require("es6-promise").polyfill();
require("isomorphic-fetch");


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Students() {
    const [students, setStudents] = useState([]);
    const [queryFilter, setQueryFilter] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [recordForEdit, setRecordForEdit] = useState(null)

    const classes = useStyles();

    useEffect(() => {

        let cc = JSON.stringify({
            classRoomId: 1
        })

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
            },
            body: cc
        };

        fetch(
            '/students',
            requestOptions
        ).then(response => response.json())
            .then((data) => {
                setStudents(data.students);
            });

    }, []);


    const openInPopup = item => {
        console.log(item);
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const addOrEdit = (student, resetForm) => {
        if (student.id > 0){
            updateStudent(student);
        }else{
            insertStudent(student);
        }

        setRecordForEdit(null)
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }


    function insertStudent(data) {

        let cc  = JSON.stringify({
            fullName: data.fullName,
            nickname: data.nickname,
            classRoomId: data.classRoomId,
            religionId: data.religionId,
            status: data.status,
            grade: data.grade
        })

        console.log(cc)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
            },
            body: cc
        };

        data = fetch(
            '/student',
            requestOptions
        ).then(response => { //console.log(response.json());
            return response.json();
        })
            .then(data => {
                console.log('Success:', data.student);
                return data.student;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    function updateStudent(data) {

        let cc  = JSON.stringify({
            id: data.id,
            fullName: data.fullName,
            nickname: data.nickname,
            classRoomId: data.classRoomId,
            religionId: data.religionId,
            status: data.status,
            grade: data.grade
        })

        console.log(cc)

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
            },
            body: cc
        };

        const url = '/student/'+ data.id;

        data = fetch(
            url,
            requestOptions
        ).then(response => { //console.log(response.json());
            return response.json();
        })
            .then(data => {
                console.log('Success:', data.student);
                return data.student;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    function search(rows) {
        return rows.filter((row) => row.fullName.toLowerCase().indexOf(queryFilter.toLowerCase()) > -1);
    }

    return (
        <>
            <PageHeader
                title="Students"
                subTitle="Maintain students for Mrs Masuku's classes."
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
        <div>
            <div>
                <Paper>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        value={queryFilter}
                        label="Filter Students"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setQueryFilter(e.target.value)}/>
                    <Button variant="contained" className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}>
                        <AddIcon/> Add Student
                    </Button>
                </Toolbar>
                </Paper>
            </div>
            <div>
                <Datatable items={search(students)} launchPopup={openInPopup} launchDelete={setConfirmDialog} deleteItem={onDelete}/>
            </div>
        </div>


            <Popup
                title="Student Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Student
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>

    )

}


