export const environment = {
  production: true,
  api: {
      protocol: 'http',
//      host: 'localhost:8000',
      host: 'http://192.168.0.101:8000',
      get url(){
          return `${this.protocol}://${this.host}/api`
      }
  },
  baseFilesUrl: 'http://192.168.0.101:8000/storage'
};
