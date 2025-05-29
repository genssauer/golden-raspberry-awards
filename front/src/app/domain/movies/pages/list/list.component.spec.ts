import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ListComponent } from './list.component';

describe('DashboardComponent', () => {
  let spectator: Spectator<ListComponent>;
  const createComponent = createComponentFactory(ListComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
