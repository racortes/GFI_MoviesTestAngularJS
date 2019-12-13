angular
  .module('myApp')
  .directive('search', search);

function search () {
  return {
    controller: function ($scope, $rootScope, dataHttp, dataFactory, addRemove, files) {
      
    let vm = this,
        params = dataFactory.getObj('search');

    vm.displayResults = (page) => {
      dataFactory.setObj({key:'search',val:files.extendObj(params,dataFactory.getFilters())})
      params = dataFactory.getObj('search'); 
      params.page = page;
      dataHttp.getAll(params)
        .then(data => {
           vm.moviesList = data.Search 
           vm.total = data.totalResults;
        });    
    }

    vm.remove = id => addRemove.remove(id, vm.movies);  
           
    vm.add = obj => addRemove.add(obj); 

    $scope.$on('filter', (event, args) =>  { 
        dataFactory.setObj({key:'search',val:files.extendObj(params,args.data)})
        dataFactory.filters = args.data;
        dataFactory.setFilters(args.data);
        vm.displayResults(1);
    })
    
    ;(function() {
        vm.displayResults(params.page);
        $rootScope.$broadcast('fillFields');
    })();

    },
    controllerAs: 'vm',
    templateUrl: '/js/components/movie/list/listTpl.html'
  }
}
