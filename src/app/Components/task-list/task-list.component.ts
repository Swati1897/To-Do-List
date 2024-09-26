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
  TaskDetails: any[] =[];
  deleteData: any;
  updateAllData: any[] =[]

  updateTaskForm! : FormGroup;
  
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

  onUpdateData():void{
    console.log(this.updateTaskForm.value);

    const body={
      id: this.updateTaskForm.value.id,
      assignedTo: this.updateTaskForm.value.assignedTo, 
      statusData: this.updateTaskForm.value.statusData,
      dueDate: this.updateTaskForm.value.dueDate,
      priorityWise: this.updateTaskForm.value.priorityWise,
      descriptionData: this.updateTaskForm.value.descriptionData
    };
    this.taskService.updateTask(body).subscribe((result: any)=>{
      this.updateAllData = result;
      this.showMessage();
    });
    this.getData();
  }

showMessage():void{
  alert("UPadte data.....")
}


  //////////////////////////////////
  onDelete(data: any):void{
    console.log("Delete Data", data);
    this.taskService.deleteTask(data.id).subscribe((data: any)=>{
      this.deleteData = data;
      this.DeleteMessage();
    })
    this.getData();
  }
 DeleteMessage():void{
  alert("Delete !!!!");
 }

}
