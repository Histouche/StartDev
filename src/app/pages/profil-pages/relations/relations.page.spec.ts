import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsPage } from './relations.page';

describe('RelationsPage', () => {
  let component: RelationsPage;
  let fixture: ComponentFixture<RelationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
