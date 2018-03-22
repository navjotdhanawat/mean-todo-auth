import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  title: any;
  description: any;
  error: any;
  constructor() { }

  ngOnInit() {
  }

  addTodo() {
    this.error = '';
    console.log(this.title, this.description);
    if (this.title && this.description) {
      //http api call
    } else {
      this.error = "All fields required!!!";
    }

  }

}
