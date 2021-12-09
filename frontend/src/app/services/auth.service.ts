import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({  providedIn: 'root'})
export class AuthService {
    
    constructor(private http:HttpClient){}
    
    createNewUser(user: any) {
        return new Promise(
          (resolve, reject) => {
            this.http.post('http://localhost:5000/api/addUser/',user).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    loginUser(body: any) {
        return new Promise(
            (resolve, reject) => {
                console.log(body);
                this.http.post('http://localhost:5000/api/login',body).subscribe(
                    (response) => {
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