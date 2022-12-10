import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Library } from '../../../models/Library.model';
import { LibraryService } from '../../../services/library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  columns:string[] = ['ID','Belongs To','options'];
  theLibrarys:Library[];

  constructor(private LibraryService: LibraryService,
              private router:Router) { }

  ngOnInit(): void {
    this.listLibrarys();
  }

  listLibrarys(): void { 
    this.LibraryService.index().subscribe(data => {
      console.log(data);
      this.theLibrarys = data;
    });
  }

  createLibrary():void{
    this.router.navigate(['/pages/libraries/create']);
    console.log("creando libreria");
  }

  updateLibrary(id:number):void{
    this.router.navigate(['/pages/libraries/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteLibrary(id:number):void{
    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete Library',
        text: "Sure you want to delete this Library?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
       }).then((result) => {
        if (result.isConfirmed) {
        this.LibraryService.destroy(id).subscribe(data => {
         Swal.fire(
          'Delete!',
          'The Library is successfully deleted',
          'success'
         )
         this.ngOnInit();
         });
        }
       })
  }

}

