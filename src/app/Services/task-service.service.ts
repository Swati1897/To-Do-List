import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
   
  private TaskURL: string='http://localhost:3000/posts';

  constructor(private http: HttpClient) { }
  
  fetchTask(){
    return this.http.get(`${this.TaskURL}`,{
      headers:{
        'content-type': 'application/json',
      }
    })
  }

  addTask(task_data: any){
    return this.http.post(`${this.TaskURL}`, task_data);
  }

}
