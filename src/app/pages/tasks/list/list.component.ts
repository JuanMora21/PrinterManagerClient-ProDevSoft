import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [/*'id',*/ 'Name', 'Duration ', 'Priority','Archive','options'];
  theTasks:Task[];

  constructor(private TaskService: TaskService,
              private router:Router) { }

  ngOnInit(): void {
    this.listTasks();
  }

  listTasks(): void { 
    this.TaskService.index().subscribe(data => {
      console.log(data);
      this.theTasks = data;
    });
  }

  createTask():void{
    this.router.navigate(['/pages/tasks/create']);
    console.log("creando usuario");
  }

  updateTask(id:number):void{
    this.router.navigate(['/pages/tasks/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteTask(id:number):void{
    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete Task',
        text: "Sure you want to delete this Task?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
       }).then((result) => {
        if (result.isConfirmed) {
        this.TaskService.destroy(id).subscribe(data => {
         Swal.fire(
          'Delete!',
          'The Task is successfully deleted',
          'success'
         )
         this.ngOnInit();
         });
        }
       })
  }

}
