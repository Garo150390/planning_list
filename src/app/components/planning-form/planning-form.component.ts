import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PlanningDataModel } from '../../core/models';

@Component({
  selector: 'app-planning-form',
  templateUrl: './planning-form.component.html',
  styleUrls: ['./planning-form.component.scss']
})
export class PlanningFormComponent implements OnInit {
  public addPlanningForm: FormGroup;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = true;
  public enableMeridian = false;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disableMinute = false;
  public hideTime = false;

  @Output() planningData = new EventEmitter<PlanningDataModel>();

  constructor() { }

  ngOnInit(): void {
    this.addPlanningForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      place: new FormControl('', [
        Validators.required,
      ]),
      address: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      date: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public submitForm(): void {
    if (this.addPlanningForm.invalid) {

      this.validateAllFormFields(this.addPlanningForm);
    } else {
      const data = this.addPlanningForm.getRawValue();
      this.planningData.emit({ ...data, status: 'placed', date: data.date.toISOString() });
      this.addPlanningForm.reset();
    }
  }

}
