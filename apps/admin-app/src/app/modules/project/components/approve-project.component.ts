import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SvpButtonModule } from "@svp-components";

@Component({
  selector: 'svp-approve-project',
  standalone: true,
  imports: [SvpButtonModule],
  template: `
    <div class="p-10 h-ful w-ful bg-white"> Project Approval Page {{id}} <button svp-primary (click)="close()" >Close</button> </div>
  `
})
export class ApproveProjectComponent {
  @Input() id!: number;

  @Output() exit = new EventEmitter();

  close() {
    this.exit.emit();
  }
}