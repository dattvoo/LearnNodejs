
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learnnodejs.kpv3t8u.mongodb.net/`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class DatabaseService {
    client;
    db;
    constructor() {
        this.client = new mongodb_1.MongoClient(uri);
        this.db = this.client.db(process.env.DB_NAME);
    }
    async connect() {
        try {
            await this.db.command({ ping: 1 });
            console.log('Pinged your deployment. You successfully connected to MongoDB!');
        }
        catch (error) {
            console.log('Erorr when conect: ', error);
        }
    }
    get users() {
        return this.db.collection('users');
    }
}
// Create obj from class DatabaseServices
const databaseService = new DatabaseService();
exports.default = databaseService;
