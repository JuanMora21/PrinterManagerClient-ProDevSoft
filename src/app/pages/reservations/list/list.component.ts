import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Reservation } from '../../../models/reservation.model';
import { ReservationService } from '../../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [/*'id',*/ 'Name', 'User','Printer','Start Date','End Date','Start Time','End Time','options'];
  theReservations:Reservation[];

  constructor(private ReservationService: ReservationService,
              private router:Router) { }

  ngOnInit(): void {
    this.listReservations();
  }

  listReservations(): void { 
    this.ReservationService.index().subscribe(data => {
      console.log(data);
      this.theReservations = data;
    });
  }

  createReservation():void{
    this.router.navigate(['/pages/reservations/create']);
    console.log("creando usuario");
  }

  updateReservation(id:number):void{
    this.router.navigate(['/pages/reservations/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteReservation(id:number):void{
    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete Reservation',
        text: "Sure you want to delete this Reservation?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
       }).then((result) => {
        if (result.isConfirmed) {
        this.ReservationService.destroy(id).subscribe(data => {
         Swal.fire(
          'Delete!',
          'The Reservation is successfully deleted',
          'success'
         )
         this.ngOnInit();
         });
        }
       })
  }

}
