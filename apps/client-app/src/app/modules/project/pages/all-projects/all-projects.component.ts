import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvpTypographyModule, SvpButtonModule } from '@svp-components';
import { SvpUtilityModule } from '../../../../../../../../libs/shared/components/src/lib/utilities/utility.module';
import { ProjectModel } from '../../../../shared/models/api-response-models/project/project.model';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ProjectService } from '../../../../shared/services/project.service';
import { Result } from '../../../../shared/models/api-response-models/Result';
import { NxDropdownModule } from '../../../../shared/directives/nx-dropdown/nx-dropdown.module';
import { FormsModule } from '@angular/forms';
import { ProjectStatusEnum } from '../../../../shared/enums/ProjectStatusEnum';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    SvpButtonModule,
    SvpTypographyModule,
    SvpUtilityModule, CommonModule, NxDropdownModule,
    FormsModule
  ],
})
export class AllProjectsComponent implements OnInit {
  projectStatusEnum = ProjectStatusEnum;

    // TODO: initialize allProjects as an empty array
  allProjects: ProjectModel[] | null = [];
  // [
  //   {
  //     id: 1,
  //     title: 'First Project',
  //     description: 'Just another sample description',
  //     status: 'InProgress',
  //     dueDate: new Date(),
  //     startDate: new Date(),
  //     isPriority: true,
  //     order: 1,
  //   },
  //   {
  //     id: 2,
  //     title: 'Second Project',
  //     description: 'Just another sample description',
  //     status: 'Completed',
  //     startDate: new Date(),
  //     dueDate: new Date(),
  //     isPriority: false,
  //     order: 2,
  //   }
  // ];
  
  constructor(
    public projectService: ProjectService,
    private notify: NotificationService
  ) {
    this.projectService.allProjects.subscribe((projects: ProjectModel[]) => {
      this.allProjects = projects;
    });
  }

  ngOnInit(): void {
    this.loadProjects(); // TODO: uncomment this line
  }

  loadProjects(): void {
    this.notify.showLoader();

    this.projectService.listProjects().subscribe(
      async (res: Result<ProjectModel[]>) => {
        this.notify.hideLoader();

        if (res.success) {
          this.allProjects = res.content ?? [];
        } 
        else {
          this.notify.timedErrorMessage(res.title, res.message);
        }
      }
    );
  }
}
