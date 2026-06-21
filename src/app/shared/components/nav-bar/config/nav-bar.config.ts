import { Language } from '@core/i18n/language.service';
import { navBarConfigEs } from './nav-bar.config.es';
import { navBarConfigEn } from './nav-bar.config.en';

const navBarConfigs: Record<Language, typeof navBarConfigEs> = {
  es: navBarConfigEs,
  en: navBarConfigEn,
};

export function getNavBarConfig(lang: Language) {
  return navBarConfigs[lang];
}
