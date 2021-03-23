import React from "react";

import '../App/App.css';
import PageHeader from "../components/PageHeader";
import HouseTwoToneIcon from "@material-ui/icons/HouseTwoTone";
import {makeStyles, Paper} from "@material-ui/core";

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

}))

function HomePage (){

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Home"
                subTitle="Mrs Masuku's fancy student tracker."
                icon={<HouseTwoToneIcon fontSize="large"/>}
            />
            <div className={classes.styles}>
            </div>
        </>

    );
}

export default HomePage;