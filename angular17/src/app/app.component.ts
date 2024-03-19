import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, FullCalendarModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      resourceTimelinePlugin,
      resourceTimeGridPlugin,
      scrollGridPlugin,
    ],
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
    initialView: 'resourceTimeGridDay',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    height: '100%', // TODO: works until an event is added, then it's ignored
    // weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    // dayMaxEvents: true,
    dayMinWidth: 300, // only works if too many resources, otherwise columns get equal split
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
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    console.log(selectInfo);
    calendarApi.unselect(); // clear date selection

    let resourceId = '';
    if (selectInfo.resource) { // TODO: type for selectInfo that has resource ?
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

      // TODO: below line does not do anything
      // calendarApi.setOption('height', '100%'); // workaround for height not being set
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
