angular
  .module('myApp')
  .directive('formulario', formulario)

function formulario () {
  return {
   controller: function (dataHttp, $location) {
        let vm = this;

            vm.name = 'gfi@gfi.com'
            vm.pass = 'gfi' 
            vm.submit = () => {
            dataHttp.auth({user:vm.name,pass:vm.pass})
                    .then(response => { 
                      if (response.status == 200 && response.hasOwnProperty("statusText")) {   
                         $location.path('/home/');
                         setTimeout(()=>{location.reload()},20)
                      }
                      else vm.message = response.data;                 
            })
        }
    },
    controllerAs: 'vm',
    templateUrl: '/js/components/users/form/formTpl.html' 
  }
}