const Auth = ($window, $rootScope, files, $scope = {}) => {
  $scope.isAuthorized = () => { 
      let authorized = files.getFromStorage('authorized', 'sessionStorage');
      return authorized != null && files.testJWToken(files.getCookie(authorized.email));
  }

  $scope.setAuthorized = (response) => {
      let authorized = JSON.stringify(response.data);
      $window.sessionStorage.setItem('authorized', authorized);
      files.setCookie(response.data.email, response.JWT, 30);
      $rootScope.$emit('authorized', { data: authorized })
  } 

  return $scope
}

const interceptor = ($httpProvider) => {
  $httpProvider.interceptors.push(lockHttp)
}
    
const lockHttp = ($location,$q, Auth) => {
    return {
      response: response => {
        if ($location.path() === '/users/' && response.config.hasOwnProperty('body')) {
            let {pass, user} = response.config.body;
            let {password, email} = response.data.data;
            if (pass == password && user == email) {
               Auth.setAuthorized(response.data)
            }
            else {
               return (
                  {
                    data:{
                       data: 'User or password incorrect!',
                       status: 200
                    }
                 }
               ); 
            }         
        }
        return response || $q.when({response});
      },
      responseError: response => {
        console.log('status', response.status);
        return $q.reject(response);
      }
    }
  }

(function() { 
    'use strict';
     angular
       .module('myApp')
       .factory('Auth', Auth)
       .config(['$httpProvider', interceptor])
})(angular);
