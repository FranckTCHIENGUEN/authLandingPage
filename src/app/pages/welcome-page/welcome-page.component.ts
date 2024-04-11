import { Component } from '@angular/core';
import {AppLoaderComponent} from "../../components/app-loader/app-loader.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup
} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {AppService} from "../../../services/app.service";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    AppLoaderComponent,
    FormsModule,
    MatAnchor,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatMenu,
    MatMenuItem,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  favoriteSeason?: boolean;
  constructor(private appService:AppService, private router:Router) {
    sessionStorage.clear();
  }

  formSubmit() {
    this.appService.setOtpAuth(this.favoriteSeason!);
    this.router.navigate(['login'])
  }
}
