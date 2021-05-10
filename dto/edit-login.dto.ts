import { Login } from '../entity/login.entity';

export class EditLoginDto{
    username: string;
    password: string;
    newDetails: Login;
}