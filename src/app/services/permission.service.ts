import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  index(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.url_backend}/Permissions`);
  }

  create(thePermission:Permission):any{
    return this.http.post<Permission>(`${environment.url_backend}/Permissions`, thePermission);
  }

  update(thePermission:Permission):any{
    console.log(JSON.stringify(thePermission));
    return this.http.put<Permission>(`${environment.url_backend}/Permissions/${thePermission.id}`, thePermission);
  }
  
  show(id:number): Observable<Permission>{
    return this.http.get<Permission>(`${environment.url_backend}/Permissions/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Permission>(`${environment.url_backend}/Permissions/${id}`);
  }

}
