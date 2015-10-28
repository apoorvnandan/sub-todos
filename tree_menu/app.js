var app = angular.module("myApp", []);

app.controller("TreeController", function($scope) {
	
    $scope.delete = function(data) {
        data.nodes = [];
    };

    $scope.add = function(data) {
        //var post = data.nodes.length + 1;
        assign();
        var newName = task;//data.name + '-' + post;
        data.nodes.push({name: newName, nodes: []});
    };  
	
    $scope.tree = [{name: "ToDos", nodes: []}];
});
