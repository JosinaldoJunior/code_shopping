import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupUserDeleteModalComponent } from './chat-group-user-delete-modal.component';

describe('ChatGroupUserDeleteModalComponent', () => {
  let component: ChatGroupUserDeleteModalComponent;
  let fixture: ComponentFixture<ChatGroupUserDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupUserDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupUserDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
