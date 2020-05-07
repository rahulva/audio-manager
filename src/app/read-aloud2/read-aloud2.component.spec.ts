import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAloud2Component } from './read-aloud2.component';

describe('ReadAloud2Component', () => {
  let component: ReadAloud2Component;
  let fixture: ComponentFixture<ReadAloud2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAloud2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAloud2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
