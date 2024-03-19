import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SvpButtonModule, SvpFormInputModule, SvpTypographyModule } from "@svp-components";
import { AngularSvgIconModule } from "angular-svg-icon";

@Component({
  selector: 'app-add-pm',
  standalone: true,
  templateUrl: './add-pm.component.html',
  imports: [
    CommonModule,
    SvpButtonModule,
    SvpFormInputModule,
    SvpTypographyModule,
    AngularSvgIconModule,
    ReactiveFormsModule
  ],
})
export class AddPmComponent {
  @Output() exit = new EventEmitter();

  formBuilder = inject(FormBuilder);
  
  newPmForm!: FormGroup;

  initForm(): void {
    this.newPmForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
    });
  }
  
  addNewPM() {
    console.log('Adding project manager');
  }

  close() {
    this.exit.emit();
  }
}