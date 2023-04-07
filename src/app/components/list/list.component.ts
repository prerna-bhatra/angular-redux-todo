import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoInterface } from '../../services/todo.interface';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { selectAllCompleted, selectVisible } from '../../store/selectors/todo.selector';
import { onClearCompleted, onCompleteAll, onCreate, onRemove, onUpdate } from '../../store/actions/todo.action';

const LOCAL_STORAGE_KEY = 'todoapp_todos';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  visibleTodos$: Observable<TodoInterface[]>;

  allCompleted$: Observable<boolean>;

  selectedFile: any;
  
  constructor(private store: Store<TodoStateInterface>) {
    this.visibleTodos$ = store.select(selectVisible);
    this.allCompleted$ = store.select(selectAllCompleted);
  }

  public handleRemove(id: string) {
    this.store.dispatch(onRemove(id));
  }

  public handleUpdate(values: TodoInterface) {
    this.store.dispatch(onUpdate(values));
  }

  public handleCompleteAll() {
    this.store.dispatch(onCompleteAll());
  }

  public importToDos(event){

      this.selectedFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedFile, "UTF-8");
      fileReader.onload = () => {
        const result = fileReader.result;
        const resultArr = JSON.parse(result as string)
        console.log({ result , resultArr , parsed : JSON.parse(resultArr)})
      //  console.log(JSON.parse(result as string));
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify( JSON.parse(resultArr)));
      JSON.parse(resultArr).forEach(element => {
        this.store.dispatch(onCreate(element.name));
       });
      }
      fileReader.onerror = (error) => {
        console.log(error);
      }

  }
}
