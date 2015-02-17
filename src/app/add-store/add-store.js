/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.addStore', [
    'ui.router',
    'restangular',
    'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'addStore', {
    url: '/add-store',
    views: {
      "main": {
        controller: 'AddStoreCtrl',
        templateUrl: 'add-store/add-store.tpl.html'
      }
    },
    data:{ pageTitle: 'Add Store' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'AddStoreCtrl', function AddStoreController( $scope, Restangular ) {

    var resource = Restangular.allUrl('create', 'http://api.cashcreators.honeycombits.com/stores/create');
    var encodedAuth = window.btoa('username' + ':' + 'password');
    Restangular.setDefaultHeaders({'Authorization': 'Basic ' + encodedAuth });

    $scope.alertMsg = '';

    $scope.addStore = function(){

        resource.post($scope.store).then( function(data) {
            $scope.alertType = 'success';
            $scope.alertMsg = 'Store added successfully';

            $scope.store.data = null;
        }, function(response){
            $scope.alertType = 'danger';
            $scope.alertMsg = response.data.detail;

            $scope.store.data = null;
        });

        $scope.alertType = 'info';
        $scope.alertMsg = 'Processing .. please wait';

    };
})

;

