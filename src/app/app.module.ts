import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Ng5SliderModule} from 'ng5-slider';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {DatePipe} from '@angular/common';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AdduserComponent} from './components/adduser/adduser.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ListuserComponent } from './components/listuser/listuser.component';
import { AddprojectComponent } from './components/addproject/addproject.component';
import { ListprojectComponent } from './components/listproject/listproject.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { ViewtaskComponent } from './components/viewtask/viewtask.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    HeaderComponent,
    ListuserComponent,
    AddprojectComponent,
    ListprojectComponent,
    AddtaskComponent,
    RefreshComponent,
    ViewtaskComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule, AppRoutingModule, Ng5SliderModule, HttpClientModule, ModalModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
