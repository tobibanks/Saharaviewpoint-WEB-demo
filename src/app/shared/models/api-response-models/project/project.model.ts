export interface ProjectModel {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  isPriority: boolean;
  order: number;
  assignedId?: number;
  assignee?: ProjectUserModel;
  createdBy?: ProjectUserModel;
}

export interface ProjectUserModel {
  id: number;
  firstName: string;
  lastName: string;
}