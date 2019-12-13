angular
  .module('myApp')
  .directive('movieItem', movieItem);

function movieItem () {
  return {
    scope: {
        movie:"=",
        index:"="
    },
    controller: function($location, $scope, Auth, files) {
        
        let vm = this;
        vm.files = files;

        vm.authorized = angular.fromJson(files.getFromStorage('authorized','sessionStorage'));        
        
        if (Auth.isAuthorized()) {
           $scope.favourite = files.indexIn(vm.authorized.favouriteMovies, 'imdbID', $scope.movie.imdbID) !== -1
           $scope.disabled = false; 
        } else 
           $scope.disabled = true;
                
        vm.remove = (id) =>{
            $scope.$parent.vm.remove(id);
            $scope.favourite = $location.path() != '/favourites/' ? !$scope.favourite : $scope.favourite ;
        }

        vm.add = (id) => {
          $scope.$parent.vm.add(id);
          $scope.favourite = !$scope.favourite
        }

        vm.goTo = (id) => {
          $location.path(`/detail/${id}`);
        }

        vm.style = (url) => (           
          {
          'background': `url(${url != 'N/A' ? url : '../../assets/img/Movie2.png'})`,
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain'
          }
        )
    },
    controllerAs:'vm',
    templateUrl: '/js/components/movie/item/itemTpl.html'
  }
}
