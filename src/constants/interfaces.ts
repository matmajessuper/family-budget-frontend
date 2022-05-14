import { AxiosResponse } from "axios";

export type LoginForm = {
    username: string,
    password: string
};

export type SignUpForm = {
    username: string,
    email: string,
    password1: string,
    password2: string
}

export type ApiEndpoints = {
    [key: string] : (...args: any[]) => Promise<AxiosResponse>;
};