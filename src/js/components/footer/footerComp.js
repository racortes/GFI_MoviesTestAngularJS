
angular
  .module('myApp')
  .directive('footerComp', footer);

function footer () {
  return {
    controller: function($location, $scope, dataFactory) {
         
         const path = $location.path();
         
         $scope.clickName = (name) => {
              dataFactory.setObj({key:'about',val:{nLink:name}})
                 $location.path('/about/');
              if (path == '/about/') 
                 location.reload() 
                 setTimeout(()=>{$location.path('/about/')},500);
         } 
    },
    templateUrl: '/js/components/footer/footerTpl.html'
  }
}
