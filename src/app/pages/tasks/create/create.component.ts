import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Archive } from '../../../models/Archive.model';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { ArchiveService } from '../../../services/Archive.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  task_id:number = 0;
  sendTry: boolean = false;
  theTask:Task = {
    "name": "",
    "duration_hours": 0,
    "priority": "",
    "archive_id": 0,
  }
  Archives: Archive[] = [];
  selectedArchiveID: number = 0;
  constructor(private taskService: TaskService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private ArchiveService: ArchiveService) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params.id) {
    this.createMode = false;
    this.task_id = this.activeRoute.snapshot.params.id;
    this.gettask(this.task_id)
   } else {
    this.createMode = true;
   }
   this.getArchives();
  }

  getArchives(){
    this.ArchiveService.index().subscribe(data => {
      this.Archives = data;
    })
  }

  gettask(id:number) {
   this.taskService.show(id).
      subscribe(data => {
      this.theTask = data[0];
      this.selectedArchiveID=this.theTask.archive_id;
    });
  }
  
  create(): void {
    //if (this.validate()) {
      this.theTask.archive_id=this.selectedArchiveID;
      console.log(this.selectedArchiveID);
      this.sendTry = true;
      this.taskService.create(this.theTask).
      subscribe(data => {
       Swal.fire(
         'Created',
         'The task has created successfully',
         'success'
       )
       this.router.navigate(["/pages/tasks/list"]);
      });
    //}
    console.log("Create task"+JSON.stringify(this.theTask));
  }

  update(): void {
    //if (this.validate()) {
      this.sendTry = true;
      this.theTask.archive_id=this.selectedArchiveID;
      this.taskService.update(this.theTask).
      subscribe(data => {
       Swal.fire(
         'Updated',
         'The task has updated successfully',
         'success'
       )
       this.router.navigate(["/pages/tasks/list"]);
      });
    //}
    console.log("Update task"+JSON.stringify(this.theTask));
  }
}
