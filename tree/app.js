var app = angular.module("todo", []);

app.controller("todoController", function(){
	this.command = "";
	this.draw = function(){
		var instructions = this.command.split(" ");
		if(instructions[0] == "add"){
			var newNode = {};
			newNode.parent = currentNode.name;
			newNode.children = [];
			newNode.curr = 0;
			var newName = "";
			var i;
			for(i = 1; i < instructions.length - 1; i++) newName = newName + instructions[i] + " ";
			newName = newName + instructions[i];
			newNode.name = newName;
			if(currentNode.children) currentNode.children.push(newNode);
			else {
				currentNode.children = [];
				currentNode.children.push(newNode);
			}
		}
		init();
	};
	
});
