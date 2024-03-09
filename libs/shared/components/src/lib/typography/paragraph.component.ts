import { CommonModule } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'p[svp-text]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-base text-gray-600 dark:text-night-100"
      [ngClass]="{
          'font-bold': bold,
          'font-medium': medium
        }"
    ><ng-content></ng-content></p>
  `
})
export class SvpParagraphComponent {
  @Input({transform: booleanAttribute}) bold = false;
  @Input({transform: booleanAttribute}) medium = false;
}