import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdduserComponent} from './components/adduser/adduser.component';
import {AddprojectComponent} from './components/addproject/addproject.component';


const appRoutes: Routes = [
  {
    path: 'adduser',
    component: AdduserComponent
  },
  {
    path: 'addproject', component: AddprojectComponent
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
