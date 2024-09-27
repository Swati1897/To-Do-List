import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
   
  private taskURL: string='http://localhost:3000/posts';

  constructor(private http: HttpClient) { }
  
  fetchTask(){
    return this.http.get(`${this.taskURL}`,{
      headers:{
        'content-type': 'application/json',
      }
    })
  }

  addTask(task_data: any){
    return this.http.post(`${this.taskURL}`, task_data);
    }

  updateTask(taskBody: any, id:number):Observable<any>{
    return this.http.put(`${this.taskURL}/${id}`, taskBody);
    }

  deleteTask(id :number){
    return this.http.delete(`${this.taskURL}/${id}`)
    }
 
}
