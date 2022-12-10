import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Printer } from '../models/printer.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  constructor(private http: HttpClient) { }

  index(): Observable<Printer[]> {
    return this.http.get<Printer[]>(`${environment.url_backend}/Printers`);
  }

  create(thePrinter:Printer):any{
    return this.http.post<Printer>(`${environment.url_backend}/Printers`, thePrinter);
  }

  update(thePrinter:Printer):any{
    console.log(JSON.stringify(thePrinter));
    return this.http.put<Printer>(`${environment.url_backend}/Printers/${thePrinter.id}`, thePrinter);
  }
  
  show(id:number): Observable<Printer>{
    return this.http.get<Printer>(`${environment.url_backend}/Printers/${id}`);
  }

  destroy(id:number){
    return this.http.delete<Printer>(`${environment.url_backend}/Printers/${id}`);
  }

}
