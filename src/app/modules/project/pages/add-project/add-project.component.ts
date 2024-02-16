import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvpButtonModule } from '../../../../shared/components/buttons/btn.module';
import { SvpTypographyModule } from '../../../../shared/components/typography/typography.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvpFormInputModule } from '../../../../shared/components/input-fields/form-input.module';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  standalone: true,
  imports: [
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
  selectedFiles: any[] = [];
  
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      title: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      size: [''],
      dueDate: [''],
      location: [''],
      description: [''],
      type: [''],
      budget: [''],
      surroundingFacilities: [''],
    });
  }

   // Function to handle file selection
  handleFileInput(e: any): void {

    let files = e.target.files;
    if (files == null) return;
    
    this.selectedFiles.push(...Array.from(files));
  }

  // Function to remove a file from the selected files array
  removeFile(fileToRemove: File): void {
    this.selectedFiles = this.selectedFiles.filter(file => file !== fileToRemove);
  }
}