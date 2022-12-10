import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Library } from '../../../models/Library.model';
import { LibraryService } from '../../../services/Library.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  Library_id:number = 0;
  sendTry: boolean = false;
  theLibrary:Library = {
    "user_id": 0,
  }
  users: User[] = [];
  selectedUserID: number = 0;
  constructor(private LibraryService: LibraryService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params.id) {
    this.createMode = false;
    this.Library_id = this.activeRoute.snapshot.params.id;
    this.getLibrary(this.Library_id)
   } else {
    this.createMode = true;
   }
   this.getUsers();
  }

  getUsers(){
    this.userService.index().subscribe(data => {
      this.users = data;
    })
  }

  getLibrary(id:number) {
   this.LibraryService.show(id).
      subscribe(data => {
      this.theLibrary = data[0];
      this.selectedUserID=this.theLibrary.user_id;
    });
  }
  
  create(): void {
    //if (this.validate()) {
      this.theLibrary.user_id=this.selectedUserID;
      console.log(this.selectedUserID);
      this.sendTry = true;
      this.LibraryService.create(this.theLibrary).
      subscribe(data => {
       Swal.fire(
         'Created',
         'The Library has created successfully',
         'success'
       )
       this.router.navigate(["/pages/libraries/list"]);
      });
    //}
    console.log("Create Library"+JSON.stringify(this.theLibrary));
  }

  update(): void {
    //if (this.validate()) {
      this.sendTry = true;
      this.theLibrary.user_id=this.selectedUserID;
      this.LibraryService.update(this.theLibrary).
      subscribe(data => {
       Swal.fire(
         'Updated',
         'The Library has updated successfully',
         'success'
       )
       this.router.navigate(["/pages/libraries/list"]);
      });
    //}
    console.log("Update Library"+JSON.stringify(this.theLibrary));
  }
}
