import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models/api-response-models/Result';
import { ProjectTypeModel } from '../models/api-response-models/project/project-type.model';
import { ProjectModel } from '../models/api-response-models/project/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  // #region PROJECTS
  listProjects(): Observable<Result<ProjectModel[]>> {
    return this.http.get<Result<ProjectModel[]>>(`projects`);
  }

  createProject(param: any): Observable<Result<ProjectModel>> {
    return this.http.post<Result<ProjectModel>>(`projects`, param);
  }

  getProject(id: number): Observable<Result<ProjectModel>> {
    return this.http.get<Result<ProjectModel>>(`projects/${id}`);
  }

  updateProject(id: number, param: any): Observable<Result<ProjectModel>> {
    return this.http.put<Result<ProjectModel>>(`projects/${id}`, param);
  }

  deleteProject(id: number): Observable<Result<any>> {
    return this.http.delete<Result<any>>(`projects/${id}`);
  }

  reAssignProject(id: number, param: any): Observable<Result<any>> {
    return this.http.post<Result<any>>(`projects/${id}/reassign`, param);
  }
  // #endregion

  // #region TYPES
  listTypes(): Observable<Result<ProjectTypeModel[]>> {
    return this.http.get<Result<ProjectTypeModel[]>>(`projects/types`);
  }

  addType(param: any): Observable<Result<ProjectTypeModel>> {
    return this.http.post<Result<ProjectTypeModel>>(`projects/types`, param);
  }

  deleteType(id: number): Observable<Result<any>> {
    return this.http.delete<Result<any>>(`projects/types/${id}`);
  }
  // #endregion
}
