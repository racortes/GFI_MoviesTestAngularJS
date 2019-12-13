angular
  .module('myApp')
  .directive('favourites', favourites)

function favourites () {
  return {
    controller: function ($scope, $rootScope, $location, Auth, files, addRemove, dataFactory) {
    
    let vm = this,
        max = 10; // max number of matches 
        
    if (!Auth.isAuthorized()) $location.path('/users/');

    vm.getArr = () => (vm.filterFx(vm.initMovies)) 

    vm.displayResults = (page, max) => {
      let arr = vm.getArr();
      if (angular.isArray(arr)) {
        arr = arr.slice((page-1)*max,(page)*max);
        vm.moviesList = arr;
      }
      dataFactory.setObj({key:'favourites',val:{page:page}})
    }

    vm.remove = (id) => { 
      addRemove.remove(id, vm.moviesList); 
      vm.init(vm.calcPage(dataFactory.getCurrentPage()+1));
    }  

    vm.filterFx = (arr) => {
      let {s = '', y = '', type = ''} = dataFactory.getFilters(),
      into = (val1, val2) => (
          val1 == '' || val2.toLowerCase().indexOf(val1.toLowerCase().trim()) !== -1
      )
      return arr = arr.filter(m => new RegExp(`${s.replace(/\*/gi,'')}` , 'i').test(m.Title) && into(y,m.Year) && into(type,m.Type));
    }
           
    $scope.$on('filter', (event, args) =>  { 
      dataFactory.setFilters(args.data);
      vm.init()
    })
    
    vm.calcPage = (page) => (
       (vm.getArr().length-1) / (max * (page-1)) > 1 ? page : page-1 
    )

    vm.init = (page = 1) => {
       vm.initMovies = files.getFromStorage('authorized','sessionStorage').favouriteMovies;
       vm.total = vm.getArr().length; 
       vm.displayResults(page, max);
       $rootScope.$broadcast('fillFields');
    }
    vm.init(dataFactory.getCurrentPage()+1); 

    },
    controllerAs: 'vm',
    templateUrl: '/js/components/users/favourites/listTpl.html'
    /*
    template:`
       <navigation></navigation>
       <div ng-repeat="movie in vm.moviesList track by $index">
          <movie-item movie="movie" index="$index"></movie-item>
       </div>
    `
    */
  }
}
