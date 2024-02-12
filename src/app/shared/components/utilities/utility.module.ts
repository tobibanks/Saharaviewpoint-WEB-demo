import { NgModule } from "@angular/core";
import { SvpAnchorComponent } from "./svp-anchor.component";
import { SvpCardSelectorComponent } from "./svp-card-selector.component";

@NgModule({
  imports: [
    SvpAnchorComponent,
    SvpCardSelectorComponent
  ],
  exports: [
    SvpAnchorComponent,
    SvpCardSelectorComponent
  ]
})
export class SvpUtilityModule {}