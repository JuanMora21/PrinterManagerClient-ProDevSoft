import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintersRoutingModule } from './printers-routing.module';
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
    PrintersRoutingModule,
    FormsModule
  ]
})
export class PrintersModule { }
