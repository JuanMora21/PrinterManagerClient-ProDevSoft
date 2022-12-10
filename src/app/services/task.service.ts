import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  index(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.url_backend}/Tasks`);
  }

  create(theTask:Task):any{
    return this.http.post<Task>(`${environment.url_backend}/Tasks`, theTask);
  }

  update(theTask:Task):any{
    console.log(JSON.stringify(theTask));
    return this.http.put<Task>(`${environment.url_backend}/Tasks/${theTask.id}`, theTask);
  }
  
  show(id:number): Observable<Task>{
    return this.http.get<Task>(`${environment.url_backend}/Tasks/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Task>(`${environment.url_backend}/Tasks/${id}`);
  }

}
