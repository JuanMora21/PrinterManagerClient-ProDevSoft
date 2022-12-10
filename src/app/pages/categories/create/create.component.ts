import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../../../models/Category.model';
import { CategoryService } from '../../../services/Category.service';
import { Library } from '../../../models/Library.model';
import { LibraryService } from '../../../services/Library.service';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  Category_id:number = 0;
  sendTry: boolean = false;
  theCategory:Category = {
    "library_id": 0,
    "name":"",
  }
  Librarys: Library[] = [];
  selectedLibraryID: number = 0;
  constructor(private CategoryService: CategoryService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private libraryService: LibraryService) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params.id) {
    this.createMode = false;
    this.Category_id = this.activeRoute.snapshot.params.id;
    this.getCategory(this.Category_id)
   } else {
    this.createMode = true;
   }
   this.getLibrarys();
  }

  getLibrarys(){
    this.libraryService.index().subscribe(data => {
      this.Librarys = data;
    })
  } 

  getCategory(id:number) {
   this.CategoryService.show(id).
      subscribe(data => {
      this.theCategory = data[0];
      this.selectedLibraryID=this.theCategory.library_id;
    });
  }
  
  create(): void {
    //if (this.validate()) {
      this.theCategory.library_id=this.selectedLibraryID;
      console.log(this.selectedLibraryID);
      this.sendTry = true;
      this.CategoryService.create(this.theCategory).
      subscribe(data => {
       Swal.fire(
         'Created',
         'The Category has created successfully',
         'success'
       )
       this.router.navigate(["/pages/categories/list"]);
      });
    //}
    console.log("Create Category"+JSON.stringify(this.theCategory));
  }

  update(): void {
    //if (this.validate()) {
      this.sendTry = true;
      this.theCategory.library_id=this.selectedLibraryID;
      this.CategoryService.update(this.theCategory).
      subscribe(data => {
       Swal.fire(
         'Updated',
         'The Category has updated successfully',
         'success'
       )
       this.router.navigate(["/pages/categories/list"]);
      });
    //}
    console.log("Update Category"+JSON.stringify(this.theCategory));
  }
}
