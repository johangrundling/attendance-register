import React, {useState, useEffect} from 'react'
import {
    Button as MuiButton,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, InputLabel, makeStyles, MenuItem,
    Radio,
    RadioGroup as MuiRadioGroup, Select as MuiSelect,
    TextField,
} from '@material-ui/core';
import {useForm, Form} from '../components/useForm';
import * as studentService from "../services/studentService";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

const initialFValues = {
    id: 0,
    fullName: '',
    nickname: '',
    grade: '',
    status: 'active',
    religionId: '',
    classRoomId: ''
}

export default function StudentForm(props) {
    const {addOrEdit, recordForEdit} = props;

    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "Fullname is required."
        if ('grade' in fieldValues)
            temp.grade = fieldValues.grade ? "" : "grade is required."
        if ('classRoomId' in fieldValues)
            temp.classRoomId = fieldValues.classRoomId.length != 0 ? "" : "Classroom is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>

                    <TextField
                        variant="outlined"
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                    />
                    <TextField
                        variant="outlined"
                        label="Nickname"
                        name="nickname"
                        value={values.nickname}
                    />

                    <FormControl>
                        <FormLabel>Grade</FormLabel>
                        <MuiRadioGroup row
                                       name="grade"
                                       value={values.grade}
                        >
                            {
                                studentService.getGradeItems().map(
                                    item => (
                                        <FormControlLabel key={item.id} value={item.id} control={<Radio/>}
                                                          label={item.title}/>
                                    )
                                )
                            }
                        </MuiRadioGroup>
                    </FormControl>


                    <FormControl>
                        <FormLabel>Status</FormLabel>
                        <MuiRadioGroup row
                                       name="status"
                                       value={values.status}
                        >
                            {
                                studentService.getStatusItems().map(
                                    item => (
                                        <FormControlLabel key={item.id} value={item.id} control={<Radio/>}
                                                          label={item.title}/>
                                    )
                                )
                            }
                        </MuiRadioGroup>
                    </FormControl>



                    <FormControl variant="outlined">
                        <InputLabel>Classroom</InputLabel>
                        <MuiSelect
                            label="Classroom"
                            name="classRoomId"
                            value={values.classRoomId}>
                            <MenuItem value="">None</MenuItem>
                            {
                                studentService.getClassroomCollection().map(
                                    item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                                )
                            }
                        </MuiSelect>
                    </FormControl>

                    <FormControl variant="outlined">
                        <InputLabel>Religion</InputLabel>
                        <MuiSelect
                            label="Religion"
                            name="religionId"
                            value={values.religionId}>
                            <MenuItem value="">None</MenuItem>
                            {
                                studentService.getReligionCollection().map(
                                    item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                                )
                            }
                        </MuiSelect>
                    </FormControl>

                    <div>

                        <MuiButton
                            variant="contained"
                            size="large"
                            color="primary"
                            classes={{ root: classes.root, label: classes.label }}>
                            Submit
                        </MuiButton>
                        <MuiButton
                            variant="contained"
                            size="large"
                            color="default"
                            onClick={resetForm}
                            classes={{ root: classes.root, label: classes.label }}>
                            Reset
                        </MuiButton>

                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
