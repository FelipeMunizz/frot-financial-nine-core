import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacoesComponent } from './importacoes.component';

describe('ImportacoesComponent', () => {
  let component: ImportacoesComponent;
  let fixture: ComponentFixture<ImportacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportacoesComponent]
    });
    fixture = TestBed.createComponent(ImportacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
