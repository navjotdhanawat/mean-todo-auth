import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TodoService {
  headers: any;
  constructor(public http: HttpClient) {

  }

  public getToken() {
      return localStorage.getItem('token');
  }

  public getAuthHeader() {
    return  {headers: new  HttpHeaders({ Authorization: `${this.getToken()}` } )};
  }

  getTodos (callback) {
    this.http.get('http://localhost:8080/todo',this.getAuthHeader()).subscribe(data=> {
      callback(data);
    }, err=> {
      console.log(err);
    });
  }

  createTodo(todo, callback) {
    debugger
    this.http.post('http://localhost:8080/todo',todo, this.getAuthHeader()).subscribe(data=> {
      debugger
      callback(data);
    }, err=> {
      debugger
      console.log(err);
    });
  }

  updateTodo(id, callback) {
    this.http.put(`http://localhost:8080/todo/${id}`, {}, {}).subscribe(data=> {
      callback(data);
    }, err=> {
      console.log(err);
    });
  }

  deleteTodo(id, callback) {
    this.http.delete(`http://localhost:8080/todo/${id}`,this.getAuthHeader()).subscribe(data=> {
      callback(data);
    }, err=> {
      console.log(err);
    });
  }
}
