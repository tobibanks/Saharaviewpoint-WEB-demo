import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { SidebarComponent, NavbarComponent, FooterComponent } from '@svp-layout';
import { Menu } from '../../core/constants/menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent],
})
export class LayoutComponent implements OnInit {
  private mainContent: HTMLElement | null = null;
  public Menu = Menu;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
  }
}
