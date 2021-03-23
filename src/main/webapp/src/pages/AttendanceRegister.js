import React, {useEffect, useState} from "react";

import '../App/App.css';
import PageHeader from "../components/PageHeader";
import TrackChangesTwoToneIcon from "@material-ui/icons/TrackChangesTwoTone";
import {
    Button as MuiButton,
    FormControl, InputLabel,
    makeStyles, MenuItem,
    Paper, Select, Select as MuiSelect
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import AttendanceRecord from "../components/AttendanceRecord"
import * as studentService from "../services/studentService";
import { useForm, FormProvider } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormSelect from "../components/controls/select";
import * as PropTypes from "prop-types";
import FormDatePicker from "../components/controls/datepicker";
import Button from "@material-ui/core/Button";

const validationSchema = yup.object().shape({
    classRoomId: yup.string().required("Classroom is Required"),
    registerDate: yup
        .date()
        .typeError("Register date must be a date object")
        .required("Register date is required"),
});

const initialFValues = {
    classRoomId: 1,
    registerDate: new Date()
}


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    selectWidth:{
        width: '300px'
    }
}))

function AttendanceRegister() {

    useEffect(() => {
        fetchRegister(initialFValues);
    }, []);

    const classes = useStyles();

    const [register, setRegister] = useState('');
    const [records, setRecords] = useState([]);

    const fetchRegister = async (data) => {
        console.log(data)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
            },
            body: JSON.stringify(data)
        };

        const dataRegister = await fetch(
            '/attendance/register',
            requestOptions
        );

        const messageRegister = await dataRegister.json();
        console.log(messageRegister);
        setRegister(messageRegister);
        setRecords(messageRegister.students);
    }



    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues : initialFValues
    });

    const { handleSubmit, errors } = methods;

    const onSubmit = (data) => {
        //e.preventDefault();
        console.log(data);
        fetchRegister(data);

    };

    return (
        <>
            <PageHeader
                title="Register"
                subTitle="Update class student attendance"
                icon={<TrackChangesTwoToneIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
                <div className={classes.selectWidth}>

                    <FormProvider {...methods}>
                        <form>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <FormSelect
                                        name="classRoomId"
                                        label="Classroom"
                                        options={studentService.getClassroomCollection()}
                                        required={true}
                                        errorobj={errors}
                                        className={classes.selectWidth}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormDatePicker
                                        name="registerDate"
                                        label="Register date"
                                        format="DD/MM/yyyy"
                                        required={true}
                                        errorobj={errors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Fetch register
                                </Button>
                            </Grid>
                            </Grid>
                        </form>
                    </FormProvider>
                </div>
            </Paper>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                layout={"row"} spacing={8} className={classes.summary}
            >
                {records.map((row) => (
                    <AttendanceRecord
                        key={row.studentId}
                        fullName={row.fullName}
                        information ={row.information}
                        status={row.status}
                        attendanceRegisterId = {register.attendanceRegisterId}
                        studentId ={row.studentId}
                    />
                ))}


             </Grid>
        </>

    );
}

export default AttendanceRegister;