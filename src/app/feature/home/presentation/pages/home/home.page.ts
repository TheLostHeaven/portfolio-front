import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@core/i18n/language.service';
import { getHomeConfig } from '../../../config/home.config';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  private languageService = inject(LanguageService);

  config = getHomeConfig(this.languageService.currentLang);

  private langSub!: Subscription;

  ngOnInit(): void {
    this.langSub = this.languageService.lang$.subscribe((lang) => {
      this.config = getHomeConfig(lang);
    });
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
