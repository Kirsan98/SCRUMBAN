import {User} from "./user.model";
// import {Log} from "./log.model";

export class Task{
    _id!: string;
    title!: string;
    color!: String;
    desrciption !: String;
    state !: String;
    _owner !: User[];
    created_at !: Date;
    estimated_duration !: String;
    // _logs !: Log[];
}