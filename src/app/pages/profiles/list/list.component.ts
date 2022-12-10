import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Profile } from '../../../models/profile.model';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [/*'id',*/ 'User', 'Phone', 'Facebook','Instagram','options'];
  theProfiles:Profile[];

  constructor(private ProfileService: ProfileService,
              private router:Router) { }

  ngOnInit(): void {
    this.listProfiles();
  }

  listProfiles(): void { 
    this.ProfileService.index().subscribe(data => {
      console.log(data);
      this.theProfiles = data;
    });
  }

  createProfile():void{
    this.router.navigate(['/pages/profiles/create']);
    console.log("creando usuario");
  }

  updateProfile(id:number):void{
    this.router.navigate(['/pages/profiles/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteProfile(id:number):void{
    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete Profile',
        text: "Sure you want to delete this Profile?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
       }).then((result) => {
        if (result.isConfirmed) {
        this.ProfileService.destroy(id).subscribe(data => {
         Swal.fire(
          'Delete!',
          'The Profile is successfully deleted',
          'success'
         )
         this.ngOnInit();
         });
        }
       })
  }

}
