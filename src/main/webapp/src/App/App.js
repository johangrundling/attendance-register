import React , {useState} from 'react';
import './App.css';
import Header from "../components/Header";
import {
    makeStyles,
    CssBaseline,
    createMuiTheme,
    ThemeProvider,
    Toolbar,
    AppBar,
    IconButton,
    Typography, MenuItem
} from '@material-ui/core';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from '../components/Login';
import Students from "../pages/Students";
import AttendanceRegister from "../pages/AttendanceRegister";
import Lookups from "../pages/Lookups";
import Reports from "../pages/Reports";
import HomePage from "../pages/HomePage";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#333996",
            light: '#3c44b126'
        },
        secondary: {
            main: "#f83245",
            light: '#f8324526'
        },
        background: {
            default: "#f4f5fd"
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
})


const useStyles = makeStyles({
    appMain: {
        width: '100%'
    }
})


function App() {
    const [token, setToken] = useState();
    const classes = useStyles();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Header/>
                <div className={classes.appMain}>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/register" component={AttendanceRegister}/>
                        <Route path="/students" component={Students}/>
                        <Route path="/lookups" component={Lookups}/>
                        <Route path="/reports" component={Reports}/>
                    </Switch>
                </div>
                <CssBaseline/>
            </ThemeProvider>
        </Router>
    );
}

export default App;
