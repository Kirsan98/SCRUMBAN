import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { Log } from '../models/log.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RefreshLogService {
  private logSrc: BehaviorSubject<Log[]>;
  public currentLogList;
  private users: User[] = [];

  constructor(
    private userService: UserService
  ) {
    this.logSrc = new BehaviorSubject<Log[]>([new Log()]);
    this.currentLogList = this.logSrc.asObservable();
  }

  public async refreshLog(logs: any[]): Promise<void> {
    this.users = [];
    console.log(logs, "regardez le beau tableau qu'on a recupéré");
    await Promise.all(logs.map(
      async (log: any) => {
        if (log._userId != undefined) {
          console.log("eh oh, on parcours le tableau de log");

          this.userService.getUserById(log._userId)
            .then(
              (user: any) => {
                this.users.push(user.data);
                console.log(this.users, "on met a jour les users de refresh log service");
              }
            );
        }
      }
    ));
    console.log("fin des promesses du refreshLog");
    // logs.forEach(
    //   (log: any) => {
    //     if (log._userId != undefined) {
    //       this.userService.getUserById(log._userId)
    //         .then(
    //           (user: any) => {
    //             this.users.push(user.data);
    //             console.log(this.users, "on met a jour les users de refresh log service");
    //           }
    //         );
    //     }
    //   }
    // );
    this.logSrc.next(logs);
  }

  public getUsers(): User[] {
    console.log(this.users, "on recupere les users de refresh log service");

    return this.users;
  }
}
