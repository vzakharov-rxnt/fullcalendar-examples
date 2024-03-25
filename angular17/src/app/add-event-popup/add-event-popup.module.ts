import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { AddEventPopupComponent } from './add-event-popup.component';

@NgModule({
  declarations: [
    AddEventPopupComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
  ],
  exports: [
    AddEventPopupComponent,
  ],
})
export class AddEventPopupModule {
}
