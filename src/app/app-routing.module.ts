import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { TaskFormComponent } from './Components/task-form/task-form.component';

const routes: Routes = [
  { path: '',component: TaskListComponent,  children:[
    { path: '', redirectTo:'list-task', pathMatch:'full'},
    { path: 'list-task', component: TaskListComponent },
    { path: 'form-task', component : TaskFormComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
