import { AccessTokenDAO, CreateUserDTO, UserDAO, LoginDTO, GapiCodeDTO } from '@calendar-asst/types';
import { post } from './apiUtils';

const AuthAPI = {
  signUp: function (createUserDto: CreateUserDTO): Promise<UserDAO> {
    return post<CreateUserDTO, UserDAO>('/api/users/signup', createUserDto);
  },

  login: function(email: string, password: string): Promise<AccessTokenDAO> {
    return post<LoginDTO, AccessTokenDAO>('/api/users/login', { email, password });
  },

  setGapiToken: function (token: string): Promise<UserDAO> {
    return post<GapiCodeDTO, UserDAO>('/api/users/gapi-token', { code: token });
  }
}
export default AuthAPI;
