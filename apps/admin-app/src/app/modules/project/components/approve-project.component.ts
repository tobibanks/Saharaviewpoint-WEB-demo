import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SvpButtonModule, SvpFormInputModule, SvpTypographyModule, SvpUtilityModule } from "@svp-components";
import { AngularSvgIconModule } from "angular-svg-icon";
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'svp-approve-project',
  standalone: true,
  imports: [
    SvpButtonModule,
    CommonModule,
    SvpUtilityModule,
    SvpTypographyModule,
    AngularSvgIconModule, SvpFormInputModule,
    NgSelectModule
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