import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvpButtonModule } from '../../../../shared/components/buttons/btn.module';
import { SvpTypographyModule } from '../../../../shared/components/typography/typography.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SvpFormInputModule } from '../../../../shared/components/input-fields/form-input.module';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  standalone: true,
  imports: [
    AngularSvgIconModule, 
    SvpButtonModule, 
    SvpTypographyModule,
    SvpFormInputModule,
  ]
})
export class AddProjectComponent implements OnInit { 
  projectForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      title: [''],
      location: [''],
      description: [''],
      type: [''],
      budget: [''],
      surroundingFacilities: [''],
    });
  }
}

// Title
// Location
// description
// project type
// project design and documentations
// project budget
// facilities surrounding the building