import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from './user.service';

@Pipe({
  name: 'getUsername'
})
export class GetUsernamePipe implements PipeTransform {

  constructor(private userService: UserService) { }

  async transform(userId: String, args?: any){
    const res = await this.getUsername(userId); 
    return res;
  }

  async getUsername(userId: String): Promise<String> {
    console.log(userId, "id du user qui fait le log");
    let userData = await this.userService.getUserById(userId);/* .then(
      (user: any) => {
        console.log(user, "from la promesse dans le pipe");
        
      }
    ); */
    // return new Promise((resolve, reject) => {
    //   this.userService.getUserById(userId).then(
    //     (userData: any) => {
    //       resolve(userData.data.username);
    //     },
    //     (error) => reject(error)
    //   );
    // })
    console.log(userData.data, "from pipe");
    
    return userData.data.username;
  }

}
 