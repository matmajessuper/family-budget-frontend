import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AuthGuard from './hoc/AuthGuard/AuthGuard';
import Layout from './components/Layout/Layout';

function App() {
    return (
        <div className={styles.container}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route
                        path="/"
                        element={
                            <AuthGuard>
                                <Layout/>
                            </AuthGuard>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
