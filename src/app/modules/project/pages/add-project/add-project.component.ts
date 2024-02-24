import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvpButtonModule } from '../../../../shared/components/buttons/btn.module';
import { SvpTypographyModule } from '../../../../shared/components/typography/typography.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvpFormInputModule } from '../../../../shared/components/input-fields/form-input.module';
import { CommonModule, NgFor } from '@angular/common';
import { ProjectService } from '../../../../shared/services/project.service';
import { ProjectTypeModel } from '../../../../shared/models/api-response-models/project/project-type.model';
import { Result } from '../../../../shared/models/api-response-models/Result';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule, 
    SvpButtonModule, 
    SvpTypographyModule,
    ReactiveFormsModule,
    SvpFormInputModule,
    NgFor,
  ]
})
export class AddProjectComponent implements OnInit { 
  projectForm!: FormGroup;
  projectTypes: ProjectTypeModel[] = [];
  
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.getProjectTypes();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      title: ['My first project', Validators.compose([Validators.required, Validators.minLength(10)])],
      size: ['54 x 23 x 12'],
      dueDate: ['07/05/2024'],
      location: ['Abuja'],
      description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'],
      type: ['5 Bedroom Duplex'],
      budget: [40000000],
      surroundingFacilities: ['Shoprite'],
      design: []
    });
  }

  getProjectTypes(): void{
    this.projectService.listTypes().subscribe((res: Result<ProjectTypeModel[]>) => {
      if (res.success) {
        this.projectTypes = res.content ?? [];
        console.table(this.projectTypes);
      } else {
        this.notify.errorMessage(res.title, res.message);
      }
    });
  }

  submitForm() {
    // get param
    let param = Object.assign({}, this.projectForm.value);
    console.log('--> Params: ', param);
  }

  // filesChanged(files: File[]): void {
  //   console.log('--> Files changed event received: ', files);
  // }
}