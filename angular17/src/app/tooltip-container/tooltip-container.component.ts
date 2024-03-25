import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventContentArg } from '@fullcalendar/core';

@Component({
  selector: 'app-tooltip-container',
  templateUrl: './tooltip-container.component.html',
  styleUrl: './tooltip-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipContainerComponent implements OnInit, OnChanges {
  @Input({required: true}) selectedEvent!: EventContentArg; // TODO: should be a different type

  timeText: string = '';
  title: string = '';
  description: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEvent']) {
      this.timeText = this.selectedEvent.timeText;
      this.title = this.selectedEvent.event.title;

      // TODO: should not need to traverse into extendedProps like this
      this.description = this.selectedEvent.event.extendedProps['description'];
    }
  }

  ngOnInit() {
    // console.log('TooltipContainerComponent initialized, selectedEvent:', this.selectedEvent);
  }
}
