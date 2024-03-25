import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { popperVariation, provideTippyConfig, tooltipVariation } from '@ngneat/helipopper';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideTippyConfig({
    //   defaultVariation: 'tooltip',
    //   variations: {
    //     tooltip: tooltipVariation,
    //     popper: popperVariation,
    //   },
    // }),
    provideAnimations(),
  ],
};
