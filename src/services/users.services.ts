import User from '~/models/schemas/User.schema';
import databaseService from './database.services';
import { RegisterReqBody } from '~/models/requests/User.requests';

class UsersService {
  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({ ...payload }),
    );
    return result;
  }

  async checkEmailExist(email: string) {
    const result = await databaseService.users.findOne({ email });
    return Boolean(result);
  }
}
const usersService = new UsersService();

export default usersService;
