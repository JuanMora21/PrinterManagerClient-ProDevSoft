import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
@Injectable({
 providedIn: 'root'
})
export class SecurityService {
 theUser = new BehaviorSubject<User>(new User);
 constructor(private http: HttpClient,private router: Router) {
  this.checkCurrentSesion();
 }
 /**
 * Permite obtener la información de User
 * que tiene la función activa y servirá
 * para acceder a la información del token
 */
 public get UserSesionActiva(): User {

  return this.theUser.value;
 }
 /**
 * Permite actualizar la información del User
 * que acabó de validarse correctamente
 * @param user información del User logueado
 */
 setUser(user: User) {
  this.theUser.next(user);
 }
 /**
 * Permite obtener la información del User
 * con datos tales como el identificador y el token
 * @returns
 */
 getUser() {
  return this.theUser.asObservable();
 }
 /**
 * Realiza la petición al backend con el correo y la contraseña
 * para check si existe o no en la plataforma
 * @param infoUser JSON con la información de correo y contraseña
 * @returns Respuesta HTTP la cual indica si el User tiene permiso de acceso
 */
 login(infoUser: User): Observable<User> {
  return this.http.post<User>(`${environment.url_backend}/login`, infoUser);
 }
 /**
 * Guarda los datos tales como el identificador
 * y token del User en una base de datos
 * interna del navegador llamada local storage
 * @param dataSesion información del User
 * @returns un booleano que indica si la información
 * fue almacenada correctamente
 */
 saveDataSesion(dataSesion: any) {
  let currentSesion = localStorage.getItem('sesion');
   let data: User = {
    id: dataSesion.User.id,
    name: dataSesion.User.name,
    role_id: dataSesion.User.role_id,
    token:dataSesion.token.token,
   };
   localStorage.setItem('sesion', JSON.stringify(data));
   this.setUser(data);
 }
 /**

 * Permite cerrar la sesión del User
 * que estaba previamente logueado
 */
 logout() {
  localStorage.removeItem('sesion');
  return this.http.post<User>(`${environment.url_backend}/logout`, this.theUser);
  this.setUser(new User());
 }
 /**
 * Permite check si actualmente en el local storage
 * existe información de un User previamente logueado
 */
 checkCurrentSesion() {
  let currentSesion = this.getDataSesion();
  if (currentSesion) {
   this.setUser(JSON.parse(currentSesion));
  }
 }
 /**
 * Verifica si hay una sesion activa
 * @returns
 */
 sesionExist(): boolean {
  let currentSesion = this.getDataSesion();
  return (currentSesion) ? true : false;
 }
 /**
 * Permite obtener los dato de la sesión activa en el
 * local storage
 * @returns
 */
 getDataSesion() {
  let currentSesion = localStorage.getItem('sesion');
  return currentSesion;
 }
}