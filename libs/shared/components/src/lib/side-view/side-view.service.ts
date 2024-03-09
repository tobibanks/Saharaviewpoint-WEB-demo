import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SideViewService {
  _isActive = false;
  private _component: any;

  showComponent(component: any) {
    this._component = component;
    this._isActive = true;
  }

  getComponent() {
    return this._component;
  }

  get isActive() {
    return this._isActive;
  }

  closeSideView() {
    this._isActive = false;
    this._component = null;
  }
}
