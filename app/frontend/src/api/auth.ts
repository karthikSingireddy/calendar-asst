import { AccessTokenDAO, CreateUserDTO, UserDAO, LoginDTO } from '@calendar-asst/types';
import { post } from './apiUtils';

const AuthAPI = {
  signUp: function (createUserDto: CreateUserDTO): Promise<UserDAO> {
    return post<CreateUserDTO, UserDAO>('/api/users/signup', createUserDto);
  },

  login: function(email: string, password: string): Promise<AccessTokenDAO> {
    return post<LoginDTO, AccessTokenDAO>('/api/users/login', { email, password });
  }
}

export default AuthAPI;
