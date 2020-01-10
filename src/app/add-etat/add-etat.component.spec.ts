import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtatComponent } from './add-etat.component';

describe('AddEtatComponent', () => {
  let component: AddEtatComponent;
  let fixture: ComponentFixture<AddEtatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEtatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
