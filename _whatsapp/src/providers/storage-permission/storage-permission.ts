import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';

const CAN_WRITE_IN_STORAGE = 'can_write_in_storage';
/*
  Generated class for the StoragePermissionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoragePermissionProvider {

  constructor(public diagnostic: Diagnostic,
              private platform: Platform) {
  }
  
  requestPermission(){
      if(this.platform.is('android') && !this.canWriteInStorage){
          this.platform.ready()
              .then(() => {
                  this.diagnostic.requestExternalStorageAuthorization()
                      .then((result) => { //granted or denied
                          this.canWriteInStorage = result === 'GRANTED';
                      });
              });
      }else{
          this.canWriteInStorage = true;
      }
  }
  
  get canWriteInStorage(){
      const canWriteInStorage = window.localStorage.getItem(CAN_WRITE_IN_STORAGE);
      return canWriteInStorage === 'true';
  }
  
  set canWriteInStorage(value){
      window.localStorage.setItem(CAN_WRITE_IN_STORAGE, value ? 'true' : 'false');
  }

}
