export interface ProjectModel {
  id: number;
  title: string;
  description: string;
  status: string;
  startDate: Date;
  dueDate: Date;
  isPriority: boolean;
  order: number;
  assignedId?: number;
  assignee?: ProjectUserModel;
  createdBy?: ProjectUserModel;
}

export class ProjectUserModel {
  id!: number;
  firstName!: string;
  lastName!: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}