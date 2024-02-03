import { CommonModule } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'svp-btn-primary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button type="button" class="group relative flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:bg-primary-400" [ngClass]="{'w-full': isFullWidth}">
      <span class="group-hover:text-primary-50">
          <i *ngIf="icon" class="{{icon}} mr-2 icon"></i>
          {{text}}
      </span>
    </button> 
  `,
  styles: [`
    .icon {
      transition: transform 0.3s ease-in-out;
    }

    .group:hover .icon {
      transform: scale(1.1);
    }
  `]
})
export class SvpPrimaryButtonComponent {
  @Input({required: true}) text!: string;
  @Input() icon!: string;
  @Input({transform: booleanAttribute}) isFullWidth!: boolean;
  @Input() routerLink: string = ' ';
}