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
  // gobal declatation 
  public TASKRESULT:any[] = [];

  addTaskForm !:FormGroup;

  constructor( private taskService: TaskServiceService,
               private  formBuilder: FormBuilder,
               private router : Router,
               private currentRouter : ActivatedRoute){

    this.addTaskForm = this.formBuilder.group({
      assignedTo:['', [Validators.required]],
      statusData:['', [Validators.required]],
      dueDate:[''],
      priorityWise:['', [Validators.required]],
      descriptionData:['']
      })
  }
  
  ngOnInit(): void { }
  
  onFormSubmit(){
    console.log("Form", this.addTaskForm.value);
        const BODY = {
          assignedTo : this.addTaskForm.value.assignedTo,
          statusData : this.addTaskForm.value.statusData,
          dueDate : this.addTaskForm.value.dueDate,
          priorityWise : this.addTaskForm.value.priorityWise,
          descriptionData : this.addTaskForm.value.descriptionData
    };

    this.taskService.addTask(BODY).subscribe((data:any) => {
      console.log("Add Task data:....", data);
      this.TASKRESULT = data;
      this.addTaskForm.reset();
      this.router.navigate(['list-task'], {relativeTo: this.currentRouter})
    }, (error) => {
      console.log("Error Occure !", error);
    })
  }
}

