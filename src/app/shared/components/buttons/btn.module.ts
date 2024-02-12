import { NgModule } from "@angular/core";
import { SvpNeutralButtonComponent } from "./btn-neutral.component";
import { SvpPrimaryButtonComponent } from "./btn-primary.component";

@NgModule({
  imports: [
    SvpPrimaryButtonComponent,
    SvpNeutralButtonComponent
  ],
  exports: [
    SvpPrimaryButtonComponent,
    SvpNeutralButtonComponent
  ]
})
export class SvpButtonModule {}