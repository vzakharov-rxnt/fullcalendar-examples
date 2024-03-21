import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event-popup',
  templateUrl: './add-event-popup.component.html',
  styleUrl: './add-event-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEventPopupComponent implements OnChanges, OnInit {
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();

  @Output() onSubmit = new EventEmitter<IAddEventPopupForm>();

  eventForm!: FormGroup;
  showInternal: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      this.showInternal = this.show;
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  visibleChange($event: boolean) {
    this.showInternal = $event;
    this.showChange.emit($event);
  }

  cancelPopup() {
    this.visibleChange(false);
  }

  submit() {
    this.onSubmit.emit(this.eventForm.value);
    this.visibleChange(false);
  }

  private createForm() {
    this.eventForm = this.fb.group({
      title: [ '', Validators.required ],
      description: [ '' ],
    });
  }
}

export interface IAddEventPopupForm {
  title: string;
  description: string;
}
