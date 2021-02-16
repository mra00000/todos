import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() item: Todo = { id: '', content: '', completed: false };
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() updateTodo = new EventEmitter<Todo>();
  @ViewChild('edit') editInput!: ElementRef;
  isEditing = false;
  onDelete = () => {
    this.deleteTodo.emit(this.item.id);
  };
  onDoubleClick = () => {
    if (this.isEditing) {
      this.isEditing = false;
      this.updateContent();
    } else {
      this.isEditing = true;
      setTimeout(() => {
        this.editInput.nativeElement.focus();
      }, 0);
    }
  };
  updateStatus = (completed: boolean) => {
    this.updateTodo.emit({ ...this.item, completed });
  };
  updateContent = () => {
    this.isEditing = false;
    if (this.item.content.length > 0) {
      this.updateTodo.emit(this.item);
    } else {
      this.onDelete();
    }
  };
}
