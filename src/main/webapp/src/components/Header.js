import * as React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Container
} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        color: `white`
    }
});

const navLinks = [
    {id: 1, title: `Register`, path: `/register`},
    {id: 2, title: `Students`, path: `/students`},
    {id: 3, title: `Lookups`, path: `/lookups`},
    {id: 4, title: `Reports`, path: `/reports`},
    {id: 5, title: `Logout`, path: `/logout`}
];

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                    <Link to="/" className={classes.linkText}>
                        <IconButton edge="start" color="inherit" aria-label="home">
                            <Home fontSize="large"/>
                        </IconButton>
                    </Link>
                    <List
                        component="nav"
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex}
                    >
                        {navLinks.map(({id ,title, path}) => (
                            <Link key={id} to={path} className={classes.linkText}>
                                <ListItem button key={title}>
                                    <ListItemText primary={title}/>
                                </ListItem>
                            </Link>

                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
