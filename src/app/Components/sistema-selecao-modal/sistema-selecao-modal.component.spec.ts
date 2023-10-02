import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaSelecaoModalComponent } from './sistema-selecao-modal.component';

describe('SistemaSelecaoModalComponent', () => {
  let component: SistemaSelecaoModalComponent;
  let fixture: ComponentFixture<SistemaSelecaoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaSelecaoModalComponent]
    });
    fixture = TestBed.createComponent(SistemaSelecaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
