import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
import logo from '../assets/img/logo.png'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright Bruno Andrade - 2021'}
        </Typography>
    );
}


// CSS da tela
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
    },
    logo: {
        top: 0
    },
    title: {
        marginTop: '5vh',
        textAlign: 'left',
        fontWeight: '500',
        color: '#001f63'
    }
}));

export default function LoginTemplate(props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.logo} src={logo} />
                {/*<Typography className={classes.title} component="h1" variant="h5">*/}
                {/*    Entrar*/}
                {/*</Typography>*/}
                {props.page}
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}