// Author: Nirmal Patel, Jalpan Patel
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const USER_NAME = process.env.NirmalPatel;
const PASSWORD = process.env.nirmal1234;
const DB_NAME = process.env.inft2202;
const CLUSTER = process.env.MONGO_CLUSER;
const MONGO_URI = `mongodb+srv://NirmalPatel:<db_password>@cluster0.qsyz1tt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
class Database {
    constructor() {
        this.db = null;
        this.client = new MongoClient(MONGO_URI);
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect() {
        if (!this.db) {
            try {
                await this.client.connect();
                console.log(`[INFO] Connected to MongoDB Atlas Database: ${DB_NAME}`);
                this.db = this.client.db(DB_NAME);
            }
            catch (error) {
                console.error("[ERROR] Could not connect to Database!");
                throw error;
            }
        }
        return this.db;
    }
    async disconnect() {
        await this.client.close();
        console.log("[INFO] Disconnected to Database");
        this.db = null;
    }
}
export default Database;
//# sourceMappingURL=database.js.map