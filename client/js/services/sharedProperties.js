/**
 * Created by tnvl6480 on 18/09/2014.
 */
angular.module('services')
.service('sharedProperties', ['$window', function ($window) {

    var currentSearch = "";

    return {
        isConnected: function () {
            //return ($window.sessionStorage.ext_accessToken || $window.localStorage.ext_accessToken) ? true : false;
            return true
        },
        isExternal: function () {
            //return ($window.sessionStorage.external == 'true' || $window.localStorage.external == 'true') ? false : true;
            return false
        },

        getCurrentSearch: function () {
            return currentSearch;
        },

        setCurrentSearch: function (value) {
            currentSearch = value;
        }
    };
}]);