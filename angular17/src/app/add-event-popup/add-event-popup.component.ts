import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
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

      if (this.show && this.eventForm) {
        this.eventForm.reset();
        this.setDefaultValue();
      }
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

  private setDefaultValue() {
    this.eventForm.setValue({
      title: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    });
  }

  private createForm() {
    this.eventForm = this.fb.group({
      title: [ '', Validators.required ],
      description: [ '' ],
    });

    this.setDefaultValue();
  }
}

export interface IAddEventPopupForm {
  title: string;
  description: string;
}
