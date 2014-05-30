'use strict';

/**
 * Angucomplete
 * Autocomplete directive for AngularJS
 * By Daryl Rowland
 */

angular.module('angucomplete', [])
	.directive('angucomplete', function($parse, $http) {
		return {
			restrict: 'EA',
			scope: {
				'id': '@id',
				'placeholder': '@placeholder',
				'selectedObject': '=selectedobject',
				'url': '@url',
				'titleField': '@titlefield',
				'descriptionField': '@descriptionfield',
				'imageField': '@imagefield',
				'inputClass': '@inputclass',
				'userPause': '@pause',
				'localData': '=localdata',
				'searchFields': '@searchfields',
				'minLengthUser': '@minlength'
			},
			template: '<div class="angucomplete-holder"><input id="{{id}}_value" ng-model="searchStr" type="text" placeholder="{{placeholder}}" class="{{inputClass}}" ng-keyup="keyPressed($event)"/><div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-show="searching">Searching...</div><div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">No results found</div><div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><div ng-if="result.image && result.image != \'\'" class="angucomplete-image-holder"><img ng-src="{{result.image}}" class="angucomplete-image"/></div><div>{{result.title}}</div><div ng-if="result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div></div></div></div>',
			controller: function($scope) {
				$scope.lastFoundWord = null;
				$scope.currentIndex = null;
				$scope.justChanged = false;
				$scope.searchTimer = null;
				$scope.searching = false;
				$scope.pause = 500;
				$scope.minLength = 3;

				if ($scope.minLengthUser && $scope.minLengthUser != '') {
					$scope.minLength = $scope.minLengthUser;
				}

				if ($scope.userPause) {
					$scope.pause = $scope.userPause;
				}

				$scope.processResults = function(responseData) {
					if (responseData && responseData.length > 0) {
						$scope.results = [];

						var titleFields = [];
						if ($scope.titleField && $scope.titleField != '') {
							titleFields = $scope.titleField.split(',');
						}

						for (var i = 0; i < responseData.length; i++) {
							// Get title variables
							var titleCode = '';

							for (var t = 0; t < titleFields.length; t++) {
								if (t > 0) {
									titleCode = titleCode + " + ' ' + ";
								}
								titleCode = titleCode + "responseData[i]." + titleFields[t];
							}

							// Figure out description
							var description = "";

							if ($scope.descriptionField && $scope.descriptionField != "") {
								eval("description = responseData[i]." + $scope.descriptionField);
							}

							// Figure out image
							var image = "";

							if ($scope.imageField && $scope.imageField != "") {
								eval("image = responseData[i]." + $scope.imageField);
							}

							var resultRow = {
								title: eval(titleCode),
								description: description,
								image: image,
								originalObject: responseData[i]
							}

							$scope.results[$scope.results.length] = resultRow;
						}


					} else {
						$scope.results = [];
					}
				}

				$scope.searchTimerComplete = function(str) {
					// Begin the search

					if (str.length >= $scope.minLength) {
						if ($scope.localData) {
							var searchFields = $scope.searchFields.split(",");

							var matches = [];

							for (var i = 0; i < $scope.localData.length; i++) {
								var match = false;

								for (var s = 0; s < searchFields.length; s++) {
									var evalStr = 'match = match || ($scope.localData[i].' + searchFields[s] + '.toLowerCase().indexOf("' + str.toLowerCase() + '") >= 0)';
									eval(evalStr);
								}

								if (match) {
									matches[matches.length] = $scope.localData[i];
								}
							}

							$scope.searching = false;
							$scope.processResults(matches);
							$scope.$apply();


						} else {
							$http.get($scope.url + str, {}).
							success(function(responseData, status, headers, config) {
								$scope.searching = false;
								$scope.processResults(responseData);
							}).
							error(function(data, status, headers, config) {
								console.log("error");
							});
						}
					}

				}

				$scope.hoverRow = function(index) {
					$scope.currentIndex = index;
				}

				$scope.keyPressed = function(event) {
					if (!(event.which == 38 || event.which == 40 || event.which == 13)) {
						if (!$scope.searchStr || $scope.searchStr == "") {
							$scope.showDropdown = false;
						} else {

							if ($scope.searchStr.length >= $scope.minLength) {
								$scope.showDropdown = true;
								$scope.currentIndex = -1;
								$scope.results = [];

								if ($scope.searchTimer) {
									clearTimeout($scope.searchTimer);
								}

								$scope.searching = true;

								$scope.searchTimer = setTimeout(function() {
									$scope.searchTimerComplete($scope.searchStr);
								}, $scope.pause);
							}


						}

					} else {
						event.preventDefault();
					}
				}

				$scope.selectResult = function(result) {
					$scope.searchStr = result.title;
					$scope.selectedObject = result;
					$scope.showDropdown = false;
					$scope.results = [];
					//$scope.$apply();
				}
			},

			link: function($scope, elem, attrs, ctrl) {

				elem.bind("keyup", function(event) {
					if (event.which === 40) {
						if (($scope.currentIndex + 1) < $scope.results.length) {
							$scope.currentIndex++;
							$scope.$apply();
							event.preventDefault;
							event.stopPropagation();
						}

						$scope.$apply();
					} else if (event.which == 38) {
						if ($scope.currentIndex >= 1) {
							$scope.currentIndex--;
							$scope.$apply();
							event.preventDefault;
							event.stopPropagation();
						}

					} else if (event.which == 13) {
						if ($scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length) {
							$scope.selectResult($scope.results[$scope.currentIndex]);
							$scope.$apply();
							event.preventDefault;
							event.stopPropagation();
						} else {
							$scope.results = [];
							$scope.$apply();
							event.preventDefault;
							event.stopPropagation();
						}

					} else if (event.which == 27) {
						$scope.results = [];
						$scope.showDropdown = false;
						$scope.$apply();
					} else if (event.which == 8) {
						$scope.selectedObject = null;
						$scope.$apply();
					}
				});


			}
		};
	});

'use strict';

angular
	.module('actTitleSkillsApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'angucomplete'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

'use strict';
function go() {
	console.log('foo');
}
angular.module('actTitleSkillsApp')
	.controller('MainCtrl', function($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.occupations = [
		{name: 'Accountants', code: '13-2011.01'},
		{name: 'Accountants and Auditors', code: '13-2011.00'},
		{name: 'Actors', code: '27-2011.00'},
		{name: 'Actuaries', code: '15-2011.00'},
		{name: 'Acupuncturists', code: '29-1199.01'},
		{name: 'Acute Care Nurses', code: '29-1141.01'},
		{name: 'Adapted Physical Education Specialists', code: '25-2059.01'},
		{name: 'Adhesive Bonding Machine Operators and Tenders', code: '51-9191.00'},
		{name: 'Administrative Law Judges, Adjudicators and Hearing Officers',code:'23-1021.00'},
		{name: 'Administrative Services Managers', code: '11-3011.00'},
		{name: 'Adult Basic and Secondary Education and Literacy Teachers and Instructors', code: '25-3011.00'},
		{name: 'Advanced Practice Psychiatric Nurses', code: '29-1141.02'},
		{name: 'Advertising and Promotions Managers', code: '11-2011.00'},
		{name: 'Advertising Sales Agents', code: '41-3011.00'},
		{name: 'Aerospace Engineering and Operations Technicians', code: '17-3021.00'},
		{name: 'Aerospace Engineers', code: '17-2011.00'},
		{name: 'Agents and Business Managers of Artists Performers and Athletes', code: '13-1011.00'},
		{name: 'Agricultural and Food Science Technicians', code: '19-4011.00'},
		{name: 'Agricultural Engineers', code: '17-2021.00'},
		{name: 'Agricultural Equipment Operators', code: '45-2091.00'},
		{name: 'Agricultural Inspectors', code: '45-2011.00'},
		{name: 'Agricultural Sciences Teachers Postsecondary', code: '25-1041.00'},
		{name: 'Agricultural Technicians', code: '19-4011.01'},
		{name: 'Agricultural Workers All Other', code: '45-2099.00'},
		{name: 'Air Crew Members', code: '55-3011.00'},
		{name: 'Air Crew Officers', code: '55-1011.00'},
		{name: 'Air Traffic Controllers', code: '53-2021.00'},
		{name: 'Aircraft Cargo Handling Supervisors', code: '53-1011.00'},
		{name: 'Aircraft Launch and Recovery Officers', code: '55-1012.00'},
		{name: 'Aircraft Launch and Recovery Specialists', code: '55-3012.00'},
		{name: 'Aircraft Mechanics and Service Technicians', code: '49-3011.00'},
		{name: 'Aircraft Structure Surfaces Rigging and Systems Assemblers', code: '51-2011.00'},
		{name: 'Airfield Operations Specialists', code: '53-2022.00'},
		{name: 'Airline Pilots Copilots and Flight Engineers', code: '53-2011.00'},
		{name: 'Allergists and Immunologists', code: '29-1069.01'},
		{name: 'Ambulance Drivers and Attendants Except Emergency Medical Technicians', code: '53-3011.00'},
		{name: 'Amusement and Recreation Attendants', code: '39-3091.00'},
		{name: 'Anesthesiologist Assistants', code: '29-1071.01'},
		{name: 'Anesthesiologists', code: '29-1061.00'},
		{name: 'Animal Breeders', code: '45-2021.00'},
		{name: 'Animal Control Workers', code: '33-9011.00'},
		{name: 'Animal Scientists', code: '19-1011.00'},
		{name: 'Animal Trainers', code: '39-2011.00'},
		{name: 'Anthropologists', code: '19-3091.01'},
		{name: 'Anthropologists and Archeologists', code: '19-3091.00'},
		{name: 'Anthropology and Archeology Teachers Postsecondary', code: '25-1061.00'},
		{name: 'Appraisers and Assessors of Real Estate', code: '13-2021.00'},
		{name: 'Appraisers Real Estate', code: '13-2021.02'},
		{name: 'Aquacultural Managers', code: '11-9013.03'},
		{name: 'Arbitrators Mediators and Conciliators', code: '23-1022.00'},
		{name: 'Archeologists', code: '19-3091.02'},
		{name: 'Architects Except Landscape and Naval', code: '17-1011.00'},
		{name: 'Architectural and Civil Drafters', code: '17-3011.00'}
		];
		$scope.skillmap = [
		  {code: '13-2011.01', skills: ['Active Listening','Mathematics','Reading Comprehension','Writing','Critical Thinking','Speaking','Judgment and Decision Making','Complex Problem Solving','Time Management','Active Learning']},
		  {code: '27-2011.00', skills: ['Active Listening','Speaking','Reading Comprehension','Social Perceptiveness','Critical Thinking','Monitoring','Judgment and Decision Making','Coordination','Time Management','Active Learning']}
        ];
		$scope.$watch('selectedOccupation', function(newValue, oldValue) {
			var index; 
			if($scope.selectedOccupation) {
			  for (index = 0; index < $scope.skillmap.length; ++index) {
			 	  if($scope.skillmap[index].code === $scope.selectedOccupation.originalObject.code) {
					$scope.skills = $scope.skillmap[index].skills;
				  }
			   }
		    }
		});		  
	})
	.directive('occupationSkillsSelector', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/occupation-skills-selector.html'
	};
	})
	.directive('skillListing', function() {	
	return {
		restrict: 'E',
		templateUrl: 'views/skill-listing.html'  
	};
});

