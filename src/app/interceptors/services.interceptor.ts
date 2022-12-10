import { Injectable } from '@angular/core';
import {
 HttpRequest,
 HttpHandler,
 HttpEvent,
 HttpInterceptor,
 HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServicesInterceptor implements HttpInterceptor {
  constructor(public miServicioSeguridad: SecurityService, private router:Router) { }
   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  if (this.miServicioSeguridad.UserSesionActiva) {

    request = request.clone({
      setHeaders: {
      Authorization: `Bearer ${this.miServicioSeguridad.UserSesionActiva.token}`}
    });
  }
  return next.handle(request).pipe(
   catchError((err: HttpErrorResponse) => {
    if (err.status === 401) {
     this.router.navigateByUrl('/pages/dashboard');
    }
    return throwError(err);
   })
  );
 }
}