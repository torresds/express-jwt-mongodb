import { Collection, MongoClient } from "mongodb";
import { InsertUserResult, UpdateResult, User, UserRepo } from "./interfaces/UserRepo";
import { v4 as uuidv4 } from "uuid";
import { genSalt, hash } from "bcrypt"

const rounds = parseInt(process.env.ROUNDS!) || 10;

export class MongoDBUserRepo implements UserRepo {
    private collection: Collection<User>

    constructor(database: string, collectionName: string, client: MongoClient) {
        this.collection = client.db(database).collection(collectionName);
    }
    
    async getByUsername(username: string): Promise<User | null> {
        if (!username || username.length < 3) {
            return null; 
        }
        const User = await this.collection.findOne({ username });
        return User; 
    }
    
    async getById(id: string): Promise<User | null> {
        if (!id) {
            return null;
        }
        const User = await this.collection.findOne({ _id: id });
        return User;
    }

    async create(user: User): Promise<InsertUserResult> {
        if (!user.password || user.password.length < 8) {
            return InsertUserResult.INVALID_PASSWORD
        }
        if (!user.username || user.username.length < 3) {
            return InsertUserResult.INVALID_USERNAME
        }
        const userExists = await this.collection.findOne({ username: user.username });
        if (userExists) {
            return InsertUserResult.USERNAME_EXISTS
        }
        user._id = uuidv4();
        const salt = await genSalt(rounds);
        user.password = await hash(user.password, salt);
        try {
            await this.collection.insertOne(user);
            return InsertUserResult.SUCESS
        } catch (error) {
            console.log(`Error while inserting user: ${error}`);
            return InsertUserResult.DATABASE_ERROR
        }
    }

    async updatePassword(id: string, newPassword: string): Promise<UpdateResult> {
        if (!id || !newPassword || newPassword.length < 8) {
            return UpdateResult.INVALID_UPDATE
        }
        try {
            const userExists = await this.collection.findOne({ _id: id });
            if (!userExists) {
                return UpdateResult.INVALID_USER
            }
            const salt = await genSalt(rounds);
            const hashedPassword = await hash(newPassword, salt);
            await this.collection.updateOne({ _id: id }, { $set: { password: hashedPassword } });
            return UpdateResult.SUCESS
        } catch (error) {
            console.log(`Error while updating password: ${error}`);
            return UpdateResult.DATABASE_ERROR
        }
    }

    async updateUsername(id: string, newUsername: string): Promise<UpdateResult> {
        if (!id || !newUsername || newUsername.length < 3) {
            return UpdateResult.INVALID_UPDATE
        }
        try {
            const userExists = await this.collection.findOne({ _id: id });
            if (!userExists) {
                return UpdateResult.INVALID_USER
            }

            await this.collection.updateOne({ _id: id }, { $set: { username: newUsername } });
            return UpdateResult.SUCESS
        } catch (error) {
            console.log(`Error while updating username: ${error}`);
            return UpdateResult.DATABASE_ERROR
        }
    }
}