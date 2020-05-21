import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdduserComponent} from './components/adduser/adduser.component';
import {AddprojectComponent} from './components/addproject/addproject.component';
import {AddtaskComponent} from './components/addtask/addtask.component';
import {RefreshComponent} from './components/refresh/refresh.component';
import {ViewtaskComponent} from './components/viewtask/viewtask.component';
import {EdittaskComponent} from './components/edittask/edittask.component';


const appRoutes: Routes = [
  {
    path: 'adduser',
    component: AdduserComponent
  },
  {
    path: 'addproject', component: AddprojectComponent
  },
  {path: 'addtask', component: AddtaskComponent},
  {path: 'refresh', component: RefreshComponent },
  {path: 'viewtask', component: ViewtaskComponent},
  {path: 'edittask', component: EdittaskComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
