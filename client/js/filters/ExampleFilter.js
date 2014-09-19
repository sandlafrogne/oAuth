/**
 * Created by tnvl6480 on 18/09/2014.
 */
angular.module('filters', [])
.filter('metadata', function () {
    return function (input) {
        if (input != undefined) {
           //code à remplir
           }
            return input;
        }
})
    //filtre unique ; permet une sorte de group by exemple : par version : |unique:version ne renverra qu'un elt de chaque version
    //usage dans le ng-repeat : |unique: champsquelonveutunique
    .filter('unique', function () {
        return function (items, filterOn) {
            if (filterOn === false) {
                return items;
            }
            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];
                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };
                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;
                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }
                });
                items = newItems;
            }
            return items;
        };
    });
