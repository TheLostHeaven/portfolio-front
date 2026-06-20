import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { LayoutModule } from './layout.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    LayoutModule,
    ServerModule,
  ],
  bootstrap: [LayoutComponent],
})
export class LayoutServerModule {}
