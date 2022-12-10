import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  index(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url_backend}/Categories`);
  }

  create(theCategory:Category):any{
    return this.http.post<Category>(`${environment.url_backend}/Categories`, theCategory);
  }

  update(theCategory:Category):any{
    console.log(JSON.stringify(theCategory));
    return this.http.put<Category>(`${environment.url_backend}/Categories/${theCategory.id}`, theCategory);
  }
  
  show(id:number): Observable<Category>{
    return this.http.get<Category>(`${environment.url_backend}/Categories/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Category>(`${environment.url_backend}/Categories/${id}`);
  }

}
