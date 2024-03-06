import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models/api-response-models/Result';
import { ProjectTypeModel } from '../models/api-response-models/project/project-type.model';
import { ProjectModel } from '../models/api-response-models/project/project.model';
import { ProjectSearchModel } from '../models/api-input-models/project/project-search.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  // #region PROJECTS
  listProjects(param?: ProjectSearchModel): Observable<Result<ProjectModel[]>> {
    if (param == null) {
      param = new ProjectSearchModel();
    }
    
    let query = `searchQuery=${param.searchQuery || ''}
      &status=${param.status || ''}
      &startDueDate=${param.startDueDate || ''}
      &endDueDate=${param.endDueDate || ''}
      &priorityOnly=${param.priorityOnly}`;
    
    return this.http.get<Result<ProjectModel[]>>(`projects?${query}`);
  }

  createProject(param: FormData): Observable<Result<ProjectModel>> {
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
  listTypes(searchTerm?: string): Observable<Result<ProjectTypeModel[]>> {
    let query = searchTerm ? `?searchTerm=${searchTerm}` : '';
    return this.http.get<Result<ProjectTypeModel[]>>(`projects/types${query}`);
  }

  addType(param: any): Observable<Result<ProjectTypeModel>> {
    return this.http.post<Result<ProjectTypeModel>>(`projects/types`, param);
  }

  deleteType(id: number): Observable<Result<any>> {
    return this.http.delete<Result<any>>(`projects/types/${id}`);
  }
  // #endregion
}
