import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatnewPage } from './chatnew.page';

describe('ChatnewPage', () => {
  let component: ChatnewPage;
  let fixture: ComponentFixture<ChatnewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatnewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatnewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
