import React, {useEffect, useState} from "react";

import '../App/App.css';
import {
    Hidden,
    makeStyles
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import * as studentService from "../services/studentService";
import { useForm, FormProvider } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormSelect from "../components/controls/select";
import Button from "@material-ui/core/Button";
import FormInput from "../components/controls/input";
import FormRadio from "../components/controls/radio";

const validationSchema = yup.object().shape({
    fullName: yup.string().required("Full name is Required"),
    grade: yup.number().required("Grade is Required"),
    classRoomId: yup.string().required("Classroom is Required"),
    status: yup.string().required("Status is Required")
});




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

function Student({addOrEdit, recordForEdit} ) {

    const classes = useStyles();



    const initialFValues = {
        id: recordForEdit? recordForEdit.id: 0,
        fullName: recordForEdit? recordForEdit.fullName: '',
        status: recordForEdit? recordForEdit.status: 'active',
        nickname: recordForEdit? recordForEdit.nickname: '',
        grade: recordForEdit? recordForEdit.grade: '',
        classRoomId: recordForEdit? recordForEdit.classRoomId: '',
        religionId: recordForEdit? recordForEdit.religionId: ''
    }

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues : initialFValues
    });

    const { handleSubmit, errors,resetForm } = methods;

    const onSubmit = (data) => {
        //e.preventDefault();
        console.log(data);
        addOrEdit(data)
    };



    return (
        <>

                <div className={classes.selectWidth}>

                    <FormProvider {...methods}>
                        <form>
                            <Hidden>
                            <FormInput
                                name="id"
                                type="hidden"
                            />
                            </Hidden>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <FormInput
                                        name="fullName"
                                        label="Full name"
                                        required={true}
                                        errorobj={errors}
                                        className={classes.selectWidth}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput
                                        name="nickname"
                                        label="Nickname"
                                        required={false}
                                        errorobj={errors}
                                        className={classes.selectWidth}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormRadio
                                        name="grade"
                                        label="Grade"
                                        required={true}
                                        errorobj={errors}
                                        options={studentService.getGradeItems()}
                                    />
                                </Grid>
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
                                    <FormSelect
                                        name="religionId"
                                        label="Religion"
                                        options={studentService.getReligionCollection()}
                                        required={false}
                                        errorobj={errors}
                                        className={classes.selectWidth}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormRadio
                                        name="status"
                                        label="Status"
                                        required={true}
                                        errorobj={errors}
                                        options={studentService.getStatusItems()}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Save Student
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </FormProvider>
                </div>

        </>

    );
}

export default Student;