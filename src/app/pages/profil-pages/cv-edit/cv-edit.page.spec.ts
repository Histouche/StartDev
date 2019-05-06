import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvEditPage } from './cv-edit.page';

describe('CvEditPage', () => {
  let component: CvEditPage;
  let fixture: ComponentFixture<CvEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
