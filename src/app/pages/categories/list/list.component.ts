import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/Category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  columns:string[] = ['Name','Library ID','Options'];
  theCategorys:Category[];

  constructor(private CategoryService: CategoryService,
              private router:Router) { }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(): void { 
    this.CategoryService.index().subscribe(data => {
      console.log(data);
      this.theCategorys = data;
    });
  }

  createCategory():void{
    this.router.navigate(['/pages/categories/create']);
    console.log("creando libreria");
  }

  updateCategory(id:number):void{
    this.router.navigate(['/pages/categories/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteCategory(id:number):void{
    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete Category',
        text: "Sure you want to delete this Category?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
       }).then((result) => {
        if (result.isConfirmed) {
        this.CategoryService.destroy(id).subscribe(data => {
         Swal.fire(
          'Delete!',
          'The Category is successfully deleted',
          'success'
         )
         this.ngOnInit();
         });
        }
       })
  }

}

