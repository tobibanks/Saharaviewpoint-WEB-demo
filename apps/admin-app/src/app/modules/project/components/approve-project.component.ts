import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SvpButtonModule, SvpTypographyModule, SvpUtilityModule } from "@svp-components";
import { AngularSvgIconModule } from "angular-svg-icon";

@Component({
  selector: 'svp-approve-project',
  standalone: true,
  imports: [
    SvpButtonModule,
    CommonModule,
    SvpUtilityModule,
    SvpTypographyModule,
    AngularSvgIconModule
  ],
  templateUrl: './approve-project.component.html'
})
export class ApproveProjectComponent {
  @Input() id!: number;

  @Output() exit = new EventEmitter();

  close() {
    this.exit.emit();
  }
}