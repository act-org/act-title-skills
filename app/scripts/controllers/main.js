'use strict';

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
	})
	.directive('occupationSkillsSelector', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/occupation-skills-selector.html'
	};
});
