import { CreateUserDTO, UserDAO } from '@calendar-asst/types';
import { post } from './apiUtils';
import { LoginDTO } from '../../../../lib/types/src/lib/login.dto';

const AuthAPI = {
  signUp: function (createUserDto: CreateUserDTO): Promise<UserDAO> {
    return post<CreateUserDTO, UserDAO>('/api/users/signup', createUserDto);
  },

  login: async function(email: string, password: string) {
    return post<LoginDTO, UserDAO>('/api/users/login', { email, password });
  }
}

export default AuthAPI;
