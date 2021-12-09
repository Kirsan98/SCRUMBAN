import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAllUsersFromProject(idProject: any){
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/project/'+idProject+'/users')
      .subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getUserById(idUser: any){
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/user'+idUser)
      .subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
