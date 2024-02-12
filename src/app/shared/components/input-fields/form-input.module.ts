import { NgModule } from "@angular/core";
import { SvpCheckboxComponent } from "./svp-checkbox.component";
import { SvpInputComponent } from "./svp-input.component";
import { SvpValidationErrorsComponent } from "./svp-validation-errors.component";
import { SvpTextAreaComponent } from "./svp-textarea.component";

@NgModule({
  imports: [
    SvpCheckboxComponent,
    SvpInputComponent,
    SvpValidationErrorsComponent,
    SvpTextAreaComponent
  ],
  exports: [
    SvpCheckboxComponent,
    SvpInputComponent,
    SvpValidationErrorsComponent,
    SvpTextAreaComponent
  ]
})
export class SvpFormInputModule {}