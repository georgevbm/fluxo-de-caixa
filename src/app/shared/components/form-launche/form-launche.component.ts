import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormLaunche } from '../../interfaces/form-launche.interface';

@Component({
  selector: 'app-form-launche',
  templateUrl: './form-launche.component.html',
  styleUrls: ['./form-launche.component.scss'],
})
export class FormLauncheComponent implements OnInit {
  @Input() showCancelButton = false;
  @Input() formData!: FormLaunche;
  @Output() formDataEmit = new EventEmitter<FormLaunche>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  get formErrors() {
    return (
      this.form.controls['description'].errors ||
      this.form.controls['valueInput'].errors ||
      this.form.controls['type'].errors
    );
  }

  private createForm() {
    this.form = this.fb.group({
      description: [this.setFormData('description'), Validators.required],
      valueInput: [this.setFormData('valueInput'), Validators.required],
      type: [this.setFormData('type'), Validators.required],
    });
  }

  private setFormData(control: 'description' | 'valueInput' | 'type') {
    return this.formData
      ? this.form.controls[control].setValue(this.formData[control])
      : '';
  }
}
