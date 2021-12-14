import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedSrc: BehaviorSubject<boolean>;
  public isLogged;
  private user: String = "";

  constructor(private http: HttpClient) { 
    this.isLoggedSrc = new BehaviorSubject<boolean> (false);
    this.isLogged = this.isLoggedSrc.asObservable();
  }

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
    this.isLoggedSrc.next(true);
    this.user = idUser;
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

  logOut():void{
    this.isLoggedSrc.next(false);
    this.user = "";
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