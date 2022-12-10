import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { Reservation } from '../../../models/reservation.model';
import { ReservationService } from '../../../services/reservation.service';
import { UserService } from '../../../services/user.service';
import { Printer } from '../../../models/printer.model';
import { PrinterService } from '../../../services/printer.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  Reservation_id:number = 0;
  sendTry: boolean = false;
  theReservation:Reservation = {
    "user_id": 0,
    "printer_id": 0,
    "name": "Rev1",
    "start_date": new Date('2017-05-03'),
    "end_date": new Date('2017-05-03'),
    "start_time": new Date('2038-01-19T08:14:08.000Z'),
    "end_time": new Date('2038-01-19T08:14:08.000Z'),
  }
  Users: User[] = [];
  Printers: Printer[] = [];
  selectedUserID: number = 0;
  selectedPrinterID: number = 0;
  date = new Date();
  day;
  month;
  year;
  currentDate;
  
  constructor(private ReservationService: ReservationService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private userService: UserService,
              private printerService: PrinterService) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params.id) {
    this.createMode = false;
    this.Reservation_id = this.activeRoute.snapshot.params.id;
    this.getReservation(this.Reservation_id)
   } else {
    this.createMode = true;
   }
   this.getUsers();
   this.getPrinters();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.currentDate = `${this.day}-${this.month}-${this.year}`;
    console.log(this.currentDate);
  }

  getUsers(){
    this.userService.index().subscribe(data => {
      this.Users = data;
    })
  }
  getPrinters(){
    this.printerService.index().subscribe(data => {
      this.Printers = data;
    })
  }

  getReservation(id:number) {
   this.ReservationService.show(id).
      subscribe(data => {
      this.theReservation = data[0];
      this.selectedUserID=this.theReservation.user_id;
      this.selectedPrinterID=this.theReservation.printer_id;
    });
  }
  
  create(): void {
    //if (this.validate()) {
      this.theReservation.user_id=this.selectedUserID;
      this.theReservation.printer_id=this.selectedPrinterID;
      console.log(this.selectedUserID);
      this.sendTry = true;
      this.ReservationService.create(this.theReservation).
      subscribe(data => {
       Swal.fire(
         'Created',
         'The Reservation has created successfully',
         'success'
       )
       this.router.navigate(["/pages/reservations/list"]);
      });
    //}
    console.log("Create Reservation"+JSON.stringify(this.theReservation));
  }

  update(): void {
    //if (this.validate()) {
      this.sendTry = true;
      this.theReservation.user_id=this.selectedUserID;
      this.theReservation.printer_id=this.selectedPrinterID;
      this.ReservationService.update(this.theReservation).
      subscribe(data => {
       Swal.fire(
         'Updated',
         'The Reservation has updated successfully',
         'success'
       )
       this.router.navigate(["/pages/reservations/list"]);
      });
    //}
    console.log("Update Reservation"+JSON.stringify(this.theReservation));
  }
}
