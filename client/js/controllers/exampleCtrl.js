
/* Contrôleur avec appel d'un service de factory pour l'appel API
 ================================================== */
angular.module('controllers', [])
.controller("ExampleCtrl", ['$http', '$rootScope', '$scope', '$window', '$location', 'ApplicationsSrv', function ($http, $rootScope, $scope, $window, $location, ApplicationsSrv) {
        ApplicationsSrv.get($scope.appDetails._id,
            function (data) {
                //l'application existe
                // $scope.variable=data
                $('#info .modal-body').html('ok')
                $('#info').modal("show")
            },

            function () {
                //ERREUR lors de la récupération des données
                $('#error').modal - body.html(error.data.message)
                $('#error').modal("show");
                //redirection sur la page d'accueil
                $location.path('/home');
            });

        $scope.isFilter = function (visibility, paramTest) {
            return(visibility == paramTest ? true : false)
        }
    //changement d'onglet (tab) (<div class="tab-pane active" id="toto">)
        $scope.changeTab = function (tabId) {
            $rootScope.currentArtefactTab = tabId;
            $("#" + tabId).addClass("active").siblings().removeClass('active');
            localStorage.setItem($scope.appDetails._id, tabId);
        }
    }]);





