import React, { useState } from 'react';

import { Box, Button, Typography, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../../constants/interfaces';
import {Auth as AuthService} from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

const Login = () => {
    const {register, handleSubmit} = useForm<LoginForm>();
    const navigate = useNavigate();
    const [error, setError] = useState<boolean>(false);

    const onSubmit = (data: LoginForm) => {
        AuthService.login(data)
            .then((response) => {
                const accessToken = response.data.auth_token;
                localStorage.setItem('token', accessToken);
                navigate('/');
            })
            .catch(() => {
                setError(true);
            })
    }

    return (
        <Box className={styles.box} onClick={() => setError(false)}>
            <Typography variant='h1' className={styles.title}>Family Budget</Typography>
            <Typography variant='h3' className={styles.loginText}>Log In</Typography>
            {error ?
                <Typography className={styles.errorText}>Wrong credentials</Typography> :
                <div className={styles.placeholder}/>
            }
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    id='username'
                    label='username'
                    variant='outlined'
                    {...register('username')}
                />
                <TextField
                    fullWidth
                    id='password'
                    label='password'
                    type='password'
                    variant='outlined'
                    {...register('password')}
                />
                <Button variant='contained' type='submit'>Log in</Button>
            </form>
            <a href={'/signup'}>go to sign up page</a>
        </Box>
    )
}

export default Login;