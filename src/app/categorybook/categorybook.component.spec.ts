import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorybookComponent } from './categorybook.component';

describe('CategorybookComponent', () => {
  let component: CategorybookComponent;
  let fixture: ComponentFixture<CategorybookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorybookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
