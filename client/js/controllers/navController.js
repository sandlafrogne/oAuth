/**
 * Created by tnvl6480 on 18/09/2014.
 */
angular.module('controllers')
    .controller('navController', ['$scope','$window','$location','sharedProperties',function ($scope,$window,$location,sharedProperties) {

        $scope.$back = function(){
            $window.history.back();
        };

        $scope.updateSearch = function(){
            sharedProperties.setCurrentSearch($scope.search);
        }

        $scope.resetSearch = function(){
            $scope.search = "";
            $scope.updateSearch();
        }

        $scope.$watch(function() {
            return $location.path();
        }, function(){
            $scope.isHome = $location.path() == "/home";
        });

        $scope.$watch(function() {
            return sharedProperties.isConnected();
        }, function(){
            $scope.isConnected = true;
        });


        $scope.$watch(function() {
            return sharedProperties.isExternal();

        }, function(){
            $scope.isExternal = sharedProperties.isExternal();
        });

    }]);