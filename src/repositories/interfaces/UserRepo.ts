export interface User {
    _id: string;
    username: string;
    password: string;
}

export enum InsertUserResult {
    SUCESS,
    USERNAME_EXISTS,
    INVALID_PASSWORD,
    INVALID_USERNAME,
    DATABASE_ERROR
}

export enum UpdateResult {
    SUCESS,
    INVALID_UPDATE,
    INVALID_USER,
    DATABASE_ERROR
}

export interface UserRepo {
    create(user: User): Promise<InsertUserResult>,
    updateUsername(id: string, newUsername: string): Promise<UpdateResult>,
    updatePassword(id: string, newPassword: string): Promise<UpdateResult>,
    getById(id: string): Promise<User | null>,
    getByUsername(username: string): Promise<User | null>
}
