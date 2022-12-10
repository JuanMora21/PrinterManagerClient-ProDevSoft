import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Printer } from '../../../models/printer.model';
import { PrinterService } from '../../../services/printer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [/*'id',*/ 'Name', 'Model','Type','Bed Height','Bed Width','Options'];
  thePrinters:Printer[];

  constructor(private PrinterService: PrinterService,
              private router:Router) { }

  ngOnInit(): void {
    this.listPrinters();
  }

  listPrinters(): void { 
    this.PrinterService.index().subscribe(data => {
      console.log(data);
      this.thePrinters = data;
    });
  }

  createPrinter():void{
    this.router.navigate(['/pages/printers/create']);
    console.log("creando usuario");
  }

  updatePrinter(id:number):void{
    this.router.navigate(['/pages/printers/update/'+id])
    console.log("actualizando a: "+id);
  }

  deletePrinter(id:number):void{
    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete Printer',
        text: "Sure you want to delete this Printer?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
       }).then((result) => {
        if (result.isConfirmed) {
        this.PrinterService.destroy(id).subscribe(data => {
         Swal.fire(
          'Delete!',
          'The Printer is successfully deleted',
          'success'
         )
         this.ngOnInit();
         });
        }
       })
  }

}
