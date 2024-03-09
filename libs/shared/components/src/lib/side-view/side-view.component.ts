import { CommonModule } from "@angular/common";
import { Component, Injectable, inject } from "@angular/core";
import { SideViewService } from "./side-view.service";

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'svp-side-view',
  standalone: true,
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss'],
  imports: [CommonModule],
})
export class SideViewComponent  {
  sideViewService = inject(SideViewService);
  isActive = inject(SideViewService).isActive;

  get component() {
    console.log('--> Getting component: ', this.sideViewService.getComponent())
    return this.sideViewService.getComponent();
  }
  
  closeSideView() {
    this.sideViewService.closeSideView();
  }
}