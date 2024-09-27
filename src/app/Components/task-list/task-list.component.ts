import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskServiceService } from 'src/app/Services/task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  show : boolean = true;
  TaskDetails: any = [];
  TaskDetail: any;
  deleteData: any;
  updateData: any;
  updateAllData:any = [];

  updateTaskForm! : FormGroup;
  
  constructor(private taskService: TaskServiceService,
              private formBuilder : FormBuilder) { 
              
              this.updateTaskForm = this.formBuilder.group({
                  assignedTo:[''],
                  statusData:[''],
                  dueDate:[''],
                  priorityWise:[''],
                  descriptionData:['']
                  })
              }
  
  ngOnInit(): void { 
    this.getData();
  }
  openRegistration(){
    this.show; 
  }

  getData(){
    this.taskService.fetchTask().subscribe((data:any)=>{
      console.log("Fetching All data in list", data);
        this.TaskDetails = data;
      console.log("All Task Data,,,", this.TaskDetails)
    })   
  }

  editProfile(data :any){
    console.log(data); 
    this.updateData = data;
    this.updateTaskForm.patchValue(this.updateData);
  }

  onUpdateData():void{
    const body = {
      id: this.updateTaskForm.value.id,
      assignedTo: this.updateTaskForm.value.assignedTo, 
      statusData: this.updateTaskForm.value.statusData,
      dueDate: this.updateTaskForm.value.dueDate,
      priorityWise: this.updateTaskForm.value.priorityWise,
      descriptionData: this.updateTaskForm.value.descriptionData
    };
    this.taskService.updateTask(body, this.updateData.id).subscribe((result: any)=>{
      this.updateAllData = result;
      this.showMessage();
      this.updateTaskForm.reset();
    });
    this.getData();
  }

showMessage():void{
  alert("UPadte data.....")
}

  openModal(task : any):void{
      this.TaskDetail = task;
  }

 DeleteMessage(id: any):void{
    this.taskService.deleteTask(id).subscribe((data: any)=>{
      console.log("Deletd data", this.deleteData)
    })
    this.getData();
 }

}
