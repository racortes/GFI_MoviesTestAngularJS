angular
  .module('myApp')
  .directive('movieDetail', movieDetail);

function movieDetail () {
  return {
    scope: {},
    controller: function (dataHttp, $routeParams) {
        var vm = this;
        vm.movie = {};

        dataHttp.getMovie($routeParams.id)
          .then(data => {
            vm.movie = data;
        });
    },
    controllerAs: 'vm',
    templateUrl: '/js/components/movie/detail/detailTpl.html'
  }
}
