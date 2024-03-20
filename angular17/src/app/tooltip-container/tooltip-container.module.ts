import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipContainerComponent } from './tooltip-container.component';

@NgModule({
  declarations: [
    TooltipContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TooltipContainerComponent,
  ],
})
export class TooltipContainerModule {
}
