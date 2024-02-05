import axiosInstance from '../axios-client';
import { TUser } from 'common/interface';

const UserService = {
  nameApi: 'User',
  login: async ({ username, password }: TUser) => {
    try {
      const { data } = await axiosInstance.post('/login', {
        username,
        password,
      });
      return data;
    } catch (error) {
      return error;
    }
  },
  logout: async () => {
    try {
      const { data } = await axiosInstance.post('/logout');
      return data;
    } catch (error) {
      return error;
    }
  },
};

export default UserService;
