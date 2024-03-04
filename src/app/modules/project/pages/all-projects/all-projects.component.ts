import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvpButtonModule } from '../../../../shared/components/buttons/btn.module';
import { SvpTypographyModule } from '../../../../shared/components/typography/typography.module';
import { SvpUtilityModule } from '../../../../shared/components/utilities/utility.module';
import { ProjectModel } from '../../../../shared/models/api-response-models/project/project.model';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ProjectService } from '../../../../shared/services/project.service';
import { Result } from '../../../../shared/models/api-response-models/Result';
import { NxDropdownModule } from '../../../../shared/directives/nx-dropdown/nx-dropdown.module';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    SvpButtonModule,
    SvpTypographyModule,
    SvpUtilityModule, CommonModule, NxDropdownModule
  ],
})
export class AllProjectsComponent implements OnInit {
  allProjects: ProjectModel[] = [];
  // [
  //   {
  //     id: 1,
  //     title: 'First Project',
  //     description: 'Just another sample description',
  //     status: 'Pending',
  //     dueDate: new Date(),
  //     isPriority: true,
  //     order: 1,
  //   },
  //   {
  //     id: 2,
  //     title: 'Second Project',
  //     description: 'Just another sample description',
  //     status: 'Pending',
  //     dueDate: new Date(),
  //     isPriority: false,
  //     order: 2,
      
  //   }
  // ];
  
  constructor(
    private projectService: ProjectService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
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
