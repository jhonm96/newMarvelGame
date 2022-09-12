import { ComponentFixture, TestBed } from '@angular/core/testing';

import { lobbyComponent } from './lobby.component';

describe('lobbyComponent', () => {
  let component: lobbyComponent;
  let fixture: ComponentFixture<lobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ lobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(lobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
