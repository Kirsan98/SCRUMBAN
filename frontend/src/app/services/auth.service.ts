import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  
  private isLogged: boolean = false;
  private user: String = "";

  constructor(private http: HttpClient) { }

  createNewUser(user: any) {
    return new Promise(
      (resolve, reject) => {
        this.http.post('http://localhost:5000/api/addUser/', user).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
  }

  public logUser(idUser: String){
    this.isLogged = true;
    this.user = idUser;
  }

  public isLoggedIn(): boolean{
    return this.isLogged;
  }
  public get getUserId(){
    return this.user;
  }

  loginUser(body: any) {
    return new Promise(
      (resolve, reject) => {
        console.log(body);
        this.http.post('http://localhost:5000/api/login', body).subscribe(
          (response) => {
            console.log(response, "from auth service");
            
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
  }

  // signOutUser(user: any) {
  //     return new Promise(
  //         (resolve, reject) => {
  //             this.http.post('http://localhost:5000/api/addUser',user).subscribe(
  //                 (response) => {
  //                     resolve(response);
  //                 },
  //                 (error) => {
  //                     reject(error);
  //             }
  //         );
  //     });
  // }
}