import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Column } from '../models/column.model';

@Injectable({ providedIn: 'root' })
export class SprintService {


  constructor(private http: HttpClient) { }

  addColumn(idProject: any, idSprint: any, column: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/project/' + idProject + '/sprint/' + idSprint + '/add-column/', column).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getSingleColumnBySprint(idProject: any, idSprint: any, idColumn: any) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/project/' + idProject + '/sprint/' + idSprint + '/column/' + idColumn).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAllColumnFromSprint(idProject: any, idSprint: any) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/project/' + idProject + '/sprint/' + idSprint + '/columns').subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteSingleColumnBySprint(idProject: any, idSprint: any, idColumn: any) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/project/' + idProject + '/sprint/' + idSprint + '/delete-column/' + idColumn).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateColumn(id: string, column: Column) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:5000/api/updateColumn/' + id, column).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  moveTaskToColumn(idColumnStart: String, idColumnEnd: String, idTask: String, idUser: String) {
    return new Promise((resolve, reject) => {
      const body = {
        "idColumnStart": idColumnStart,
        "idColumnEnd": idColumnEnd,
        "idTask": idTask,
        "idUser": idUser
      }
      this.http.post('http://localhost:5000/api/move-task', body).subscribe(
        (response) => {
          console.log(response);

          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
