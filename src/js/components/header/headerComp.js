angular
  .module('myApp')
  .directive('header', header);

function header () {
  return {
    controller: function ($rootScope, $scope, $location, $window, Auth, files, dataFactory) {
        var vm = this;
        vm.model = '';
        vm.modelYear = 'Any year';
        vm.modelType = 'Any type'
        vm.location = $location;
        vm.rootScope = $rootScope;
        vm.files = files;
        vm.isAuthorized = Auth.isAuthorized();
        vm.selectedTab = $location.path(); 

        vm.clear = (val) => (
           val.indexOf('Any') !== -1 ? '' : val
        )

        vm.tab = (name) => {
          $location.path(name);
          vm.selectedTab = name;
        }

        vm.filter = ({key, model}) => {
            dataFactory.filters[key] = vm.clear(model);
            dataFactory.setFilters(dataFactory.filters);
            $rootScope.$broadcast('filter', {data:{
              s: vm.model,
              y: vm.clear(vm.modelYear),
              type: vm.clear(vm.modelType)
            }})
        }
        vm.clickBtn = () => {
            $rootScope.$broadcast('refreshContent', {data:vm.model})
        }
        vm.rootScope.$on('authorized', () => vm.isAuthorized = true ) 

        vm.logOut = () => {
          files.deleteCookie(files.getFromStorage('authorized', 'sessionStorage').email)
          $window.sessionStorage.removeItem('authorized');
          vm.isAuthorized = false;
          location.reload();
        }

        $scope.$on("fillFields", () => {
            let {s, type, y} = dataFactory.getFilters();
            vm.model = angular.isDefined(s) && s.length ? s.replace(/\*/gi,'') : ''
            vm.modelYear = angular.isDefined(y) && y.length ? y : 'Any year';
            vm.modelType = angular.isDefined(type) && type.length ? type : 'Any type'; 
        })
    },
    controllerAs: 'vm',
    templateUrl: '/js/components/header/headerTpl.html'
  }
}