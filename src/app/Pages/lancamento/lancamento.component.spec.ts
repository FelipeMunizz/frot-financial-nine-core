import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaComponent } from './lancamento.component';

describe('DespesaComponent', () => {
  let component: DespesaComponent;
  let fixture: ComponentFixture<DespesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesaComponent]
    });
    fixture = TestBed.createComponent(DespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
