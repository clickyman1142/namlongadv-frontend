// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/management',
  uaa: 'http://localhost:8080/management/oauth/token',
  user: 'http://localhost:8080/management/users',
  userRole: 'http://localhost:8080/management/userRoles',
  advert: 'http://localhost:8080/management/advs',
  province: 'http://localhost:8080/management/provinces',
  advertHistory: 'http://localhost:8080/management/advHistory',
  // baseUrl: 'http://ec2-13-229-233-124.ap-southeast-1.compute.amazonaws.com/api/management',
  // uaa: 'http://ec2-13-229-233-124.ap-southeast-1.compute.amazonaws.com/api/management/oauth/token',
  // user: 'http://ec2-13-229-233-124.ap-southeast-1.compute.amazonaws.com/api/management/users',
  // userRole: 'http://ec2-13-229-233-124.ap-southeast-1.compute.amazonaws.com/api/management/userRoles',
  // advert: 'http://ec2-13-229-233-124.ap-southeast-1.compute.amazonaws.com/api/management/advs',
  // province: 'http://ec2-13-229-233-124.ap-southeast-1.compute.amazonaws.com/api/management/provinces',
  // advertHistory: 'http://ec2-13-229-233-124.ap-southeast-1.compute.amazonaws.com/api/management/advHistory'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
