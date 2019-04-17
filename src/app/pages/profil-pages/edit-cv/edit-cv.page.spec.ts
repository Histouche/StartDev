import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCvPage } from './edit-cv.page';

describe('EditCvPage', () => {
  let component: EditCvPage;
  let fixture: ComponentFixture<EditCvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
