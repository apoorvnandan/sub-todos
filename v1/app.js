/* 
* version 0.0.1
* created by Apoorv Nandan
*/ 
var app = angular.module('plunker', []);

function Choice(name, children) {
    this.name = name;
    this.checked = false;
    this.children = children || [];
}

var apparel = new Choice('Todos', []);
var loadedData = JSON.parse(localStorage.getItem('user'));
var dataLoaded = false;
if(loadedData){
    var myChoice = convertToChoice(loadedData);
    dataLoaded = true;
}

function convertToChoice(d){
	var root = makeChoice(d[0]);
	return root;
}

function makeChoice(d){
	var ret = new Choice(d.name);
	ret.checked = d.checked;
	var i;
	if(d.children)
	for(i = 0; i < d.children.length; i++){
		ret.children.push(makeChoice(d.children[i]));
	}
	return ret;
}

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  if(!dataLoaded) $scope.myTree = [apparel]; 
  else $scope.myTree = [myChoice]; 
  $scope.saveData = function(){
      localStorage.setItem('user', JSON.stringify($scope.myTree));
  };
});

app.directive('choiceTree', function() {
      return {
          template: '<ul><choice ng-repeat="choice in tree"></choice></ul>',
          replace: true,
          transclude: true,
          restrict: 'E',
          scope: {
              tree: '=ngModel'
          }
      };
});

app.directive('choice', function($compile) {
    return { 
        restrict: 'E',
        template: '<li>' +
        '<span ng-click="choiceClicked(choice)">' +
        '<input type="checkbox" ng-checked="choice.checked"> {{choice.name}}' +
        '</span>' + '<span class="tab"></span>' +
        '<button class="btn btn-default btn-sm" ng-click="add(choice)">Add</button> <button class="btn btn-default btn-sm" ng-click="clear(choice)">Clear</button>' +
        '</li>',
        link: function(scope, elm, attrs) {
            scope.choiceClicked = function(choice) {
                choice.checked = !choice.checked;
                function checkChildren(c) {
                    angular.forEach(c.children, function(c) {
                        c.checked = choice.checked;
                        checkChildren(c);
                    });
                }
                checkChildren(choice);
            };
            scope.clear = function(choice) {
                choice.children=[];
                angular.element(document.getElementById('save')).scope().saveData();
            };
    
            scope.add = function(choice) {
                assign();
                var newName = task;
                clearfield();
                choice.children.push({name: newName,checked: false, children: []});
                angular.element(document.getElementById('save')).scope().saveData();
            };
    
            function updateChildren(e){
                if(e.children.length>0){
                    var childChoice = $compile('<choice-tree ng-model="choice.children"></choice-tree>')(scope)
                    e.append(childChoice);
                }
            }
            updateChildren(elm);
        }
    };
});
