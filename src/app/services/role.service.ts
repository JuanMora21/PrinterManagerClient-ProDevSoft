import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  index(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_backend}/Roles`);
  }

  create(theRole:Role):any{
    return this.http.post<Role>(`${environment.url_backend}/Roles`, theRole);
  }

  update(theRole:Role):any{
    console.log(JSON.stringify(theRole));
    return this.http.put<Role>(`${environment.url_backend}/Roles/${theRole.id}`, theRole);
  }
  
  show(id:number): Observable<Role>{
    return this.http.get<Role>(`${environment.url_backend}/Roles/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Role>(`${environment.url_backend}/Roles/${id}`);
  }

}
