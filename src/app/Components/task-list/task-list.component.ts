import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from 'src/app/Services/task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  show : boolean = true;
  TaskDetails: any[] =[]
  
  constructor(private taskService: TaskServiceService) { }
  
  ngOnInit(): void { 
    this.getData();
  }
  openRegistration(){
    // this.show; 
  }
  getData(){
    this.taskService.fetchTask().subscribe((data:any)=>{
      console.log("Fetching All data in list", data);
        this.TaskDetails = data;
      console.log("All Task Data,,,", this.TaskDetails)
    })   
  }
 

}
