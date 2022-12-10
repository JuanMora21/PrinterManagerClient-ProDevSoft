import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archive } from '../models/archive.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  index(): Observable<Archive[]> {
    return this.http.get<Archive[]>(`${environment.url_backend}/Archives`);
  }

  create(theArchive:Archive):any{
    return this.http.post<Archive>(`${environment.url_backend}/Archives`, theArchive);
  }

  update(theArchive:Archive):any{
    console.log(JSON.stringify(theArchive));
    return this.http.put<Archive>(`${environment.url_backend}/Archives/${theArchive.id}`, theArchive);
  }
  
  show(id:number): Observable<Archive>{
    return this.http.get<Archive>(`${environment.url_backend}/Archives/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Archive>(`${environment.url_backend}/Archives/${id}`);
  }

}

