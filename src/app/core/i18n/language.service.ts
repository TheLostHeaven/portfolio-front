import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'app_language';
  private langSubject = new BehaviorSubject<Language>(this.getStoredLang());

  lang$ = this.langSubject.asObservable();

  get currentLang(): Language {
    return this.langSubject.value;
  }

  switchLanguage(): void {
    const next: Language = this.currentLang === 'es' ? 'en' : 'es';
    this.setLanguage(next);
  }

  setLanguage(lang: Language): void {
    this.langSubject.next(lang);
    try {
      localStorage.setItem(this.STORAGE_KEY, lang);
    } catch {}
  }

  private getStoredLang(): Language {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'en' || stored === 'es') return stored;
    } catch {}
    return 'es';
  }
}
