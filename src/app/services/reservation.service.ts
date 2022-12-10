import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  index(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.url_backend}/Reservations`);
  }

  create(theReservation:Reservation):any{
    return this.http.post<Reservation>(`${environment.url_backend}/Reservations`, theReservation);
  }

  update(theReservation:Reservation):any{
    console.log(JSON.stringify(theReservation));
    return this.http.put<Reservation>(`${environment.url_backend}/Reservations/${theReservation.id}`, theReservation);
  }
  
  show(id:number): Observable<Reservation>{
    return this.http.get<Reservation>(`${environment.url_backend}/Reservations/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Reservation>(`${environment.url_backend}/Reservations/${id}`);
  }

}
