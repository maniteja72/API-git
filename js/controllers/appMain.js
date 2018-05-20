/** Application Main Controller **/
function appMain ( $scope, $http){
	$scope.keyword 		= '';
	$scope.repositories = [];
	$scope.showSpinner 	= false;

	$scope.sendQeury 	= function(){

		if( !$scope.showSpinner ){
			
			$scope.repositories = [];

			$scope.query 		= $scope.keyword.replace( / /gi, "+");
			$scope.showSpinner  = true;

			var ownerURL 		= "https://api.github.com/users/" + $scope.query + "/repos" ;
			$http.get(ownerURL).success(function(data){

				$scope.showSpinner 	= false;
				$scope.repositories = data;

				
			}).error(function(errorMessage){

				var repositoriesURL = 'https://api.github.com/search/repositories?q=' + $scope.query;
					$http.get(repositoriesURL).success(function(data){

					$scope.showSpinner 	= false;
					$scope.repositories = data.items;

				});
					
			});

		}

	};

	$scope.sortFieldChanged = function(){
		switch(this.sort_by){
			case "Repository Name":
				$scope.sortByName ();
				break;

			case "Owner Name":
				$scope.sortByOwner();
				break;

			case "Creation Date":
				$scope.sortByCreation();
				break;

		}
		
	}

	$scope.sortByName 		= function(){
		sortTable("result-table", 0);
	}
	$scope.sortByOwner 		= function(){
		sortTable("result-table", 1);
	}
	$scope.sortByCreation 	= function(){
		sortTable("result-table", 2);
	}

};




/**
* Function That sorts HTML Table Assuming that the table contains only 1 tbody tag and there is no colspans in this table
* param: tableID string id attribute of the table needed to be sorted
* param: index of the column which will be used in sorting
**/
function sortTable(tableID, index) {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById(tableID);
	switching = true;
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
	//start by saying: no switching is done:
	switching = false;
	rows = table.getElementsByTagName("TR");
	/*Loop through all table rows (except the
	first, which contains table headers):*/
	for (i = 1; i < (rows.length - 1); i++) {
	  //start by saying there should be no switching:
	  shouldSwitch = false;
	  /*Get the two elements you want to compare,
	  one from current row and one from the next:*/
	  x = rows[i].getElementsByTagName("TD")[index];
	  y = rows[i + 1].getElementsByTagName("TD")[index];
	  //check if the two rows should switch place:
	  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
		//if so, mark as a switch and break the loop:
		shouldSwitch= true;
		break;
	  }
	}
	if (shouldSwitch) {
	  /*If a switch has been marked, make the switch
	  and mark that a switch has been done:*/
	  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	  switching = true;
	}
  }
}