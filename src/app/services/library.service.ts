import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Library } from '../models/library.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  index(): Observable<Library[]> {
    return this.http.get<Library[]>(`${environment.url_backend}/Libraries`);
  }

  create(theLibrary:Library):any{
    return this.http.post<Library>(`${environment.url_backend}/Libraries`, theLibrary);
  }

  update(theLibrary:Library):any{
    console.log(JSON.stringify(theLibrary));
    return this.http.put<Library>(`${environment.url_backend}/Libraries/${theLibrary.id}`, theLibrary);
  }
  
  show(id:number): Observable<Library>{
    return this.http.get<Library>(`${environment.url_backend}/Libraries/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Library>(`${environment.url_backend}/Libraries/${id}`);
  }

}
