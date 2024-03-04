import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'p[svp-text]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-base text-gray-600 dark:text-night-100"><ng-content></ng-content></p>
  `
})
export class SvpParagraphComponent {}