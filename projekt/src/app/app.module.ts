import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MaterialModule } from './shared/material.module';

import { CloneDeepPipe } from './shared/pipes/clone-deep.pipe';
import { CostPipe } from './shared/pipes/cost.pipe';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GraphSpaceComponent } from './components/graph-space/graph-space.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

import { facades, reducers } from './state';
import { BellmanFordService } from './services/bellman-ford.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GraphSpaceComponent,
    SideMenuComponent,
    CloneDeepPipe,
    CostPipe,
  ],
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxGraphModule,
  ],
  providers: [...facades, BellmanFordService],
  bootstrap: [AppComponent],
})
export class AppModule {}
