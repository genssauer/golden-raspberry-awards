import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [],
    providers: [provideHttpClientTesting(), provideRouter([])],
  });

  it('should create the app', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  it('should render title', () => {
    spectator = createComponent();
    spectator.detectChanges();
    expect(spectator.query('h1')?.textContent).toContain(
      'Frontend Angular Test'
    );
  });
});
