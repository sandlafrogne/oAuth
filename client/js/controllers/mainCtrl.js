/* Contrôleur principal
 ================================================== */
angular.module('controllers', [])
    .controller("MainCtrl", ["$scope", "$routeParams",
        function ($scope, $routeParams) {
            $scope.view = false;

            DZ.init({
                appId: '122865',
                channelUrl: 'http://external.codecademy.com/channel.html',
                player: {
                    onload: function () {
                    }
                }

            })

            albumId=$routeParams.id
            DZ.api('/album/'+albumId, function (json) {
                $scope.artist = json.artist;
                $scope.cover = json.cover;
                $scope.tracks = json.tracks.data;
                var tracks_ids = [];
                for (var prop in $scope.tracks) {
                    tracks_ids.push($scope.tracks[prop].id);
                }
                $scope.tracks_ids = tracks_ids;
                $scope.view = true
                $scope.$apply();
            });
            $('#info .modal-body').html('liste récupérée')
            $('#info').modal("show")


            $scope.play_track = function (index) {
                DZ.player.playTracks($scope.tracks_ids, index, function (response) {
                })
            };
        }
    ])
    .controller("albumsController", ["$scope",
        function ($scope) {
            $scope.view = false;

            DZ.init({
                appId: '122865',
                channelUrl: 'http://external.codecademy.com/channel.html',
                player: {
                    onload: function () {
                    }
                }
            })

            DZ.api('/artist/853/albums', function (json) {
                    $scope.albums = json.data;
                $scope.$apply();
            })

           /* Affichage des covers en slide*/
            $scope.currentIndex = 0;

            $scope.setCurrentSlideIndex = function (index) {
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };
            $scope.prevSlide = function () {
               $scope.currentIndex = ($scope.currentIndex < $scope.albums.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
              $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.albums.length - 1;
            };

            $scope.showPhoto = function (index) {
                $scope.currentIndex = index;
            };

    }])



