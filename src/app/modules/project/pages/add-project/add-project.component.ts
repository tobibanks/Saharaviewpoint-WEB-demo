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
import { Observable, Subject, catchError, concat, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { SvpAnchorComponent } from '../../../../shared/components/utilities/svp-anchor.component';
import { ProjectModel } from '../../../../shared/models/api-response-models/project/project.model';
import { HttpErrorResponse } from '@angular/common/http';
import { mapValidationErrors } from '../../../../shared/components/utilities/map-validation-errors.utility';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule, 
    SvpAnchorComponent,
    SvpButtonModule, 
    SvpTypographyModule,
    ReactiveFormsModule,
    SvpFormInputModule,
    NgFor,
    NgSelectModule
  ]
})
export class AddProjectComponent implements OnInit { 
  projectForm!: FormGroup;
  projectTypes$: Observable<ProjectTypeModel[]> = new Observable<ProjectTypeModel[]>;
  projectTypeInput$ = new Subject<string>();
  projectTypeLoading = false;
  
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.loadProjectTypes();
  }

  initForm(): void {    
    this.projectForm = this.fb.group({
      title: ['My First Project'],
      size: ['54 x 23 x 12'],
      dueDate: [new Date(2024, 1, 20), Validators.required],
      location: ['Abuja'],
      description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'],
      type: [null, Validators.compose([Validators.required])],
      budget: [40000000],
      surroundingFacilities: ['Shoprite'],
      design: []
    });
  }
  
  private loadProjectTypes() {
    this.projectService.listTypes().pipe(
      switchMap((res: Result<ProjectTypeModel[]>) => {
        if (!res.success) {
          this.notify.timedErrorMessage('Unable to retrieve project types', res.message);
        }
        return of (res.content ?? []);
      })
    ).subscribe((defaultItems: ProjectTypeModel[]) => {
      this.projectTypes$ = concat(
        of(defaultItems.map((item) => item.name)),
        this.projectTypeInput$.pipe(
            distinctUntilChanged(),
            tap(() => this.projectTypeLoading = true),
            switchMap((term) => this.projectService.listTypes(term)
            .pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.projectTypeLoading = false)
            )),
          map((data: any) => data.content.map((item: any) => item.name))
        )
      );
    })        
  }

  submitForm() {
    if (!this.projectForm.valid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    
    let formParam = this.getFormValue();

    this.notify.showLoader();
    this.projectService.createProject(formParam)
      .subscribe({
        next: async (res: Result<ProjectModel>) => {
          this.notify.hideLoader();
          if (res.success) {
            this.notify.successMessage('Saved successfully');
          }
          else {
            this.notify.errorMessage(res.title, res.message);
          }
        },
        error: async (err: Result<any>) => {
          mapValidationErrors(this.projectForm, err.validationErrors);
          this.projectForm.markAllAsTouched();
        }
      })
  }

  getFormValue(): FormData {
    // get param
    let param = Object.assign({}, this.projectForm.value);
    console.log('--> Params: ', param);

    let formParam: FormData = new FormData();
    formParam.append('title', param.title);
    formParam.append('type', param.type);
    formParam.append('budget', param.budget);
    formParam.append('description', param.description);
    formParam.append('dueDate', param.dueDate);
    formParam.append('location', param.location);
    formParam.append('size', param.size);
    formParam.append('surroundingFacilities', param.surroundingFacilities);
    formParam.append('design', param.type);

    return formParam;
  }

  trackByFn(item: ProjectTypeModel) {
    return item.id;
  }
}