import { Exclude, Expose } from "class-transformer";

export class User {
    @Expose()
    jwt:String
    @Expose()
    userId:String
}
