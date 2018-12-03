// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: { 
      protocol: 'http',
//      host: '10.39.11.179:8000', 
//      host: '192.168.1.5:8000', 
      host: '172.31.0.251:8000', 
//      host: 'localhost:8000',
      get url(){ 
          return `${this.protocol}://${this.host}/api`
      }
  },
//  baseFilesUrl: 'http://10.39.11.179:8000/storage',
//  baseFilesUrl: 'http://192.168.1.5:8000/storage',
  baseFilesUrl: 'http://172.31.0.251:8000/storage', 
//  showFirebaseUI: !document.URL.startsWith('file:///')
  showFirebaseUI: false
      
//  baseFilesUrl: 'http://127.0.0.1:8000/storage' 
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
