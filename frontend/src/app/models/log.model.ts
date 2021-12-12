import { Column } from "./column.model";
import {User} from "./user.model";

export class Log{
    _id!: String;
    _userId!: User;
    _columnIdStart!: Column;
    _columnIdEnd !: Column;
    updated_at!: String;
}