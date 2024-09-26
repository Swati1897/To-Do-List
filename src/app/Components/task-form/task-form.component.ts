import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from 'src/app/Services/task-service.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent  implements OnInit{
  TaskResult:any[] =[];
  show: boolean = true;
  TaskForm !:FormGroup;

  constructor( private taskService: TaskServiceService,
               private  formBuilder: FormBuilder,
               private router : Router,
               private currentRouter : ActivatedRoute){

    this.TaskForm = this.formBuilder.group({
      assignedTo:['', [Validators.required]],
      statusData:['', [Validators.required]],
      dueDate:[''],
      priorityWise:['', [Validators.required]],
      descriptionData:['']
      })
  }
  
  ngOnInit(): void { 
    this.onFormSubmit();
  }

  onFormSubmit(){
    console.log("Form", this.TaskForm.value);

    const body={
      assignedTo : this.TaskForm.value.assignedTo,
      statusData : this.TaskForm.value.statusData,
      dueData : this.TaskForm.value.dueDate,
      priorityWise : this.TaskForm.value.priorityWise,
      descriptionData : this.TaskForm.value.descriptionData
    };

    this.taskService.addTask(body).subscribe((data:any)=>{
      console.log("Add Task data:....", data);
      this.TaskResult = data;
      this.TaskForm.reset();
      this.router.navigate(['../view-task'], {relativeTo: this.currentRouter})
    }, (error)=>{
      console.log("Error Occure !", error);
    })
  }
}

