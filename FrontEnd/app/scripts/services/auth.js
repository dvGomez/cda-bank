'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Auth
 * @description
 * # Auth
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
.service('Auth', function ($http, $rootScope, $cookies,ENVIROMENT) {

  const ApiUrl = ENVIROMENT.apiEndpoint+"/user/";
  var storage = window.localStorage;

  this.login = function (id) {
    console.log('Realizando chamada de login...');
    return $http.get(ApiUrl + "authenticate/"+id).then(
      function ({ data }) {
        console.log('Retorno da API de login:', data);
        saveCredentials(data);
        return data;
      },
      function ({ data }) {
        console.log('Retorno da API de login (erro):', data);
        return data;
      }
    )
  }

  function saveCredentials (user) {

    console.log("Salvando credenciais de usuário...", user);
    // $http.defaults.headers.common['Authorization'] = token; // jshint ignore:line
    // storage.setItem('userToken', token);
    storage.setItem('user', JSON.stringify(user));
    tryConn();

  }

  this.logout = function(){
    // storage.removeItem('userToken');
    storage.removeItem('user');
    location.reload();
  }

  function tryConn(){
      var user = JSON.parse(storage.getItem('user'));
      // $http.defaults.headers.common['Authorization'] = token;
      $rootScope.user = user;
      return true;
  }

  this.tryConnect = function(){
    var token = storage.getItem('user');
    if(token){
      var user = JSON.parse(storage.getItem('user'));
      // $http.defaults.headers.common['Authorization'] = token;
      $rootScope.user = user;
      return true;
    } 
    return false;
  }
});
