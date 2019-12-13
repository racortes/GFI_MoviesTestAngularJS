
const addRemove = ($location, files) => {
    
    let vm = this;

    vm.authorized = angular.fromJson(files.getFromStorage('authorized','sessionStorage'));

    vm.remove = (id, movies) => {
        var index = files.indexIn(movies, 'imdbID', id);
        if (index != -1 && $location.path() == '/favourites/') movies.splice(index, 1);
        index = files.indexIn(vm.authorized.favouriteMovies, 'imdbID', id);
        vm.authorized.favouriteMovies.splice(index, 1);
        files.setInStorage('authorized',JSON.stringify(vm.authorized),'sessionStorage');
    }

    vm.add = (obj) => {
        vm.authorized.favouriteMovies.push(obj);
        files.setInStorage('authorized',JSON.stringify(vm.authorized),'sessionStorage');
    }

    return  vm;

  }
  
  (function() { 
     'use strict';
     angular
     .module('myApp')
     .factory('addRemove', addRemove);
  })(angular);