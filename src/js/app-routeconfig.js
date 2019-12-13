angular
  .module('myApp')
  .config(routeConfig);



function routeConfig ($routeProvider) {
  $routeProvider
    .when('/home/', {
      template: '<home-page action="list"></home-page>'
    })
    .when('/detail/:id', {
      template: '<movie-detail></movie-detail>'
    })
    .when('/users/', {
      template: '<home-page action="login"></home-page>'
    })
    .when('/about/', {
      template: '<home-page action="about"></home-page>'
    })
    .when('/favourites/', {
      template: '<home-page action="favourites"></home-page>'
    })
    .when('/search/', {
      template: '<home-page action="search"></home-page>'
    })
    .otherwise({
      redirectTo: '/home/'
    });
}
