import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  HostListener,
} from '@angular/core';
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

  // Mouse coordinates
  mouseX = 0;
  mouseY = 0;
  mouseZ = 0;

  private langSub!: Subscription;

  ngOnInit(): void {
    this.langSub = this.languageService.lang$.subscribe((lang) => {
      this.config = getHomeConfig(lang);
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    // Normalize coordinates to look like spatial coords
    this.mouseX = +(
      ((event.clientX / window.innerWidth) * 100 - 50) *
      0.5
    ).toFixed(3);
    this.mouseY = +(
      ((event.clientY / window.innerHeight) * 100 - 50) *
      -0.9
    ).toFixed(3);
    // Z simulates depth based on distance from center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dist = Math.sqrt(
      Math.pow(event.clientX - centerX, 2) +
        Math.pow(event.clientY - centerY, 2)
    );
    this.mouseZ = +((dist / window.innerWidth) * 20).toFixed(3);
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
