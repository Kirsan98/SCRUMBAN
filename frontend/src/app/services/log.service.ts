import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({  providedIn: 'root'})
export class LogService{
    constructor(private http:HttpClient){}

    getLogById(idLog: any){
        return new Promise((resolve,reject) => {
          this.http.get('http://localhost:5000/api/log/'+ idLog).subscribe(
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