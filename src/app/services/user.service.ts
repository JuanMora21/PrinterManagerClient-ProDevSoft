import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  index(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_backend}/Users`);
  }

  create(theUSer:User):any{
    return this.http.post<User>(`${environment.url_backend}/Users`, theUSer);
  }

  update(theUSer:User):any{
    console.log(JSON.stringify(theUSer));
    return this.http.put<User>(`${environment.url_backend}/Users/${theUSer.id}`, theUSer);
  }
  
  show(id:number): Observable<User>{
    return this.http.get<User>(`${environment.url_backend}/Users/${id}`);
  }

  destroy(id:number){
    return this.http.delete<User>(`${environment.url_backend}/Users/${id}`);
  }

}
