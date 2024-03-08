import { Injectable, signal } from '@angular/core';
import { LocalStorageUtility } from '../../../../../../libs/shared/utilities/src/lib/local-storage.utility';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public default = 'light';
  public themeChanged = signal(this.theme);

  constructor(private localStorage: LocalStorageUtility) {}

  public get theme(): string {
    return this.localStorage.get('theme') ?? this.default;
  }

  public set theme(value: string) {
    this.localStorage.set('theme', value);
    this.themeChanged.set(value);
  }

  public get isDark(): boolean {
    return this.theme == 'dark';
  }
}
