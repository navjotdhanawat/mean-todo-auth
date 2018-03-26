import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  title: any;
  description: any;
  error: any;
  constructor(public todoService: TodoService, public router: Router) { }

  ngOnInit() {
  }

  addTodo() {
    this.error = '';
    console.log(this.title, this.description);
    if (this.title && this.description) {
      var todo = {
        title: this.title,
        desc: this.description
      }
      this.todoService.createTodo(todo, (data) => {
        if (data.status) {
          this.title = '';
          this.description = '';
          this.router.navigateByUrl("/home/todo-list");
        }
      });
    } else {
      this.error = "All fields required!!!";
    }

  }

}
