import { NgModule } from "@angular/core";
import { SvpCheckboxComponent } from "./svp-checkbox.component";
import { SvpValidationErrorsComponent } from "./svp-validation-errors.component";
import { SvpLabelComponent } from "./svp-label.component";
import { SvpFileSelector } from "./svp-file-selector.component";

@NgModule({
  imports: [
    SvpCheckboxComponent,
    SvpValidationErrorsComponent,
    SvpLabelComponent,
    SvpFileSelector
    // SvpInputComponent,
    // SvpTextAreaComponent
  ],
  exports: [
    SvpCheckboxComponent,
    SvpValidationErrorsComponent,
    SvpLabelComponent,
    SvpFileSelector
    // SvpInputComponent,
    // SvpTextAreaComponent
  ]
})
export class SvpFormInputModule {}