import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ProductPhotoHttpService } from '../../../../services/http/product-photo-http.service';
import { ProductPhotoEditModalComponent } from '../product-photo-edit-modal/product-photo-edit-modal.component';
import { ProductPhotoDeleteModalComponent } from '../product-photo-delete-modal/product-photo-delete-modal.component';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductPhoto } from '../../../../model';

declare const $;

@Component({
  selector: 'product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.css']
})
export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[] = [];
  product: Product = null;
  productId: number;
  @Input()
  photoIdToEdit: number;


  @ViewChild(ProductPhotoEditModalComponent)
  editModal: ProductPhotoEditModalComponent;
  @ViewChild(ProductPhotoDeleteModalComponent)
  deleteModal: ProductPhotoDeleteModalComponent;
  
  constructor(private productPhotoHttp: ProductPhotoHttpService,
              private route: ActivatedRoute,
              private notifyMessage: NotifyMessageService) { 
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.productId = params.product;
          this.getPhotos();
          this.configFancyBox();
      })
  }
  
  getPhotos(){
      this.productPhotoHttp
          .list(this.productId)
          .subscribe(data => {
              this.photos = data.photos;
              this.product = data.product;
          })
  }
  
  configFancyBox(){
      $.fancybox.defaults.btnTpl.edit = `
      <a class="fancybox-button" data-fancybox-edit title="Substituir foto" href="javascript:void(0)" style="text-align: center">
          <i class="fas fa-edit"></i>
      </a>
      `;
      $.fancybox.defaults.btnTpl.delete = `
      <a class="fancybox-button" data-fancybox-delete title="Excluir foto" href="javascript:void(0)" style="text-align: center">
          <i class="fas fa-trash-alt"></i>
      </a>
      `;
      $.fancybox.defaults.buttons = ['download', 
                                     'edit', 
                                     /*'zoom', 'slideShow', 'fullScreen', 'thumbs', */
                                     'delete',
                                     'close'];
      
      $('body').on('click', '[data-fancybox-edit]', (e) => {
          const photoId = this.getPhotoIdFromSlideShow();
          this.photoIdToEdit = photoId;
          this.editModal.showModal();
      });
      
      $('body').on('click', '[data-fancybox-delete]', (e) => {
          const photoId = this.getPhotoIdFromSlideShow();
          this.photoIdToEdit = photoId;
          this.deleteModal.showModal();
          console.log(photoId);
      });
      $.fancybox.defaults.animationEffect = "circular";
      $.fancybox.defaults.transitionEffect = "circular";
  }
  
  getPhotoIdFromSlideShow(){
      const src = $('.fancybox-slide--current .fancybox-image').attr('src');
      const id =  $('[data-fancybox="gallery"]').find(`[src="${src}"]`).attr('id');
      return id.split('-')[1];
  }
  
  onInsertSuccess(data: {photos: ProductPhoto[]} ){
      console.log(this.photos);
      this.photos.push(...data.photos);
      this.notifyMessage.success('Foto(s) cadastrada(s) com sucesso!');
  }
  
  onEditSuccess(data: ProductPhoto){
      $.fancybox.getInstance().close();
      this.editModal.hideModal();
      
      const index = this.photos.findIndex((photo: ProductPhoto) => {
          return photo.id == this.photoIdToEdit;
      });
      
      this.photos[index] = data;
      this.notifyMessage.success('Foto substituída com sucesso!');
  }
  
  onDeleteSuccess(data: ProductPhoto){
      $.fancybox.getInstance().close();
      this.deleteModal.hideModal();
      
      const index = this.photos.findIndex((photo: ProductPhoto) => {
          return photo.id == this.photoIdToEdit;
      });
      
      this.photos.splice(index, 1);
      this.notifyMessage.success('Foto excluída com sucesso!');
  }

}
