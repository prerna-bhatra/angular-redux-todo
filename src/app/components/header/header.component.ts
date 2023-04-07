import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { onCreate } from '../../store/actions/todo.action';

const ENTER_KEY = 'Enter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  name = '';

  constructor(private store: Store<TodoStateInterface>) { }

  handleChange(event: KeyboardEvent) {
    this.name = (event.target as HTMLInputElement).value;
  }

  handleSubmit(event: KeyboardEvent) {
    if (event.key !== ENTER_KEY) {
      return;
    }

    this.store.dispatch(onCreate(this.name));

    const data = localStorage.getItem("todoapp_todos");
    console.log({ data })
    //  add data to json file
    var theJSON = JSON.stringify(data);
    var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);

    var a = document.createElement('a');
    a.href = uri;
    a.innerHTML = "Right-click and choose 'save as...'";
    document.body.appendChild(a);

    this.name = '';



  }
}
