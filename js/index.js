var app = angular.module('App', ['ngSanitize']);

app.filter("sanitize", ['$sce', function ($sce) {
	return function (htmlCode) {
		return $sce.trustAsHtml(htmlCode);
	}
}]);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

	$scope.searchItem;
	$scope.message = "";

	$scope.search = function () {
		$scope.pages = "";
		$scope.message = "";
		$http.jsonp('https://en.wikipedia.org/w/api.php?action=query&generator=search&prop=extracts&exsentences=1&exlimit=max&exintro&explaintext=1&format=json&callback=JSON_CALLBACK&gsrsearch=' + $scope.searchItem)
			.success(function (data) {
				$scope.searchData = data;

				if (!$scope.searchData.hasOwnProperty('query')) {
					$scope.message = "No items came up in the search :\(";
				} else {
					$scope.message = "Here are your search results! :\)";
					$scope.pages = $scope.searchData.query.pages;
				}

			})
			.error(function () {
				$scope.message = "Can't retrieve data";
			});

	};

}]);