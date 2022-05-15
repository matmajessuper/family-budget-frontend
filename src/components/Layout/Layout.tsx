import { AppBar, Box, Button, Container, Menu, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BudgetLogo from '../../savings.png';
import {Auth as AuthService} from '../../services/auth';
import styles from './Layout.module.scss';

const Layout = () => {
    const navigate = useNavigate();
    const pages = ['Owned', 'Shared'];
    const [selected, setSelected] = useState<string>('');

    const logout = () => {
        AuthService.logout()
            .then(() => {
                localStorage.clear();
                navigate('/login');
            })
    }

    const mainPages = () => {
        return (
            pages.map((page) => (
                <Button
                    key={page}
                    onClick={() => setSelected(page)}
                    className={styles.Button}
                    aria-selected={selected===page}
                >
                    {page}
                </Button>
            ))
        )
    }

    return (
        <Box>
            <AppBar position="static">
                <Container>
                    <Toolbar className={styles.Bar}>
                        <Box className={styles.menu}>
                            <Box
                                component="img"
                                sx={{
                                    flexGrow: 0,
                                    maxHeight: 36,
                                    marginRight: 5
                                }}
                                src={BudgetLogo}
                            />
                            <Box>
                                {
                                    mainPages()
                                }
                            </Box>
                        </Box>
                        <Box>
                            <Button className={styles.Button} onClick={() => logout()}>
                                LOG OUT
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Layout;