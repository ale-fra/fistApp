angular.module('app', [])
  .config(['$routeProvider', function($routeProvider) {
	    $routeProvider.
	            
	            when('/admin/menuConfig', {templateUrl: 'configMenu.html',   controller: menuConfigCtrl});
	            
	}])
	.directive('dividerAppend', function ( $compile) {
	return {
	      restrict: 'A',
	      link: function (scope, element, attrs) {
	    	  if(scope.$index!=0){
	    	  var contentTr = angular.element('<li class=divider></li>');
	    	  $(contentTr).insertBefore(element);
	          $compile(contentTr)(scope);
	    	  }
	      }
	    };
	})
	.factory('menuFactory', function($http,$location) {  
	var listMenu ={};
	return{
		
		getMenuNOREST : function(){
			
			
			
			
			var myMenuOnMongoDB = [
			                       {
			                    	      "Class":"icofont-dashboard",
			                    	      "Permesso":[
			                    	         "all"
			                    	      ],
			                    	      "Template":"home.idex",
			                    	      "Title":"Home",
			                    	      "Url":"/",
			                    	      "subMenu":[

			                    	      ],
			                    	      "order":1
			                    	   },
			                    	   {
			                    	      "Class":"icofont-edit",
			                    	      "Permesso":[
			                    	         "all"
			                    	      ],
			                    	      "Title":"interface",
			                    	      "Url":"/interface",
			                    	      "subMenu":[

			                    	      ],
			                    	      "order":2
			                    	   },
			                    	   {
			                    	      "Class":"icofont-star",
			                    	      "Permesso":[
			                    	         "all",
			                    	         "admin"
			                    	      ],
			                    	      "Title":"admin",
			                    	      "Url":"/admin",
			                    	      "subMenu":[
			                    	         {
			                    	            "Name":"Configura",
			                    	            "ToInclude":"/configuraMenu.html",
			                    	            "actions":[
			                    	               {
			                    	                  "title":"Menu",
			                    	                  "scope":"/menuConfig"
			                    	               }
			                    	            ]
			                    	         }
			                    	      ],
			                    	      "order":99
			                    	   },
			                    	   {
			                    	      "Class":"icofont-magnet",
			                    	      "Permesso":[
			                    	         "all"
			                    	      ],
			                    	      "Title":"form",
			                    	      "Url":"/form",
			                    	      "order":3,
			                    	      "subMenu":[
			                    	         {
			                    	            "Padre":"/form",
			                    	            "Name":"First",
			                    	            "actions":[
			                    	               {
			                    	                  "title":"test_1",
			                    	                  "scope":"/test_1"
			                    	               },
			                    	               {
			                    	                  "title":"test_2",
			                    	                  "scope":"/test_2"
			                    	               },
			                    	               {
			                    	                  "title":"test_3",
			                    	                  "scope":"/test_3"
			                    	               }
			                    	            ]
			                    	         },
			                    	         {
			                    	            "Name":"Second",
			                    	            "actions":[
					                    	               {
						                    	                  "title":"test_4",
						                    	                  "scope":"/test_4"
						                    	               },
						                    	               {
						                    	                  "title":"test_4",
						                    	                  "scope":"/test_4"
						                    	               },
						                    	               {
						                    	                  "title":"test_5",
						                    	                  "scope":"/test_5"
						                    	               }
						                    	            ]
			                    	         }
			                    	      ]
			                    	   }
			                    	];
			
			
			
			
			
			
			
			
			
			
			
			return myMenuOnMongoDB;
		},
		
		getMenu : function(){
		       return $http({
		            url: '/api/menuList',
		            method: 'GET',
//		            cache : true
		        });
		},
		findActive : function(menu){
			for(var subString=$location.path();subString.lastIndexOf("/")>0;subString=subString.substring(0,subString.lastIndexOf("/"))){
		};
			
			
			var hashPath = subString || '/';
			angular.forEach(menu, function(item) {
		        if (hashPath === item.Url){
		        	active = [];
		        	if(item.subMenu.length)
						active.push(item);
		            item.active = true;
		        }else
		            item.active = false; 
	        });
			listMenu = menu;
			console.log(listMenu);
			return menu;
       	},
       	checkMenu: function(){
       		return listMenu;
       	}
		
		
	};
});



function menuConfigCtrl($location,$scope,$http, menuFactory) {    
	alert('arrived');
	
}

function MenuCtrl($location,$scope, menuFactory) {        
//      in my app I call a rest service here i can't xD
//	menuFactory.getMenu().success(function(data){
//		$scope.menu = menuFactory.findActive(data);
//	   }); 
	
	$scope.menu = menuFactory.findActive(menuFactory.getMenuNOREST());
	
	
	$scope.setActive = function(url){
		$location.path(url);
		menuFactory.findActive($scope.menu);
	};
	

  $scope.path = function(){
    //in my app it's work currectly, here i don't know how to make 
    console.log($location.path());
		return $location.path() || "/home";
	};

}

