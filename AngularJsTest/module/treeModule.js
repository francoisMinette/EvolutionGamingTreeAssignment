/*
 * treeApplication module file.
 * Everything is this file is related directly to tree module
**/

var treeModule = angular.module("treeApplication", [])

treeModule.controller("TreeCtrl", ['$scope', '$http', '$location', function($scope, $http, $location) {
	
	/* set two attributes that will be used to get and set the tree */
	$scope.databaseLocation = $location.absUrl() + 'resources/database/database.txt';
	$scope.databaseHandler = $location.absUrl() + 'resources/database/database-handler.php';

	/* send a get http get request in order to fill tree object with local database databaseLocation */
	$http.get($scope.databaseLocation)
	.success(function(response) {
		$scope.tree = response;
		if (angular.equals([], $scope.tree))
			$scope.tree = [{"name": "Element.1", "display": true, "displayText": "Hide" , "nodes": [] }];
	})
	.error(function() {
		console.debug('File not found : ' + $scope.databaseLocation);
		$scope.tree = [{"name": "Element.1", "display": true, "displayText": "Hide" , "nodes": [] }];
	});
	
	/* change the state of display boolean and display text value */
	$scope.changeDisplayNodes = function(item) {
		item.display = !item.display;
		item.displayText = 'Show';
		if (item.display)
			item.displayText = 'Hide';
			
	};
	
	/* remove function is recursive too. I goes in all the branches of the tree if needed and removes node if name matches */
	$scope.remove=function(name, nodes) { 
		nodes.forEach(function (item, index) {
			if (item.name == name) {
				nodes.splice(index, 1);
				return;
			} 
			if (item.nodes.length > 0)
				$scope.remove(name, item.nodes);
		});
    };
	
	/* add function simply adds a node to the current item */
    $scope.add = function(item) {
        var post = item.nodes.length + 1;
        var newName = item.name + '.' + post;
		
        item.nodes.push({
				name: newName,
				display: true,
				displayText: 'Hide',
				nodes: []
			});
    };
	
	/* save function will send http post request to database handler with tree as parameter */
	$scope.save = function(newTree) {
		$http.post($scope.databaseHandler, newTree, {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'})
		.error(function() {
			console.debug('Error on saving data to : ' + $scope.databaseHandler);
		})
	};
}]);