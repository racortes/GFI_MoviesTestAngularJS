angular
  .module('myApp')
  .directive('navigation', navigation);

function navigation () {
  return {
    scope: {
      total:"="
    },
    controller: function ($scope, $location, dataFactory, files){
         let vm = this;

         vm.rango = [];
         vm.current = 0;  // current page
         vm.nav = {}  // values to calc num of pages prev & next
         vm.cells = []; // total num of pages
         vm.config = {
            prev : 2, // num of pages before current
            next : 3, // num de pages after current
            max : 10 // change max matches per page is not allowed due omdb api limitions. Only available for favourites page
         }
      
     $scope.$parent.$watch('vm.total', (newVal) => {
         if (vm.total != newVal) {
           vm.total = newVal;
           vm.current = dataFactory.getCurrentPage();
           vm.calcRange(); 
         }
     })

     vm.goTo = (page) => { 
          vm.current = page;
          $scope.$parent.vm.displayResults(vm.current+1, vm.config.max)
     }

     vm.calcRange = () => {
       vm.cells = Math.ceil(vm.total/vm.config.max);
       vm.nav.next = vm.current+vm.config.next >= vm.cells ? vm.cells-1 : vm.current+vm.config.next;
       vm.nav.prev = vm.current-vm.config.prev < 0 ? 0 : vm.current-vm.config.prev;
       return vm.rango = files.range(vm.nav.prev,vm.nav.next); 
    }
 
    },
    controllerAs: 'vm',
    templateUrl: '/js/components/movie/navigation/navigationTpl.html' 
   }
}
