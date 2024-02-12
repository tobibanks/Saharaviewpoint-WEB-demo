import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'svp-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule, FormsModule],
  template: `
    <div class="relative mt-3" [formGroup]="svpForm">
      <textarea 
        id={{svpId}} 
        formControlName="{{svpId}}" 
        class="peer block dark:text-white"
        placeholder=" "
        autocomplete="{{svpAutoComplete}}"
        (change)="valueChanged.emit(svpForm.get(svpId)?.value)"
        (keyup)="keyUp.emit(svpForm.get(svpId)?.value)"
        [ngClass]="{ 'has-content': svpForm.get(svpId)?.value, 'has-focus': isFocused }"
        (focus)="isFocused = true"
        (blur)="isFocused = false"
      >
        <ng-content></ng-content>
      </textarea>

      <label
        for="{{svpId}}"
        class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-sm text-gray-500 duration-300 dark:bg-night-700 dark:text-night-200"
        [class.moved-up]="svpForm.get(svpId)?.value || isFocused"
      >
        {{svpLabel}}
      </label>
    </div>

  `
})
export class SvpTextAreaComponent {
  @Input({required: true}) svpId: string = '';
  @Input({required: true}) svpLabel: string = '';
  @Input() svpAutoComplete: 'on' | 'off' = 'on';
  @Input({required: true}) svpForm!: FormGroup;

  isFocused: boolean = false;

  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() keyUp: EventEmitter<any> = new EventEmitter<any>();
}