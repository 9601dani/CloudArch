import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmpleadoComponent } from './new-empleado.component';

describe('NewEmpleadoComponent', () => {
  let component: NewEmpleadoComponent;
  let fixture: ComponentFixture<NewEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
