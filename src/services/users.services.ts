import User from '~/models/schemas/User.schema';
import databaseService from './database.services';
import { RegisterReqBody } from '~/models/requests/User.requests';
import hashPassword from '~/utils/crypto';
import { signToken } from '~/utils/jwt';
import { TokenType } from '~/constants/enum';

class UsersService {
  private async signAccessToken(user_id: string) {
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    });
  }
  private async signRefreshToken(user_id: string) {
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    });
  }
  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({ ...payload, password: hashPassword(payload.password) })
    );
    const user_id = result.insertedId.toString();

    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ]);

    return {
      access_token,
      refresh_token
    };
  }

  async checkEmailExist(email: string) {
    const result = await databaseService.users.findOne({ email });
    return Boolean(result);
  }
  async checkLogin(email: string, password: string) {
    const isExistEmail = this.checkEmailExist(email);
    console.log(isExistEmail);
  }
}
const usersService = new UsersService();

export default usersService;
