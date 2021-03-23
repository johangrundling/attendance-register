import React, {useEffect, useState} from 'react'
import { Paper, Card, Typography, makeStyles, Button } from '@material-ui/core'
import Grid from "@material-ui/core/Grid";
import HouseTwoToneIcon from "@material-ui/icons/HouseTwoTone";
import UnknownImg from "../images/unkown.png"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    },
    styles: {
        fontFamily: "sans-serif",
        textAlign: "center"
    },
    section:{
        height: "100%",
        paddingTop: 5,
        backgroundColor: "#fff",
        maxWidth:250
    },
    summary:{
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#d4d4d4"
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#3c44b1'
    },

    absent:{
        backgroundColor: "#c14b4b"
    },

    present:{
        backgroundColor: "#91de68"
    },

    excused:{
        backgroundColor: "#64c2e0"
    },

    unknown:{

    }

}))

export default function AttendanceRecord(props) {

    const classes = useStyles();
    const { fullName, information, attendanceRegisterId, studentId } = props;
    const [status, setStatus] = useState(props.status)
    const [statusClass, setStatusClass] = useState(classes.unknown)

    useEffect( () => {
        switch (status){
            case 'present': setStatusClass(classes.present); break;
            case 'absent': setStatusClass(classes.absent); break;
            case 'excused': setStatusClass(classes.excused); break;
            default:
            case 'unknown': setStatusClass(classes.unknown); break;
        }
         }
    );


    const processStatusChangeUnknown = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
            },
            body: JSON.stringify({
                attendanceRegisterId: attendanceRegisterId,
                information: "testing 1 2 3 ",
                status: 'unknown',
                studentId: studentId
            })
        };

        const dataRegister = await fetch(
            '/attendance/record',
            requestOptions
        );

        setStatus('unknown')

    }


    const processStatusChangePresent = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
            },
            body: JSON.stringify({
                attendanceRegisterId: attendanceRegisterId,
                information: "testing 1 2 3 ",
                status: 'present',
                studentId: studentId
            })
        };

        const dataRegister = await fetch(
            '/attendance/record',
            requestOptions
        );

        setStatus('present')

    }

    const processStatusChangeAbsent = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
            },
            body: JSON.stringify({
                attendanceRegisterId: attendanceRegisterId,
                information: "testing 1 2 3 ",
                status: 'absent',
                studentId: studentId
            })
        };

        const dataRegister = await fetch(
            '/attendance/record',
            requestOptions
        );

        setStatus('absent')

    }

    const processStatusChangeExcused = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
            },
            body: JSON.stringify({
                attendanceRegisterId: attendanceRegisterId,
                information: "testing 1 2 3 ",
                status: 'excused',
                studentId: studentId
            })
        };

        const dataRegister = await fetch(
            '/attendance/record',
            requestOptions
        );

        setStatus('excused')

    }


    return (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <Card className={statusClass}>
            <div className={classes.pageHeader}>
               <Grid>
                   <Grid item xs={12}  >

                <Card className={classes.pageIcon}>
                    <img src={UnknownImg} alt='No profile picture' />
            </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        {fullName}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {information}</Typography>
                </div>

                   </Grid>
                   <Grid item xs={12}  >
                       <Button onClick={processStatusChangePresent}>Present</Button>
                       <Button onClick={processStatusChangeAbsent}>Absent</Button>
                       <Button onClick={processStatusChangeExcused}>Excused</Button>
                       <Button onClick={processStatusChangeUnknown}>Unknown</Button>
                   </Grid>
               </Grid>
            </div>
            </Card>
        </Grid>
    )
}
