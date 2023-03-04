import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GraphSpaceComponent } from './components/graph-space/graph-space.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { simulationReducer } from './state/simulation/simulation.reducer';
import { reducers } from './state';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GraphSpaceComponent,
    SideMenuComponent,
  ],
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxGraphModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
