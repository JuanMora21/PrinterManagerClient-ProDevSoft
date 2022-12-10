import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Archive } from '../../../models/archive.model';
import { ArchiveService } from '../../../services/archive.service';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  Archive_id:number = 0;
  sendTry: boolean = false;
  theArchive:Archive = {
    "name":"",
    "format":"",
    "visibility":"",
    "category_id": 0,
  }
  Categorys: Category[] = [];
  selectedCategoryID: number = 0;
  constructor(private ArchiveService: ArchiveService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private CategoryService: CategoryService) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params.id) {
    this.createMode = false;
    this.Archive_id = this.activeRoute.snapshot.params.id;
    this.getArchive(this.Archive_id)
   } else {
    this.createMode = true;
   }
   this.getCategorys();
  }

  getCategorys(){
    this.CategoryService.index().subscribe(data => {
      this.Categorys = data;
    })
  } 

  getArchive(id:number) {
   this.ArchiveService.show(id).
      subscribe(data => {
      this.theArchive = data[0];
      this.selectedCategoryID=this.theArchive.category_id;
    });
  }
  
  create(): void {
    //if (this.validate()) {
      this.theArchive.category_id=this.selectedCategoryID;
      console.log(this.selectedCategoryID);
      this.sendTry = true;
      this.ArchiveService.create(this.theArchive).
      subscribe(data => {
       Swal.fire(
         'Created',
         'The Archive has created successfully',
         'success'
       )
       this.router.navigate(["/pages/archives/list"]);
      });
    //}
    console.log("Create Archive"+JSON.stringify(this.theArchive));
  }

  update(): void {
    //if (this.validate()) {
      this.sendTry = true;
      this.theArchive.category_id=this.selectedCategoryID;
      this.ArchiveService.update(this.theArchive).
      subscribe(data => {
       Swal.fire(
         'Updated',
         'The Archive has updated successfully',
         'success'
       )
       this.router.navigate(["/pages/archives/list"]);
      });
    //}
    console.log("Update Archive"+JSON.stringify(this.theArchive));
  }
}
