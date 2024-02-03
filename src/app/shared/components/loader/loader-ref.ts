import { Observable, Subject } from "rxjs";

export class LoaderRef {
  constructor() {}

  close(result?: any) {
    this._afterClosed.next(result);
  }

  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();

  update(data?: any) {
    this._onUpdate.next(data);
  }

  private readonly _onUpdate = new Subject<any>();
  onUpdate: Observable<any> = this._onUpdate.asObservable();
}
