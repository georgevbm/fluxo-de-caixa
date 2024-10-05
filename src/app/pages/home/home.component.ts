import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  get formErrors() {
    return (
      this.form.controls['description'].errors ||
      this.form.controls['value'].errors ||
      this.form.controls['type'].errors
    );
  }

  private createForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  save() {
    console.log(this.form.value);
  }
}
