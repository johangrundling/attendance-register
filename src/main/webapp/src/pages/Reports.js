import React from "react";

import '../App/App.css';
import PageHeader from "../components/PageHeader";
import PagesTwoToneIcon from "@material-ui/icons/PagesTwoTone";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
    }
}))

function Reports (){

    const classes = useStyles();

    function handleClickDaily(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    function handleClickTerm(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }


    return (
        <>
            <PageHeader
                title="Reports"
                subTitle="Student attendance reports."
                icon={<PagesTwoToneIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>

                <Typography variant="h6" className={classes.title}>
                    Daily attendance report
                </Typography>
                <Button variant="contained" color="primary" onClick={handleClickDaily}>
                    Generate
                </Button>

            </Paper>

            <Paper className={classes.pageContent}>

                <Typography variant="h6" className={classes.title}>
                    Term attendance report
                </Typography>
                <Button variant="contained" color="primary" onClick={handleClickTerm}>
                    Generate
                </Button>

            </Paper>
        </>

    );
}

export default Reports;