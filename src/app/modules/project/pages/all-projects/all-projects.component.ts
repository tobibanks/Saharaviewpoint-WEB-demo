import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvpButtonModule } from '../../../../shared/components/buttons/btn.module';
import { SvpTypographyModule } from '../../../../shared/components/typography/typography.module';
import { SvpUtilityModule } from '../../../../shared/components/utilities/utility.module';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, SvpButtonModule, SvpTypographyModule, SvpUtilityModule]
})
export class AllProjectsComponent implements OnInit { 
  constructor() {}

  ngOnInit(): void {}
}
