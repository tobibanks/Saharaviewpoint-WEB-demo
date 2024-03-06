import { NgModule } from "@angular/core";
import { SvpAnchorComponent } from "./svp-anchor.component";
import { SvpCardSelectorComponent } from "./svp-card-selector.component";
import { SvpSearchButtonComponent } from "./search-button.component";

@NgModule({
  imports: [
    SvpAnchorComponent,
    SvpCardSelectorComponent,
    SvpSearchButtonComponent
  ],
  exports: [
    SvpAnchorComponent,
    SvpCardSelectorComponent,
    SvpSearchButtonComponent
  ]
})
export class SvpUtilityModule {}