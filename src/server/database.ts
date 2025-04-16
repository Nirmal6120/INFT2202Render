// Author: Nirmal Patel, Jalpan Patel

import {MongoClient, Db} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const USER_NAME = process.env.NirmalPatel!;

const PASSWORD = process.env.nirmal1234!;

const DB_NAME = process.env.inft2202!;

const CLUSTER = process.env.MONGO_CLUSER!;



const MONGO_URI = `mongodb+srv://NirmalPatel:<db_password>@cluster0.qsyz1tt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

class Database {
    private static instance: Database;
    private client: MongoClient;
    private db:Db | null = null;

    private constructor() {
        this.client = new MongoClient(MONGO_URI);
    }

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect() :Promise<Db> {
        if(!this.db){
            try{
                await this.client.connect();
                console.log(`[INFO] Connected to MongoDB Atlas Database: ${DB_NAME}`);
                this.db = this.client.db(DB_NAME);
            }catch (error){
                console.error("[ERROR] Could not connect to Database!");
                throw error;
            }
        }
        return this.db;
    }

    public async disconnect():Promise<void> {
        await this.client.close();
        console.log("[INFO] Disconnected to Database");
        this.db = null;

    }
}

export default Database;