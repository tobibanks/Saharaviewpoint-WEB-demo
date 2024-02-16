import { NgModule } from "@angular/core";
import { SvpCheckboxComponent } from "./svp-checkbox.component";
import { SvpValidationErrorsComponent } from "./svp-validation-errors.component";
import { SvpLabelComponent } from "./svp-label.component";

@NgModule({
  imports: [
    SvpCheckboxComponent,
    SvpValidationErrorsComponent,
    SvpLabelComponent,
    // SvpInputComponent,
    // SvpTextAreaComponent
  ],
  exports: [
    SvpCheckboxComponent,
    SvpValidationErrorsComponent,
    SvpLabelComponent,
    // SvpInputComponent,
    // SvpTextAreaComponent
  ]
})
export class SvpFormInputModule {}