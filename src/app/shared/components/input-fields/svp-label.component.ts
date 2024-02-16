import { CommonModule } from "@angular/common";
import { Component, Input, input } from "@angular/core";

@Component({
  selector: 'label[svp-label]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="text-gray-900 font-medium">
      <ng-content></ng-content>
    </label>
  `
})
export class SvpLabelComponent {
  // @Input({required: true}) svpFor: string = '';
}