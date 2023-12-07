import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { IUser } from '~/models/schemas/User.schema'

dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learnnodejs.kpv3t8u.mongodb.net/`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      await this.client.close()
    }
  }

  get users(): Collection<IUser> {
    return this.db.collection('users')
  }
}

// Create obj from class DatabaseServices
const databaseService = new DatabaseService()
export default databaseService
