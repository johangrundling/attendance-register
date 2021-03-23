import React, {useEffect, useState} from "react";

import '../App/App.css';
import PageHeader from "../components/PageHeader";
import LooksTwoTwoToneIcon from "@material-ui/icons/LooksTwoTwoTone";
import {List, ListItem, ListItemText, makeStyles, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


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
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}))


function Lookups() {


    useEffect(() => {
        fetchHolidays();
        fetchReligions();
        fetchClassRooms();
        fetchTerms();

    }, []);

    const [holidays, setHolidays] = useState([]);
    const [religions, setReligions] = useState([]);
    const [terms, setTerms] = useState([]);
    const [classRooms, setClassRooms] = useState([]);


    // const [students, setStudents] = useState([]);
    //
    // const fetchStudents = async () => {
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    //             'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
    //         },
    //         body: JSON.stringify({
    //             classRoomId: 1,
    //             registerDate: "2021-08-17"
    //         })
    //     };
    //
    //     const dataStudents = await fetch(
    //         '/students', requestOptions
    //     );
    //
    //     const messageStudents = await dataStudents.json();
    //     console.log(messageStudents.students);
    //     const students = messageStudents.students;
    //     setStudents(students);
    //
    // }


    const fetchHolidays = async () => {

        const dataHolidays = await fetch(
            '/lookup/holidays'
        );

        const messageHolidays = await dataHolidays.json();
        console.log(messageHolidays.holidays);
        const holidays = messageHolidays.holidays;
        setHolidays(holidays);

    }


    const fetchReligions = async () => {

        const dataReligions = await fetch(
            '/lookup/religions'
        );

        const messageReligions = await dataReligions.json();
        console.log(messageReligions.religions);
        const religions = messageReligions.religions;
        setReligions(religions);
    }

    const fetchTerms = async () => {

        const dataTerms = await fetch(
            '/lookup/terms'
        );

        const messageTerms = await dataTerms.json();
        console.log(messageTerms.terms);
        const terms = messageTerms.terms;
        setTerms(terms);
    }

    const fetchClassRooms = async () => {

        const dataClassRooms = await fetch(
            '/lookup/classRooms'
        );

        const messageClassRooms = await dataClassRooms.json();
        console.log(messageClassRooms.classRooms);
        const classRooms = messageClassRooms.classRooms;
        setClassRooms(classRooms);
    }

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Lookups"
                subTitle="Configuration of lookup values. Eg Classroom, Religion"
                icon={<LooksTwoTwoToneIcon fontSize="large"/>}
            />


                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className={classes.title}>
                            Holidays
                        </Typography>
                        <div className={classes.demo}>
                            <List>

                                {
                                    holidays.map(item => (
                                        <ListItem>
                                            <ListItemText
                                                primary={item.holidayName}
                                                secondary={item.info}
                                        />
                                    </ListItem>
                                        )
                                    )
                                }
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className={classes.title}>
                            Class Rooms
                        </Typography>
                        <div className={classes.demo}>
                            <List>

                                {
                                    classRooms.map(item => (
                                            <ListItem>
                                                <ListItemText
                                                    primary={item.name}
                                                    secondary={item.info}
                                                />
                                            </ListItem>
                                        )
                                    )
                                }
                            </List>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className={classes.title}>
                            Religions
                        </Typography>
                        <div className={classes.demo}>
                            <List>

                                {
                                    religions.map(item => (
                                            <ListItem>
                                                <ListItemText
                                                    primary={item.religionName}
                                                />
                                            </ListItem>
                                        )
                                    )
                                }
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className={classes.title}>
                            Terms
                        </Typography>
                        <div className={classes.demo}>
                            <List>

                                {
                                    terms.map(item => (
                                            <ListItem>
                                                <ListItemText
                                                    primary={item.description}
                                                    secondary={item.info}
                                                />
                                            </ListItem>
                                        )
                                    )
                                }
                            </List>
                        </div>
                    </Grid>
                </Grid>




        </>

    );
}

export default Lookups;