angular
  .module('myApp')
  .directive('listItem', listItem);

function listItem () {
  return {
    controller: function ($scope, $rootScope, dataHttp, dataFactory, addRemove, files) {
      
    let vm = this,
        params = dataFactory.getObj('home');
   
    vm.refreshContent = () => {
       dataFactory.setObj({
            key:'home',
            val:files.extendObj(dataFactory.objDefault.home,{   
                  s : dataFactory.getRandomValue(dataFactory.searchSuggesions),
                  type : dataFactory.getRandomValue(dataFactory.typeSuggestions)
                 }) 
            })
       vm.displayResults(1);
    }
  
    vm.displayResults = (page) => {
         params = dataFactory.getObj('home'); 
         params.page = page;
         dataHttp.getAll(params)
           .then(data => {
              vm.moviesList = data.Search 
              vm.total = data.totalResults;
           });    
    }

    vm.remove = id => addRemove.remove(id, vm.movies);  
           
    vm.add = obj => addRemove.add(obj); 

    $scope.$on('refreshContent', vm.refreshContent);
    
    params.s.length > 2 ? vm.displayResults(params.page) : vm.refreshContent();
    

    },
    controllerAs: 'vm',
    templateUrl: '/js/components/movie/list/listTpl.html'
  }
}
