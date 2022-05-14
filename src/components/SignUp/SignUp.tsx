import React, { useState } from 'react';

import { Box, Button, Typography, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SignUpForm } from '../../constants/interfaces';
import {Auth as AuthService} from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';

const SignUp = () => {
    const {register, handleSubmit} = useForm<SignUpForm>();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<SignUpForm>();

    const onSubmit = (data: SignUpForm) => {
        AuthService.signup(data)
            .then((response) => {
                const accessToken = response.data.auth_token;
                localStorage.setItem('token', accessToken);
                navigate('/');
            })
            .catch((error) => {
                setErrors(error.response.data);
            })
    }

    return (
        <Box className={styles.box} onClick={() => setErrors(undefined)}>
            <Typography variant='h1' className={styles.title}>Family Budget</Typography>
            <Typography variant='h3' className={styles.signupText}>Sign Up</Typography>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    id='username'
                    label='username'
                    variant='outlined'
                    error={errors?.username ? true : false}
                    helperText={errors?.username ? errors.username : undefined}
                    {...register('username')}
                />
                <TextField
                    fullWidth
                    id='email'
                    label='email'
                    variant='outlined'
                    error={errors?.email ? true : false}
                    helperText={errors?.email ? errors.email : undefined}
                    {...register('email')}
                />
                <TextField
                    fullWidth
                    id='password1'
                    label='password'
                    type='password'
                    variant='outlined'
                    error={errors?.password1 ? true : false}
                    helperText={errors?.password1 ? errors.password1 : undefined}
                    {...register('password1')}
                />
                <TextField
                    fullWidth
                    id='password2'
                    label='retype password'
                    type='password'
                    variant='outlined'
                    error={errors?.password2 ? true : false}
                    helperText={errors?.password2 ? errors.password2 : undefined}
                    {...register('password2')}
                />
                <Button variant='contained' type='submit'>Sign Up</Button>
            </form>
            <a href={'/login'}>go to log in page</a>
        </Box>
    )
}

export default SignUp;