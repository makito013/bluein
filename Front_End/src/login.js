import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// CSS da tela
const useStyles = makeStyles((theme) => ({
    form: {
        top: '30%',
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();

    return (
        <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            {/*<FormControlLabel*/}
            {/*    control={<Checkbox value="remember" color="primary" />}*/}
            {/*    label="Lembrar senha"*/}
            {/*/>*/}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Entrar
            </Button>
            <Grid container>
                <Grid item xs>
                    {/*Inserir depois*/}
                    {/*<Link href="#" variant="body2">*/}
                    {/*    Esqueceu a senha?*/}
                    {/*</Link>*/}
                </Grid>
                <Grid item>
                    <Link href="/Cadastro" variant="body2">
                        {"Não tem uma conta? Crie agora!"}
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
}