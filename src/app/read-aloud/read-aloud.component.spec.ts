import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAloudComponent } from './read-aloud.component';

describe('ReadAloudComponent', () => {
  let component: ReadAloudComponent;
  let fixture: ComponentFixture<ReadAloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
