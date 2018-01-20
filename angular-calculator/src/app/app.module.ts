import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BasicOperationService } from './shared/basic-operation.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BasicOperationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
