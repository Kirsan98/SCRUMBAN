import {User} from "./user.model";
import {Log} from "./log.model";

export class Task{
    _id!: string;
    title!: string;
    color!: String;
    description !: String;
    state !: String;
    _owner !: String;
    created_at !: Date;
    estimated_duration !: String;
    _logs !: Log[];
}