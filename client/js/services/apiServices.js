/**
 * Created by tnvl6480 on 18/09/2014.
 */
/*Méthode d'appel avec un interceptor http dans app.js afin de positionner le nom du serveur' +
'Il est également possible d'appeler directement l'URL complète, sans interceptor'*/
angular.module('services')
    .factory('Authentification', ['$http', '$window', 'sharedProperties', function ($http, $window, sharedProperties) {
       $http({method: 'GET', url: 'outRPC/'}).
            success(function (data) {
                //code
            }).
            error(function (data) {
                cbError('OUTRPC KO');
            })
        inst.login = function (mail, password, rememberMe, cb, cbError) {
            $http({method: 'POST', url: 'out_rpc/login', data: {email: mail, password: password}}).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    cb(data);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    cbError(data);
                });
        };

    }])
    .factory('ApplicationsSrv', ['$resource', 'sharedProperties', function ($resource, sharedProperties) {
        return $resource('out_rpc/applications/:id', {id: '@id'});
    }])
    .factory('MeSrv', ['$resource', function ($resource) {
        return $resource('out_rpc/users/me', {}, {'query': {method: 'GET', isArray: false}});
    }])
    .factory('userSrv', ['$resource',
        function ($resource) {
            return $resource('out_rpc/users/external/:id', {id: '@_id'},
                {
                    'update': {method: 'PUT'} //permet d'appeler l'update avec un PUT et non un post
                }
            )
        }
    ])
;