import { Component, Input } from "@angular/core";

@Component({
  selector: 'svp-approve-project',
  standalone: true,
  template: `
    <div class="m-10"> Project Approval Page {{id}} </div>
  `
})
export class ApproveProjectComponent {
  @Input() id!: number;
}