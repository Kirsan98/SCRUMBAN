import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsersFromProject(idProject: any) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/project/' + idProject + '/users')
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

  getUserById(idUser: any): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/user/' + idUser)
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

  getUserByEmail(userEmail: any) {
    return new Promise((resolve, reject) => {

      this.http.post('http://localhost:5000/api/user', { "email": userEmail })
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

  getUserByUsername(username: any) {
    return new Promise((resolve, reject) => {

      this.http.post('http://localhost:5000/api/user', { "username": username })
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



  addProjectToUser(userId: any, projectId: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/user/' + userId + '/add-project', { _id: projectId })
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
