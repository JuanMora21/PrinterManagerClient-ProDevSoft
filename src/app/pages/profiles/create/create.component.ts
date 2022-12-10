import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { Profile } from '../../../models/profile.model';
import { ProfileService } from '../../../services/profile.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  Profile_id:number = 0;
  sendTry: boolean = false;
  theProfile:Profile = {
    "user_id": 0,
    "phone": "",
    "facebook_url": "",
    "instagram_url": "",
  }
  Users: User[] = [];
  selectedUserID: number = 0;
  constructor(private ProfileService: ProfileService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private UserService: UserService) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params.id) {
    this.createMode = false;
    this.Profile_id = this.activeRoute.snapshot.params.id;
    this.getProfile(this.Profile_id)
   } else {
    this.createMode = true;
   }
   this.getUsers();
  }

  getUsers(){
    this.UserService.index().subscribe(data => {
      this.Users = data;
    })
  }

  getProfile(id:number) {
   this.ProfileService.show(id).
      subscribe(data => {
      this.theProfile = data[0];
      this.selectedUserID=this.theProfile.user_id;
    });
  }
  
  create(): void {
    //if (this.validate()) {
      this.theProfile.user_id=this.selectedUserID;
      console.log(this.selectedUserID);
      this.sendTry = true;
      this.ProfileService.create(this.theProfile).
      subscribe(data => {
       Swal.fire(
         'Created',
         'The Profile has created successfully',
         'success'
       )
       this.router.navigate(["/pages/profiles/list"]);
      });
    //}
    console.log("Create Profile"+JSON.stringify(this.theProfile));
  }

  update(): void {
    //if (this.validate()) {
      this.sendTry = true;
      this.theProfile.user_id=this.selectedUserID;
      this.ProfileService.update(this.theProfile).
      subscribe(data => {
       Swal.fire(
         'Updated',
         'The Profile has updated successfully',
         'success'
       )
       this.router.navigate(["/pages/profiles/list"]);
      });
    //}
    console.log("Update Profile"+JSON.stringify(this.theProfile));
  }
}
