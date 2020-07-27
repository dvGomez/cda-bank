'use strict';
/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Main module of the application.
 */

angular.module('frontEndApp', ['app.config', 'ngAnimate', 'ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch']).config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  }).when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  }).when('/customers', {
    templateUrl: 'views/customers.html',
    controller: 'CustomersCtrl',
    controllerAs: 'customers'
  }).when('/resources', {
    templateUrl: 'views/resources.html',
    controller: 'ResourcesCtrl',
    controllerAs: 'resources'
  }).otherwise({
    redirectTo: '/'
  });
}).run(function (Auth, Users, $rootScope, $location) {
  Auth.tryConnect();
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in
    console.log('Trocando de página...');
    var user = $rootScope.user;
    console.log("Verificando login de usuário...");

    if (user === undefined) {
      $location.path('/login'); // $rootScope.hideLayouts = true;

      console.log("Usuário não encontrado, redirecionando...");
      console.log('HideLayouts');
    } else {
      console.log("Usuário encontrado..."); // $rootScope.hideLayouts = false;

      console.log('Usuário:', user);
      Users.updateProfile();
    }
  });
});

(function () {
  angular.module('app.config', []).constant('ENVIROMENT', {
    apiEndpoint: 'http://localhost:50542/api'
  });
})();

'use strict';
/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */


angular.module('frontEndApp').controller('MainCtrl', function ($scope, Users, $rootScope) {
  $scope.saque = {};
  $scope.deposito = {};
  $scope.transferencia = {};
  Users.extrato().then(function (data) {
    console.log(data);
    $scope.extratos = data;
  });

  $scope.sacar = function () {
    $scope.saque.UserId = $rootScope.user.id;
    Users.sacar($scope.saque).then(function (data) {
      Swal.fire(data.message).then(function (result) {
        location.reload();
      });
    });
  };

  $scope.depositar = function () {
    $scope.deposito.UserId = $rootScope.user.id;
    Users.depositar($scope.deposito).then(function (data) {
      Swal.fire(data.message).then(function (result) {
        location.reload();
      });
    });
    ;
  };

  $scope.transferir = function () {
    $scope.transferencia.FromUserId = $rootScope.user.id;
    Users.transferir($scope.transferencia).then(function (data) {
      Swal.fire(data.message).then(function (result) {
        location.reload();
      });
    });
  };

  $scope.timeSince = function (date) {
    return timeS(Date.parse(date));
  };

  function timeS(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }

    interval = Math.floor(seconds / 2592000);

    if (interval > 1) {
      return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);

    if (interval > 1) {
      return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);

    if (interval > 1) {
      return interval + " hours ago";
    }

    interval = Math.floor(seconds / 60);

    if (interval > 1) {
      return interval + " minutes ago";
    }

    return Math.floor(seconds) + " seconds ago";
  }
});
'use strict';
/**
 * @ngdoc service
 * @name frontEndApp.Auth
 * @description
 * # Auth
 * Service in the frontEndApp.
 */


angular.module('frontEndApp').service('Auth', function ($http, $rootScope, $cookies, ENVIROMENT) {
  var ApiUrl = ENVIROMENT.apiEndpoint + "/user/";
  var storage = window.localStorage;

  this.login = function (id) {
    console.log('Realizando chamada de login...');
    return $http.get(ApiUrl + "authenticate/" + id).then(function (_ref) {
      var data = _ref.data;
      console.log('Retorno da API de login:', data);
      saveCredentials(data);
      return data;
    }, function (_ref2) {
      var data = _ref2.data;
      console.log('Retorno da API de login (erro):', data);
      return data;
    });
  };

  function saveCredentials(user) {
    console.log("Salvando credenciais de usuário...", user); // $http.defaults.headers.common['Authorization'] = token; // jshint ignore:line
    // storage.setItem('userToken', token);

    storage.setItem('user', JSON.stringify(user));
    tryConn();
  }

  this.logout = function () {
    // storage.removeItem('userToken');
    storage.removeItem('user');
    location.reload();
  };

  function tryConn() {
    var user = JSON.parse(storage.getItem('user')); // $http.defaults.headers.common['Authorization'] = token;

    $rootScope.user = user;
    return true;
  }

  this.tryConnect = function () {
    var token = storage.getItem('user');

    if (token) {
      var user = JSON.parse(storage.getItem('user')); // $http.defaults.headers.common['Authorization'] = token;

      $rootScope.user = user;
      return true;
    }

    return false;
  };
});
'use strict';
/**
 * @ngdoc function
 * @name frontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontEndApp
 */


angular.module('frontEndApp').controller('LoginCtrl', function ($scope, Auth, $location, $rootScope) {
  var user = $rootScope.user;
  console.log("Verificando login de usuário...");

  if (user != undefined) {
    $location.path('/');
  }

  $scope.goToLogin = function () {
    if ($scope.authenticate) {
      Auth.login($scope.authenticate.id);
    }
  };
});
'use strict';
/**
 * @ngdoc service
 * @name frontEndApp.Users
 * @description
 * # Users
 * Service in the frontEndApp.
 */


angular.module('frontEndApp').service('Users', function ($http, ENVIROMENT, $rootScope) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  this.getAll = function () {
    return $http.get(ENVIROMENT.apiEndpoint + '/user').then(function (data) {
      return data.data;
    });
  };

  this.updateProfile = function () {
    return $http.get(ENVIROMENT.apiEndpoint + '/user/' + $rootScope.user.id).then(function (data) {
      console.log('USER:', data.data);
      $rootScope.user = data.data;
    });
  };

  this.sacar = function (saque) {
    return $http.post(ENVIROMENT.apiEndpoint + '/user/withdraw', saque).then(function (data) {
      return data.data;
    });
  };

  this.depositar = function (deposit) {
    return $http.post(ENVIROMENT.apiEndpoint + '/user/deposit', deposit).then(function (data) {
      return data.data;
    });
  };

  this.transferir = function (transfer) {
    return $http.post(ENVIROMENT.apiEndpoint + '/user/transfer', transfer).then(function (data) {
      return data.data;
    });
  };

  this.extrato = function () {
    return $http.get(ENVIROMENT.apiEndpoint + '/register/extrato/' + $rootScope.user.id).then(function (data) {
      return data.data;
    });
  }; // this.add = function(user){
  //   return $http.post(ENVIROMENT.apiEndpoint + '/user', user)
  //   .then(function(data){
  //     return data.data;
  //   })
  // };
  // this.delete = function(id){
  //   return $http.delete(ENVIROMENT.apiEndpoint + '/user/' + id)
  //   .then(function(data){
  //     return data.data;
  //   })
  // };

});
angular.module('frontEndApp').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('views/login.html', "<style>body {\n" + "        background: #0c111f;\n" + "    }</style> <div class=\"authentication-theme auth-style_1\"> <div class=\"row\"> <div class=\"col-12 logo-section text-center\"> <img src=\"./assets/images/logo.png\">  </div> </div>  <div class=\"row\"> <div class=\"col-lg-5 col-md-7 col-sm-9 col-11 mx-auto\"> <div class=\"grid\"> <div class=\"grid-body\"> <div class=\"row\"> <div class=\"col-lg-7 col-md-8 col-sm-9 col-12 mx-auto form-wrapper\"> <form action=\"#\"> <div class=\"form-group input-rounded\"> <input type=\"text\" class=\"form-control text-center\" placeholder=\"ID DO JOGADOR\" ng-model=\"authenticate.id\"> </div> <button type=\"submit\" class=\"btn btn-primary btn-block\" ng-click=\"goToLogin()\"> ENTRAR </button> </form> <div class=\"signup-link\"> <p>Para receber o auxílio emergêncial do cidade alta</p> <a href=\"#\">Clique aqui</a> </div> </div> </div> </div> </div> </div> </div> <div class=\"auth_footer\"> <p class=\"text-muted text-center\">© Developed by GMZ for CDA Applyment</p> </div> </div> ");
  $templateCache.put('views/main.html', "<div class=\"row\"> <div class=\"col-12 py-5\"> <h4>Dashboard</h4> <p class=\"text-gray\">Welcome aboard, {{user.nome}}</p> </div> </div> <div class=\"row\"> <div class=\"col-12 equel-grid\"> <div class=\"grid\"> <div class=\"grid-body text-gray text-center\"> <div class=\"\"> <h4 class=\"text-center text-primary\">R$ {{user.saldo}}</h4>  </div> <p class=\"text-black mt-3\">Saldo Atual</p> </div> </div> </div> </div> <div class=\"col-12 text-center\"> <button type=\"button\" class=\"m-1 btn btn-primary\" data-toggle=\"modal\" data-target=\"#sacarModal\">Saque</button> <button type=\"button\" class=\"m-1 btn btn-primary\" data-toggle=\"modal\" data-target=\"#depositoModal\">Deposito</button> <button type=\"button\" class=\"m-1 btn btn-primary\" data-toggle=\"modal\" data-target=\"#transferenciaModal\">Transferência</button> </div> <div class=\"col-12 mt-4 equel-grid\"> <div class=\"grid\"> <div class=\"grid-body\"> <div class=\"split-header\"> <p class=\"card-title\">Extrato</p> <div class=\"btn-group\"> <div class=\"dropdown-menu dropdown-menu-right\"> <a class=\"dropdown-item\" href=\"#\">View all</a> </div> </div> </div> <div class=\"vertical-timeline-wrapper\"> <div class=\"timeline-vertical dashboard-timeline\"> <div class=\"activity-log\" ng-repeat=\"extrato in extratos\"> <p class=\"log-name\"> {{extrato.type}} <span class=\"text-warning\" ng-if=\"extrato.type == 'Transfer' && extrato.transferUser != user.id\"> - R${{extrato.total}}</span> <span class=\"text-success\" ng-if=\"extrato.type == 'Transfer' && extrato.transferUser == user.id\"> + R${{extrato.total}}</span> <span class=\"text-warning\" ng-if=\"extrato.type == 'Withdraw'\"> - R${{extrato.total}}</span> <span class=\"text-success\" ng-if=\"extrato.type == 'Deposit'\"> + R${{extrato.total}}</span> </p> <div ng-if=\"extrato.type == 'Transfer' && extrato.transferUser == user.id\" class=\"log-details\">Você recebeu <span class=\"text-primary ml-1\">+ R${{extrato.total}}</span> do jogador <span class=\"text-primary ml-1\">{{extrato.userId}}</span></div> <div ng-if=\"extrato.type == 'Transfer' && extrato.transferUser != user.id\" class=\"log-details\">Você transferiu <span class=\"text-warning ml-1\"> R${{extrato.total}}</span> para o jogador <span class=\"text-primary ml-1\">{{extrato.userId}}</span></div> <small class=\"log-time\">{{timeSince(extrato.registerDate)}}</small> </div> </div> </div> </div> <a class=\"border-top px-3 py-2 d-block text-gray\" href=\"#\"> <small class=\"font-weight-medium\"><i class=\"mdi mdi-chevron-down mr-2\"></i> View All </small> </a> </div> </div> <div class=\"modal fade\" id=\"sacarModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"sacarModalLabel\" aria-hidden=\"true\"> <div class=\"modal-dialog modal-dialog-centered\"> <div class=\"modal-content\"> <div class=\"row\"> <div class=\"col-12 equel-grid\"> <div class=\"grid\"> <p class=\"grid-header\">Saque</p> <div class=\"grid-body\"> <div class=\"table-responsive\"> <form> <div class=\"form-group\"> <label for=\"inputName\">Valor</label> <input type=\"number\" class=\"form-control\" id=\"inputName\" placeholder=\"Informe o valor\" ng-model=\"saque.Total\"> </div> <button type=\"submit\" class=\"btn btn-sm btn-primary float-right\" ng-click=\"sacar()\" data-dismiss=\"modal\">Sacar</button> </form> </div> </div> </div> </div> </div> </div> </div> </div> <div class=\"modal fade\" id=\"depositoModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"depositoModalLabel\" aria-hidden=\"true\"> <div class=\"modal-dialog modal-dialog-centered\"> <div class=\"modal-content\"> <div class=\"row\"> <div class=\"col-12 equel-grid\"> <div class=\"grid\"> <p class=\"grid-header\">Depósito</p> <div class=\"grid-body\"> <div class=\"table-responsive\"> <form> <div class=\"form-group\"> <label for=\"inputName\">Valor</label> <input type=\"number\" class=\"form-control\" id=\"inputName\" placeholder=\"Informe o valor\" ng-model=\"deposito.Total\"> </div> <button type=\"submit\" class=\"btn btn-sm btn-primary float-right\" ng-click=\"depositar()\" data-dismiss=\"modal\">Depositar</button> </form> </div> </div> </div> </div> </div> </div> </div> </div> <div class=\"modal fade\" id=\"transferenciaModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"transferenciaModalLabel\" aria-hidden=\"true\"> <div class=\"modal-dialog modal-dialog-centered\"> <div class=\"modal-content\"> <div class=\"row\"> <div class=\"col-12 equel-grid\"> <div class=\"grid\"> <p class=\"grid-header\">Transferir</p> <div class=\"grid-body\"> <div class=\"table-responsive\"> <form> <div class=\"form-group\"> <label for=\"inputName\">ID do jogador</label> <input type=\"number\" class=\"form-control\" id=\"inputName\" placeholder=\"ID do jogador\" ng-model=\"transferencia.ToUserId\"> </div> <div class=\"form-group\"> <label for=\"inputName\">Valor</label> <input type=\"number\" class=\"form-control\" id=\"inputName\" placeholder=\"Informe o valor\" ng-model=\"transferencia.Total\"> </div> <button type=\"submit\" class=\"btn btn-sm btn-primary float-right\" ng-click=\"transferir()\" data-dismiss=\"modal\">Depositar</button> </form> </div> </div> </div> </div> </div> </div> </div> </div>");
}]);
//# sourceMappingURL=scripts.45db1064.js.map
