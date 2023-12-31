import { Collection, Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { IUser } from '~/models/schemas/User.schema';
import RefreshToken from '~/models/schemas/RefreshToken.schema';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learnnodejs.kpv3t8u.mongodb.net/`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient;
  private db: Db;
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
      console.log('Erorr when conect: ', error);
    }
  }

  get users(): Collection<IUser> {
    return this.db.collection('users');
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS as string);
  }
}

// Create obj from class DatabaseServices
const databaseService = new DatabaseService();
export default databaseService;
