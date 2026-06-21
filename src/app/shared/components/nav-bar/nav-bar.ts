import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@core/i18n/language.service';
import { getNavBarConfig } from './config/nav-bar.config';

@Component({
  standalone: false,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit, OnDestroy {
  config = getNavBarConfig(this.languageService.currentLang);
  currentLang = this.languageService.currentLang;

  private langSub!: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.langSub = this.languageService.lang$.subscribe((lang) => {
      this.config = getNavBarConfig(lang);
      this.currentLang = lang;
    });
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  switchLanguage(): void {
    this.languageService.switchLanguage();
  }
}
