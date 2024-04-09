import { Component } from '@angular/core';
import {Subject} from "rxjs";
import {LoaderService} from "../../../services/loadeerService/loader.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-app-loader',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './app-loader.component.html',
  styleUrl: './app-loader.component.scss'
})
export class AppLoaderComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService){}
}
