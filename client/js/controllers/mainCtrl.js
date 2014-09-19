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
            $scope.add = function () {
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
            }
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
                console.log('albums')
                $scope.albums = json.data;
                $scope.$apply();
                console.log($scope.albums)

            })
            $scope._Index = 0;
           	    // if a current image is the same as requested image
                $scope.isActive = function (index) {
                    return $scope._Index === index;
                };

                // show prev image
                $scope.showPrev = function () {
                	        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
                	    };

            	    // show next image
            	    $scope.showNext = function () {
                	        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
                	    };

            	    // show a certain image
            	    $scope.showPhoto = function (index) {
                	        $scope._Index = index;
                	    };

        }])



