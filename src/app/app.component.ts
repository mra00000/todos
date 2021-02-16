import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todos';
  newTodo = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  data: Todo[] = [];
  constructor() {
    this.data = this.loadData();
  }
  onInputEnter = () => {
    if (this.newTodo.valid) {
      const newId = new Date().getTime();
      this.data.unshift({
        id: String(newId),
        content: this.newTodo.value.trim(),
        completed: false,
      });
      this.newTodo.setValue('');
      this.saveData();
    }
  };
  onDelete = (event: string) => {
    this.data = this.data.filter((item) => item.id !== event);
    this.saveData();
  };
  onUpdate = (event: Todo) => {
    const index = this.data.findIndex((item) => item.id === event.id);
    if (index !== -1) {
      this.data[index] = event;
      this.saveData();
    }
  };
  saveData = () => {
    localStorage.setItem('todos', JSON.stringify(this.data));
  };
  loadData = (): Todo[] => {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
  };
}
