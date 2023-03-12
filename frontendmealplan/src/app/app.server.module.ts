import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { TranslateUniversalLoader } from './theme/utils/translate-universal-loader'; 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
export function translateFactory() {
  return new TranslateUniversalLoader('./dist/browser/assets/i18n', '.json');
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
