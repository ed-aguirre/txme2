import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VernoticiaPage } from './vernoticia.page';

describe('VernoticiaPage', () => {
  let component: VernoticiaPage;
  let fixture: ComponentFixture<VernoticiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VernoticiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VernoticiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
