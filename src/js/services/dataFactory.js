
const dataFactory = ($rootScope, $location, API_KEY, files) => {
    
    let vm = this;
    vm.rootScope = $rootScope;

    vm.objNav = {}
    
    vm.setObj = ({key,val}) => {
       vm.objNav[key] = val;
       files.setInStorage(key,JSON.stringify(val))
    }

    vm.getObj = (key) => (
          vm.objNav.hasOwnProperty(key) 
             ? vm.objNav[key] 
             : files.getFromStorage(key)  
                ? files.getFromStorage(key) 
                : vm.objDefault[key]

    )

    vm.getCurrentPage = () => (
       angular.isDefined(vm.getObj(vm.convertURI($location.path()))) 
       ? vm.getObj(vm.convertURI($location.path())).page-1 : 0
    )
        
    vm.objDefault = {
        home : {apiKey: API_KEY, s:'',type:'',y:'',page:1},
        search : {apiKey: API_KEY, s:'',type:'',y:'',page:1},
        favourites : {page:1},
        users : {},
        about : {nLink: 'Links'}
    }

    vm.filters = {}
    
    vm.setFilters = obj => {
        files.setInStorage('filters',JSON.stringify(obj))
    }

    vm.getFilters = () => (
        angular.isObject(files.getFromStorage('filters')) ? files.getFromStorage('filters') : vm.filters
    )
  
    vm.getRandomValue = (arr) => (
        arr[Math.floor((Math.random() * arr.length))]
    ) 

    vm.searchSuggesions = ['star','wars','trek','galactica','movie','casa','miedo','list','bosque','bad','zona',
                          'europa','america','asia','africa','australia','juego','eclipse','laberinto','horror',
                          'things','humans','inteligencia','artificial','robot','blade','familia','joker','galaxia'];

    vm.typeSuggestions = ['','movie','series'];                     

    vm.convertURI = str => (str.replace(/[^a-zA-Z0-9-_]/g, ''));

    return  vm;

  }
  
  (function() { 
     'use strict';
     angular
     .module('myApp')
     .factory('dataFactory', dataFactory);
  })(angular);