import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventContentArg, EventInput,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipContainerModule } from './tooltip-container/tooltip-container.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, FullCalendarModule, TooltipModule, OverlayPanelModule, TooltipContainerModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      resourceTimelinePlugin,
      resourceTimeGridPlugin,
      scrollGridPlugin,
    ],
    slotDuration: '00:05:00',
    // slotLabelInterval: '00:05:00', // do we need it ? I think it's fine with default
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'lowercase',
    },
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'resourceTimeline,resourceTimeGrid,timeGridDay,timeGridWeek,dayGridMonth',
    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      resourceTimeGrid: 'Resources View',
      resourceTimeline: 'Timeline',
    },
    initialView: 'timeGridDay',
    height: '100%',
    // weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // dayMinWidth: 300, // only works if too many resources, otherwise columns get equal split
    views: {
      dayGridMonth: {
        dayMaxEvents: 2, // then will show +1 more
        // moreLinkText: function(moreEventsCount: number) {
        //   return moreEventsCount + " Appointments"; // Customize the text as needed
        // }
      },
      resourceTimeGrid: {
        dayMinWidth: 300, // only works if too many resources, otherwise columns get equal split
      },
    },
    allDayText: 'All-Day',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    resources: [ // Define your resources here
      {id: 'a', title: 'Resource A'},
      {id: 'b', title: 'Resource B'},
      {id: 'c', title: 'Resource C'},
      {id: 'd', title: 'Resource D'},
      {id: 'e', title: 'Resource E'},
      {id: 'f', title: 'Resource F'},
      {id: 'g', title: 'Resource G'},
      {id: 'h', title: 'Resource H'},
      {id: 'i', title: 'Resource I'},
      {id: 'j', title: 'Resource J'},
      {id: 'k', title: 'Resource K'},
      {id: 'l', title: 'Resource L'},
      {id: 'm', title: 'Resource M'},
      {id: 'n', title: 'Resource N'},
      {id: 'o', title: 'Resource O'},
      {id: 'p', title: 'Resource P'},
      {id: 'q', title: 'Resource Q'},
      {id: 'r', title: 'Resource R'},
      {id: 's', title: 'Resource S'},
      {id: 't', title: 'Resource T'},
      {id: 'u', title: 'Resource U'},
      {id: 'v', title: 'Resource V'},
      {id: 'w', title: 'Resource W'},
      {id: 'x', title: 'Resource X'},
      {id: 'y', title: 'Resource Y'},
      {id: 'z', title: 'Resource Z'},

      // Add more resources as needed
    ],
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });

  selectedEvent: EventContentArg | null = null;
  initialEvents: EventInput[] = INITIAL_EVENTS;
  currentEvents: EventInput[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) {
    this.currentEvents = this.initialEvents;
  }

  showOverlay(event: MouseEvent, eventData: EventContentArg, overlayPanel: OverlayPanel) {
    this.selectedEvent = eventData;
    overlayPanel.show(event);
  }

  hideOverlay(overlayPanel: OverlayPanel) {
    overlayPanel.hide();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    let resourceId = '';
    if (selectInfo.resource) {
      resourceId = selectInfo.resource.id;
    }

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        resourceId: resourceId,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(fullCalendarEvents: EventApi[]) {
    this.currentEvents = fullCalendarEvents.map(event => ({
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      ...event.extendedProps,
    }));

    console.log('this.currentEvents', this.currentEvents); // TODO: remove when done

    this.changeDetector.detectChanges(); // workaround for expressionChangedAfterItHasBeenCheckedError
  }
}
