import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Launche } from '../../interfaces/launches.interface';

@Component({
  selector: 'app-form-launche',
  templateUrl: './form-launche.component.html',
  styleUrls: ['./form-launche.component.scss'],
})
export class FormLauncheComponent implements OnInit {
  @Input() showCancelButton = false;
  @Input() formData!: Launche;
  @Output() formDataEmit = new EventEmitter<Launche>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get descriptionControl() {
    return this.form.controls['description'];
  }

  get valueControl() {
    return this.form.controls['value'];
  }

  get typeControl() {
    return this.form.controls['type'];
  }

  ngOnInit() {
    this.createForm();

    this.setFormData('description');
    this.setFormData('value');
    this.setFormData('type');
  }

  get formErrors() {
    return (
      this.descriptionControl.errors ||
      this.valueControl.errors ||
      this.typeControl.errors
    );
  }

  private createForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  private setFormData(control: 'description' | 'value' | 'type') {
    this.formData
      ? this.form.controls[control].setValue(this.formData[control])
      : this.form.controls[control].setValue('');
  }
}
