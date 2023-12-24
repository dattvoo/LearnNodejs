import dotenv from 'dotenv';
import { TokenType } from '~/constants/enum';
import { RegisterReqBody } from '~/models/requests/User.requests';
import User from '~/models/schemas/User.schema';
import hashPassword from '~/utils/crypto';
import { signToken } from '~/utils/jwt';
import databaseService from './database.services';
import RefreshToken from '~/models/schemas/RefreshToken.schema';
import { ObjectId } from 'mongodb';

dotenv.config();
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
  private async signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)]);
  }

  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({ ...payload, password: hashPassword(payload.password) })
    );
    const user_id = result.insertedId.toString();

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id);

    await databaseService.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
    );
    return {
      access_token,
      refresh_token
    };
  }

  async checkEmailExist(email: string) {
    const result = await databaseService.users.findOne({ email });
    return Boolean(result);
  }

  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id);
    return {
      access_token,
      refresh_token
    };
  }
}
const usersService = new UsersService();

export default usersService;
