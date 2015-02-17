/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe( 'add store section', function() {
    var AddStoreController,
        scope,
        $httpBackend,
        $stateParams;

    beforeEach( module( 'ngBoilerplate.addStore' ) );

    beforeEach(inject(function($controller, $rootScope, _$stateParams_, _$httpBackend_) {
        // Set a new global scope
        scope = $rootScope.$new();

        // Point global variables to injected services
        $stateParams = _$stateParams_;
        $httpBackend = _$httpBackend_;

        // Initialize the Articles controller.
        AddStoreController = $controller('AddStoreCtrl', {
            $scope: scope
        });
    }));

    it( '$scope.addStore() with valid form data should send a POST request with the form input values', inject( function() {
        var sampleStorePostData = {
            data: {
                name: 'Store Name',
                keyword: 'Store Keyword!'
            }
        };

        // Fixture mock form input values
        scope.store = {
            data: {
                name: 'Store Name',
                keyword: 'Store Keyword!'
            }
        };

        // Set POST response
        $httpBackend.expectPOST('http://api.cashcreators.honeycombits.com/stores/create', sampleStorePostData).respond({name: 'store-1'});

        // Run controller functionality
        scope.addStore();
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.store.data).toBe(null);
    }));
});

