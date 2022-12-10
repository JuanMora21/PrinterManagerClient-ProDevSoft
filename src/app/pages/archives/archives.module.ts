import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivesRoutingModule } from './archives-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ArchivesRoutingModule,
    FormsModule
  ]
})
export class ArchivesModule { }
