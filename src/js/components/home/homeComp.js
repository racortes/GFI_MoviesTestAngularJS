angular
  .module('myApp')
  .directive('homePage', homePage)
  .controller('NavbarController', ['$scope', $scope => {
     $scope.isCollapsed = true;
 }])  // controller for navbar


function homePage () {
  return {
    scope: {
      action : "@"
    },
    templateUrl: '/js/components/home/homeTpl.html' 
  }
}