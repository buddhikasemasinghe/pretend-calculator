import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasicOperationService } from './shared/basic-operation.service';
import { DisplayService } from './shared/display.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BasicOperationService, DisplayService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
