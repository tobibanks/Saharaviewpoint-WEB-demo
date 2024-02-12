import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvpButtonModule } from '../../../../shared/components/buttons/btn.module';
import { SvpTypographyModule } from '../../../../shared/components/typography/typography.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, SvpButtonModule, SvpTypographyModule]
  })
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {}
}
