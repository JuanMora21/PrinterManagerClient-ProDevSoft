import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from '../../../models/role.model';
import { Printer } from '../../../models/printer.model';
import { PrinterService } from '../../../services/printer.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  printer_id:number = 0;
  sendTry: boolean = false;
  thePrinter:Printer = {
    "name": "",
    "model":"",
    "type":"",
    "beed_height":0,
    "beed_width":0,
  }
  //roles: Role[] = [];
  selectedRoleID: number = 0;
  constructor(private PrinterService: PrinterService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private roleService: RoleService) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params.id) {
    this.createMode = false;
    this.printer_id = this.activeRoute.snapshot.params.id;
    this.getPrinter(this.printer_id)
   } else {
    this.createMode = true;
   }
   //this.getRoles();
  }
/* 
  getRoles(){
    this.roleService.index().subscribe(data => {
      this.roles = data;
    })
  } */

  getPrinter(id:number) {
   this.PrinterService.show(id).
      subscribe(data => {
      this.thePrinter = data[0];
      //this.selectedRoleID=this.thePrinter.role_id;
    });
  }
  
  create(): void {
    //if (this.validate()) {
      //this.thePrinter.role_id=this.selectedRoleID;
      console.log(this.selectedRoleID);
      this.sendTry = true;
      this.PrinterService.create(this.thePrinter).
      subscribe(data => {
       Swal.fire(
         'Created',
         'The Printer has created successfully',
         'success'
       )
       this.router.navigate(["/pages/printers/list"]);
      });
    //}
    console.log("Create Printer"+JSON.stringify(this.thePrinter));
  }

  update(): void {
    //if (this.validate()) {
      this.sendTry = true;
      //this.thePrinter.role_id=this.selectedRoleID;
      this.PrinterService.update(this.thePrinter).
      subscribe(data => {
       Swal.fire(
         'Updated',
         'The Printer has updated successfully',
         'success'
       )
       this.router.navigate(["/pages/printers/list"]);
      });
    //}
    console.log("Update Printer"+JSON.stringify(this.thePrinter));
  }
}
