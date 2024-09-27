import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskServiceService } from 'src/app/Services/task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  // gobal declatation 
  public SHOW : boolean = true;
  public TASKDETAILS: any = [];
  public TASKDETAIL: any;
  public DELETEDATA: any;
  public UPDATEDATA: any;
  public UPDATEALLDATA:any = [];

  UPDATETASKFORM! : FormGroup;
  
  constructor(private taskService: TaskServiceService,
              private formBuilder : FormBuilder) { 
              
              this.UPDATETASKFORM = this.formBuilder.group({
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
    this.SHOW; 
  }

  getData(){
    this.taskService.fetchTask().subscribe((data:any)=>{
        this.TASKDETAILS = data;
      console.log("All Task Data..", this.TASKDETAILS)
    })   
  }

  editProfile(data :any){
    this.UPDATEDATA = data;
    this.UPDATETASKFORM.patchValue(this.UPDATEDATA);
  }

  onUpdateData():void{
    const BODY = {
      id: this.UPDATETASKFORM.value.id,
      assignedTo: this.UPDATETASKFORM.value.assignedTo, 
      statusData: this.UPDATETASKFORM.value.statusData,
      dueDate: this.UPDATETASKFORM.value.dueDate,
      priorityWise: this.UPDATETASKFORM.value.priorityWise,
      descriptionData: this.UPDATETASKFORM.value.descriptionData
    };
    this.taskService.updateTask(BODY, this.UPDATEDATA.id).subscribe((result: any)=>{
      this.UPDATEALLDATA = result;
      this.showMessage();
      this.UPDATETASKFORM.reset();
    });
    this.getData();
  }

showMessage():void{
  alert("Update data successfully !")
}

  openModal(task : any):void{
      this.TASKDETAIL = task;
  }

 deleteMessage(id: any):void{
    this.taskService.deleteTask(id).subscribe((data: any)=>{
      console.log("Deletd data", this.DELETEDATA)
    })
    this.getData();
 }

}
