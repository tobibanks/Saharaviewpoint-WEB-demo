import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvpButtonModule } from '../../../../shared/components/buttons/btn.module';
import { SvpTypographyModule } from '../../../../shared/components/typography/typography.module';
import { Result } from '../../../../shared/models/api-response-models/Result';
import { ProjectModel } from '../../../../shared/models/api-response-models/project/project.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ProjectService } from '../../../../shared/services/project.service';
import { SvpUtilityModule } from '../../../../shared/components/utilities/utility.module';
import { CommonModule } from '@angular/common';
import { ProjectStatusEnum } from '../../../../shared/enums/ProjectStatusEnum';
import { SvpDashboardCardComponent } from '../../../../shared/components/utilities/dashboard-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    SvpButtonModule,
    SvpTypographyModule,
    SvpUtilityModule,
    CommonModule,
    SvpDashboardCardComponent
  ],
})
export class HomeComponent implements OnInit {
  projectStatusEnum = ProjectStatusEnum;

  projectCount: number = 0;
  allTasks: number = 0;
  allReports: number = 0;
  newMessages: number = 0;
  allProjects: ProjectModel[] | null = [];

  constructor(
    public projectService: ProjectService,
    private notify: NotificationService,
    private router: Router
  ) {
    this.projectService.allProjects.subscribe((projects: ProjectModel[]) => {
      this.allProjects = projects;
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    this.getProjectCount();
  }

  loadProjects(): void {
    this.notify.showLoader();

    this.projectService
      .listProjects()
      .subscribe(async (res: Result<ProjectModel[]>) => {
        this.notify.hideLoader();

        if (res.success) {
          this.allProjects = res.content ?? [];
        } else {
          this.notify.timedErrorMessage(res.title, res.message);
        }
      });
  }

  getProjectCount(): void {
    this.notify.showLoader();

    this.projectService
      .countProjects()
      .subscribe(async (res: Result<number>) => {
        this.notify.hideLoader();

        if (res.success) {
          this.projectCount = res.content ?? 0;
        } else {
          this.notify.timedErrorMessage(res.title, res.message);
        }
      });
  }

  navigateTo(route: string): void {
    console.log('navigateTo', route);
    this.router.navigate([route]);
  }
}
