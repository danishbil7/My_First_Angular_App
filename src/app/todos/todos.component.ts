import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { NgIf } from '@angular/common';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  standalone: true, // ✅ Added standalone: true
  imports: [NgIf, TodoItemComponent, FormsModule, FilterTodosPipe] , // ✅ Added NgIf if needed in template
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'] // ✅ Fixed typo (styleUrls instead of styleUrl)
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm= signal('');

  ngOnInit(): void {
    this.todoService.getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.error(err); // ✅ console.error for proper error handling
          throw err;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
      });
  }

  updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) =>
      todos.map(todo =>
        todo.id === todoItem.id // ✅ Fixed comparison (=== instead of =)
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
}
