import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  index(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${environment.url_backend}/Profiles`);
  }

  create(theProfile:Profile):any{
    return this.http.post<Profile>(`${environment.url_backend}/Profiles`, theProfile);
  }

  update(theProfile:Profile):any{
    console.log(JSON.stringify(theProfile));
    return this.http.put<Profile>(`${environment.url_backend}/Profiles/${theProfile.id}`, theProfile);
  }
  
  show(id:number): Observable<Profile>{
    return this.http.get<Profile>(`${environment.url_backend}/Profiles/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Profile>(`${environment.url_backend}/Profiles/${id}`);
  }

}
