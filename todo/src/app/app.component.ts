import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: any[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;
  public mode: string = 'list';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
    
    // this.todos.push(new Todo(1, 'Passear', false));
    // this.todos.push(new Todo(2, 'Ir na mamãe', false));
    // this.todos.push(new Todo(3, 'Estudar na faculdade', false));
    // this.todos.push(new Todo(4, 'Trabalhar na gráfica', true));
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length +1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load(){
    const data = localStorage.getItem('todos');
    if(data){
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
    this.todos = JSON.parse(data);
  }

}
