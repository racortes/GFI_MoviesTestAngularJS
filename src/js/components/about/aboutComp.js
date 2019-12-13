angular
  .module('myApp')
  .directive('about', about);

function about () {
  return {
    controller: function(dataFactory) {
        let vm = this;
        vm.selectedTab = (dataFactory.getObj('about').nLink) ? dataFactory.getObj('about').nLink : 'Links';
        vm.tab = (name) => {
          vm.selectedTab = name;
          dataFactory.setObj({key:'about',val:{nLink:name}})
        }
    },
    controllerAs: 'vm',
    templateUrl: '/js/components/about/aboutTpl.html'
  }
}