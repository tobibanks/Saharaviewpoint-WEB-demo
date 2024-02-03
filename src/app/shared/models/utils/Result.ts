import { Paging } from "./Paging";

export interface Result {
  code: string;
  content: any;
  detail: string;
  instance: string;
  message: string;
  path: string;
  status: number;
  success: boolean;
  title: string;
  type: number;
  validationErrors: any;
  paging: Paging;
}