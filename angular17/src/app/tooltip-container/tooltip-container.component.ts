import { Component, Input, OnInit } from '@angular/core';
import { EventContentArg } from '@fullcalendar/core';

@Component({
  selector: 'app-tooltip-container',
  templateUrl: './tooltip-container.component.html',
  styleUrl: './tooltip-container.component.scss',
})
export class TooltipContainerComponent implements OnInit {
  @Input({required: true}) selectedEvent!: EventContentArg;

  ngOnInit() {
    // console.log('TooltipContainerComponent initialized, selectedEvent:', this.selectedEvent);
  }
}
