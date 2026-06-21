import { Language } from '@core/i18n/language.service';
import { homeConfigEs } from './home.config.es';
import { homeConfigEn } from './home.config.en';

const homeConfigs: Record<Language, typeof homeConfigEs> = {
  es: homeConfigEs,
  en: homeConfigEn,
};

export function getHomeConfig(lang: Language) {
  return homeConfigs[lang];
}
