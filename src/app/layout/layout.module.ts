import { CUSTOM_ELEMENTS_SCHEMA ,NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
//Import component reutilizables
import { LayoutComponent } from './layout.component';
import { NavBar } from '@shared/components/nav-bar/nav-bar';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
//Import modules
import { LayoutRoutingModule } from './layout-routing.module';

// import { ServiceProviderModule } from '../core/service-providers/service-provider.module';
// import { SessionProviderservice } from '@shared/services/auth/session-provider.service';
// import { ApiService } from '@shared/services/api/api.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavBar,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    LayoutRoutingModule,

    // ServiceProviderModule,
  ],
  providers: [
    provideClientHydration(),
    // ApiService,
    provideHttpClient(withFetch())
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
