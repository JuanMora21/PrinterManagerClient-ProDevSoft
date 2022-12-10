import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from '../../../models/role.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  user_id:number = 0;
  sendTry: boolean = false;
  theUser:User = {
    "name": "",
    "email": "",
    "password": "",
    "role_id": 0,
  }
  roles: Role[] = [];
  selectedRoleID: number = 0;
  constructor(private userService: UserService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private roleService: RoleService) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params.id) {
    this.createMode = false;
    this.user_id = this.activeRoute.snapshot.params.id;
    this.getUser(this.user_id)
   } else {
    this.createMode = true;
   }
   this.getRoles();
  }

  getRoles(){
    this.roleService.index().subscribe(data => {
      this.roles = data;
    })
  }

  getUser(id:number) {
   this.userService.show(id).
      subscribe(data => {
      this.theUser = data[0];
      this.selectedRoleID=this.theUser.role_id;
    });
  }
  
  create(): void {
    //if (this.validate()) {
      this.theUser.role_id=this.selectedRoleID;
      console.log(this.selectedRoleID);
      this.sendTry = true;
      this.userService.create(this.theUser).
      subscribe(data => {
       Swal.fire(
         'Created',
         'The user has created successfully',
         'success'
       )
       this.router.navigate(["/pages/users/list"]);
      });
    //}
    console.log("Create user"+JSON.stringify(this.theUser));
  }

  update(): void {
    //if (this.validate()) {
      this.sendTry = true;
      this.theUser.role_id=this.selectedRoleID;
      this.userService.update(this.theUser).
      subscribe(data => {
       Swal.fire(
         'Updated',
         'The user has updated successfully',
         'success'
       )
       this.router.navigate(["/pages/users/list"]);
      });
    //}
    console.log("Update user"+JSON.stringify(this.theUser));
  }
}
