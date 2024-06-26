import { NgModule } from "@angular/core";
import { SvpNeutralButtonComponent } from "./btn-neutral.component";
import { SvpPrimaryButtonComponent } from "./btn-primary.component";
import { SvpAnchorNeutralButtonComponent } from "./anchor-neutral.component";

@NgModule({
  imports: [
    SvpPrimaryButtonComponent,
    SvpNeutralButtonComponent,
    SvpAnchorNeutralButtonComponent,
  ],
  exports: [
    SvpPrimaryButtonComponent,
    SvpNeutralButtonComponent,
    SvpAnchorNeutralButtonComponent
  ]
})
export class SvpButtonModule {}