import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./loader.component";
import { InsertionDirective } from './insertion.directive';

@NgModule({
  declarations: [LoaderComponent, InsertionDirective],
  imports: [CommonModule],
})
export class LoaderModule {}
