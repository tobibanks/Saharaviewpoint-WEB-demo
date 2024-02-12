import { CommonModule } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'div[svp-card-selector]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex space-x-2 items-center py-1 px-4 rounded-lg border-2 cursor-pointer"
        [ngClass]="{
            'bg-white text-gray-800 hover:bg-gray-300': isActive,
            'bg-transparent text-gray-800 border-2 border-gray-400 hover:bg-gray-200 hover:border-gray-200': !isActive,
            }">
        <ng-content></ng-content>
    </div>
  `
})
export class SvpCardSelectorComponent {
  @Input() icon!: string;
  @Input({transform: booleanAttribute}) isActive: boolean = false;
}