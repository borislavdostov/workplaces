import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set confirmation dialog message correctly', () => {
    component.message = 'Confirmation Dialog Message';
    
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p').textContent).toEqual('Confirmation Dialog Message');
  });

  it('should call onYesClick method when confirmation button clicked', () => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'onYesClick');

    button.click();

    expect(component.onYesClick).toHaveBeenCalled();
  });
});
