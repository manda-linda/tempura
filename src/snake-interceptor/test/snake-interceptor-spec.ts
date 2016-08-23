import '../snake-interceptor';

describe('Snake interceptor as httpInterceptor', function () {

  let snakeInterceptor, $httpBackend, responseData, $http;

  beforeEach(function () {
        angular.mock.module('tempura.services.snakeInterceptor', function($httpProvider){
            $httpProvider.interceptors.push('snakeInterceptor');
        });    
    });

  beforeEach(function() {
      responseData = {
          camel_case: 1,
          more_camel_casing_three: 1,
          _camel: 2,
          case_: 3,
          buried: {
              more_camel: 4
          }
      };
  });


  beforeEach(inject(function ( _snakeInterceptor_, _$httpBackend_, _$http_) {
      snakeInterceptor = _snakeInterceptor_;
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', '/test').respond(responseData);
      $http = _$http_;
  }));

  it('should transform the response data to camel case', function(){
      let result = {
          camelCase: 1,
          moreCamelCasingThree: 1, 
          camel:2,
          case: 3,
          buried: {
              moreCamel:4
          }
      };
     $http.get('/test').then((success)=>{
         expect(success.data).toEqual(result);
     });
     $httpBackend.flush();

  });
   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });
});

describe('Snake Interceptor as responseTransformer', function () {

  let snakeInterceptor, $httpBackend, responseData, $http;

  beforeEach(function () {
        angular.mock.module('tempura.services.snakeInterceptor');    
  });

  beforeEach(function() {
      responseData = {
          camel_case: 1,
          more_camel_casing_three: 1,
          _camel: 2,
          case_: 3,
          buried: {
              more_camel: 4
          }
      };
  });


  beforeEach(inject(function ( _snakeInterceptor_, _$httpBackend_, _$http_) {
      snakeInterceptor = _snakeInterceptor_;
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', '/test').respond(responseData);
      $http = _$http_;
  }));

  it('should work as a transformer', function(){
      let getTransforms = () => {
                let defaults = $http.defaults.transformResponse;

                // We can't guarantee that the default transformation is an array
                defaults = angular.isArray(defaults) ? defaults : [defaults];
                // Append the new transformation to the defaults
                return defaults.concat(snakeInterceptor.responseTransformer);
        };
        let result = {
          camelCase: 1,
          moreCamelCasingThree: 1, 
          camel:2,
          case: 3,
          buried: {
              moreCamel:4
          }
      };
      $http({
          url: '/test',
          method: 'GET',
          transformResponse: getTransforms()
      }).then((response)=> {
        expect(response.data).toEqual(result);
    });

    $httpBackend.flush();

  })

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });
});
