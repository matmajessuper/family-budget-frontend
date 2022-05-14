import {post} from '../Api';
import { ApiEndpoints, LoginForm, SignUpForm } from '../constants/interfaces';

export const Auth: ApiEndpoints = {
    login: (data: LoginForm) => post('api/v1/login/', data),
    signup: (data: SignUpForm) => post('api/v1/registration/', data)
}