import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalleComponent } from './update-salle.component';

describe('UpdateSalleComponent', () => {
  let component: UpdateSalleComponent;
  let fixture: ComponentFixture<UpdateSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
