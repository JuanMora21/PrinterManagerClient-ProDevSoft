import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [/*'id',*/ 'name', 'email', 'role','options'];
  theUsers:User[];

  constructor(private userService: UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void { 
    this.userService.index().subscribe(data => {
      console.log(data);
      this.theUsers = data;
    });
  }

  createUser():void{
    this.router.navigate(['/pages/users/create']);
    console.log("creando usuario");
  }

  updateUser(id:number):void{
    this.router.navigate(['/pages/users/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteUser(id:number):void{
    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete user',
        text: "Sure you want to delete this user?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
       }).then((result) => {
        if (result.isConfirmed) {
        this.userService.destroy(id).subscribe(data => {
         Swal.fire(
          'Delete!',
          'The user is successfully deleted',
          'success'
         )
         this.ngOnInit();
         });
        }
       })
  }

}
