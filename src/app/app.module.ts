import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './world/components/grid/grid.component';
import { WorldControlsComponent } from './world/components/world-controls/world-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    WorldControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
