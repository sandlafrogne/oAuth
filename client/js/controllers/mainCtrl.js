/* Contrôleur principal
 ================================================== */


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

            albumId = $routeParams.id
            //console.log('albumId : ' + albumId)
            DZ.api('/album/' + albumId, function (json) {
                console.log(json)
                $scope.cover = json.cover;
                $scope.tracks = json.tracks.data;
                //console.log(json.tracks.data)
                var tracks_ids = [];
                for (var prop in $scope.tracks) {
                    tracks_ids.push($scope.tracks[prop].id);
                }
                $scope.tracks_ids = tracks_ids;
                $scope.view = true;
                $scope.$apply();
            });
            $('#info .modal-body').html('liste récupérée')
            $('#info').modal("show")

            $scope.play_track = function (index) {
                DZ.player.playTracks($scope.tracks_ids, index, function (response) {
                    console.log(LOGNS, "track list", response.tracks);
                })
            };

            $scope.currentIndex = 0;

            $scope.setCurrentSlideIndex = function (index) {
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.prevSlide = function () {
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
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
            /*recherche des albums de Thomas Fersen*/
            DZ.api('/artist/853/albums', function (json) {
                $scope.albums = json.data;
                $scope.$apply();
            })
            /* Affichage des covers en   slide*/
            $scope.currentIndex = 0;
            $scope.direction='left';


            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };
            $scope.prevSlide = function () {
                $scope.direction = 'left';
                $scope.currentIndex = ($scope.currentIndex < $scope.albums.length - 1) ? ++$scope.currentIndex : 0;
            };
            $scope.nextSlide = function () {
                $scope.direction = 'right';
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.albums.length - 1;
            };
            $scope.showPhoto = function (index) {
                $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
                $scope.currentIndex = index;
            };
        }])


    .animation('.slide-animation2', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();
                console.log('elt de before' + element)
                if (className == 'ng-hide') {
                    var finishPoint = element.parent().parent().parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 2, {left: finishPoint, onComplete: done });
                    //rétrécissement de l'image qui part
                    TweenMax.staggerTo(element, 1,  {scale:0.2, opacity:0.3}, 0.25);
                }
                else {
                    done();
                }
            },

           /* beforeRemoveClass : function(element, className, done) {
                var scope = element.scope();
                TweenMax.staggerTo(element, 0,  {scale:1, opacity:1}, 0.25);
            },*/
            removeClass: function (element, className, done) {
                var scope = element.scope();
                console.log('elt de remove'+element)
                if (className == 'ng-hide') {

                    element.removeClass('ng-hide');
                    var startPoint = element.parent().parent().parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }
                    /*entrée de l'image par la droite ou la gauche, suivant si c'est un
                     clic flèche gauche ou droite ou dans la timeline si c'est un album précédent ou suivant*/
                    TweenMax.staggerTo(element, 0,  {scale:0.2, opacity:0.3}, 0.25);
                    TweenMax.fromTo(element, 4, { left: startPoint }, {left: 0, onComplete: done });
                    //agrandissement de l'image qui arrive si elle a été réduite précédemment
                    TweenMax.staggerTo(element, 1,  {scale:1, opacity:1}, 0.25);
                }
                else {

                    done();
                }
            }
        };
    })
