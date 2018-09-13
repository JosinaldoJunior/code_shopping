import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGroupUserHttpService } from '../../../../services/http/chat-group-user-http.service';
import { ChatGroupUserDeleteModalComponent } from '../chat-group-user-delete-modal/chat-group-user-delete-modal.component';
import { ChatGroup, User } from '../../../../model';

@Component({
  selector: 'chat-group-user-list',
  templateUrl: './chat-group-user-list.component.html',
  styleUrls: ['./chat-group-user-list.component.css']
})
export class ChatGroupUserListComponent implements OnInit {

  chatGroupId: number;
  chatGroup: ChatGroup;
  users: Array<User> = [];
  userIdToDelete;
  pagination = {
          page: 1,
          totalItems: 0,
          itemsPerPage: 10
  };
  
  productId: number;
  
  @ViewChild(ChatGroupUserDeleteModalComponent)
  chatGroupUserDeleteModal: ChatGroupUserDeleteModalComponent;
    
  constructor(private chatGroupUserHttp: ChatGroupUserHttpService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
         this.chatGroupId = params.chat_group;
         this.getUsers();
      });
  }
  
  getUsers(){
      this.chatGroupUserHttp.list(this.chatGroupId, { page: this.pagination.page })
          .subscribe(response => {
              this.chatGroup = response.data.chat_group;
              this.users = response.data.users;
              this.pagination.totalItems = response.meta.total;
              this.pagination.itemsPerPage = response.meta.per_page;
          });
  }
  
  openModalDelete(userId){
      this.userIdToDelete = userId;
      this.chatGroupUserDeleteModal.showModal();
  }
  
  pageChanged(page){
      this.pagination.page = page;
      this.getUsers();
  }
  
  onInsertSuccess($event){
      this.getUsers();
  }
  
  onInsertError($event){
      console.log($event);
  }
  
  

}
