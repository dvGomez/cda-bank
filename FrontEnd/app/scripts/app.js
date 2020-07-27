'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Main module of the application.
 */
angular
  .module('frontEndApp', [
    'app.config',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/customers', {
        templateUrl: 'views/customers.html',
        controller: 'CustomersCtrl',
        controllerAs: 'customers'
      })
      .when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl',
        controllerAs: 'resources'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function(Auth, Users, $rootScope, $location){

    Auth.tryConnect();

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in
      console.log('Trocando de página...');
      var user = $rootScope.user;
      console.log("Verificando login de usuário...");
      if (user === undefined) {
        $location.path('/login');
        // $rootScope.hideLayouts = true;
        console.log("Usuário não encontrado, redirecionando...");
        console.log('HideLayouts');
      } else {
        console.log("Usuário encontrado...");
        // $rootScope.hideLayouts = false;
        console.log('Usuário:', user);
        Users.updateProfile();

      }
    });

  });
