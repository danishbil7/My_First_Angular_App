import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';

@Pipe({
  name: 'filterTodos',
  standalone: true
})
export class FilterTodosPipe implements PipeTransform {
  transform(todos: Todo[] | null, searchTerm: string): Todo[] {
    if (!todos) {
      return []; // ✅ Handle case where `todos` is null/undefined
    }

    if (!searchTerm) {
      return todos;
    }

    const text = searchTerm.toLowerCase();

    return todos.filter(todo => 
      todo.title.toLowerCase().includes(text) // ✅ Fixed syntax error (removed extra `)`)
    );
  }
}
