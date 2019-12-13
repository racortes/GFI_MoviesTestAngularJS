const dataHttp = ($http, $q, $location, API_URL, API_KEY, dataFactory, files) => {

  let vm = this;
  
  vm.getAll = props => {
     dataFactory.setObj({key:dataFactory.convertURI($location.path()),val:props});
     props.s = `*${props.s}*`
     let url = files.toQueryString(props, API_URL, ''),
        defered = $q.defer(),
        promise = defered.promise;
        //$http.get('../js/data/mockData.json') //-> mocked request data
        $http.get(url)
             .success(data =>  defered.resolve(data))
             .error(err =>  defered.reject(err));
        return promise;
  }

  vm.auth = ({user, pass}) => {
    let defered = $q.defer(),
        promise = defered.promise;
        $http({
          method: 'GET',
          url: '../js/data/mockUser.json',
          header: {
            'alg': 'HS256',
            'typ': 'JWT'  // Mocked JWT saved into a cookie for security auth 
          },
          body: {
              user,
              pass
          }
      })
      .success(data =>  defered.resolve(data))
      .error(err =>  defered.reject(err));
    return promise;
}

vm.getMovie = (id) => {
  let defered = $q.defer(),
      promise = defered.promise;
      $http.get(`${API_URL}apikey=${API_KEY}&i=${id}&tomatoes=true`)
           .success(data =>  defered.resolve(data))
           .error(err =>  defered.reject(err));
      return promise;
}
return vm;

}

(function() { 
   'use strict';
   angular
   .module('myApp')
   .factory('dataHttp',  dataHttp);
})(angular);