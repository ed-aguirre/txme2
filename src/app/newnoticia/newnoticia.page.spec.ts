import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnoticiaPage } from './newnoticia.page';

describe('NewnoticiaPage', () => {
  let component: NewnoticiaPage;
  let fixture: ComponentFixture<NewnoticiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewnoticiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewnoticiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
