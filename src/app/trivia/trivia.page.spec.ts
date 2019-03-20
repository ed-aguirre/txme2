import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaPage } from './trivia.page';

describe('TriviaPage', () => {
  let component: TriviaPage;
  let fixture: ComponentFixture<TriviaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
