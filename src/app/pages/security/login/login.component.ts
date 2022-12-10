import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { SecurityService } from '../../../services/security.service';

@Component({
 selector: 'ngx-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 email:string="";
 password:string="";
 constructor(private secService : SecurityService,
       private router: Router) { }

 /**
 * Método que se ejecuta una vez se carga la página
 */
 ngOnInit(): void {
 }
 /**
 * Este método permite llevar a cabo el proceso de login,
 * llamando al método correspondiente de los servicios
 * para solicitar la validación al backend
 */
 login():void{ 
  console.log("aqui"+this.email+" contraseña "+this.password)
  let theUser:User={
   email:this.email,
   password:this.password
  }
  this.secService.login(theUser).subscribe(
   data=>{
    this.router.navigate(['pages/dashboard']);
    this.secService.saveDataSesion(data);
   },
   error=>{
    Swal.fire({
     title: 'Error Login',
     text: error["error"]["message"],
     icon: 'error',
     timer:5000
    });
   }
  );
 }
}