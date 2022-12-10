import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Archive } from '../../../models/archive.model';
import { ArchiveService } from '../../../services/archive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  columns:string[] = ['Name','Format','Visibility','Category','Options'];
  theArchives:Archive[];

  constructor(private ArchiveService: ArchiveService,
              private router:Router) { }

  ngOnInit(): void {
    this.listArchives();
  }

  listArchives(): void { 
    this.ArchiveService.index().subscribe(data => {
      console.log(data);
      this.theArchives = data;
    });
  }

  createArchive():void{
    this.router.navigate(['/pages/archives/create']);
    console.log("creando libreria");
  }

  updateArchive(id:number):void{
    this.router.navigate(['/pages/archives/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteArchive(id:number):void{
    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete Archive',
        text: "Sure you want to delete this Archive?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
       }).then((result) => {
        if (result.isConfirmed) {
        this.ArchiveService.destroy(id).subscribe(data => {
         Swal.fire(
          'Delete!',
          'The Archive is successfully deleted',
          'success'
         )
         this.ngOnInit();
         });
        }
       })
  }

}

