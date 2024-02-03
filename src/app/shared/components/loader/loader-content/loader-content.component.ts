import { Component, OnInit } from "@angular/core";
import { LoaderConfig } from "../loader-config";
import { LoaderRef } from "../loader-ref";

@Component({
  selector: "app-loader-content",
  standalone: true,
  templateUrl: "./loader-content.component.html",
  styleUrls: ["./loader-content.component.scss"],
})
export class LoaderContentComponent implements OnInit {
  message: string;

  constructor(public config: LoaderConfig, public loader: LoaderRef) {
    this.message = this.config.data.message;
  }

  ngOnInit() {
    this.loader.onUpdate.subscribe((data) => {
      this.message = data.message;
    });
  }

  onClose() {
    this.loader.close("some value");
  }
}
