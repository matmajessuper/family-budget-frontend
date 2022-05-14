import jwt_decode from 'jwt-decode';

type Token = {
    username: string;
    exp: number;
};

export const isAuthenticated = (exp: number): boolean => {
    const now = new Date().getTime() / 1000;
    return !!(exp && now < exp);
};

export const decodeToken = (token: string): Token => {
    const decoded = jwt_decode(token) as any;
    return {
        username: decoded.username,
        exp: decoded.exp,
    };
};

export const isTokenValid = (token: string): boolean => {
    const decodedToken = decodeToken(token);
    const exp = decodedToken.exp;
    return isAuthenticated(exp);
};

export const tokenGetter = (): string | null => localStorage.getItem('token') || null;