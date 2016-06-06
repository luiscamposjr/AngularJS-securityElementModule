'use strict';

/**
 * @author luiscamposjr
 * @e-mail luiscamposjr@gmail.com
 * 
 * Here I developed this AngularJS Directive to manage if some element must be rendered or not according to the roles of the user. 
 * I'm not showing here a complete solution about ROLES management. If you want to see my solution just go to cbfm-spring-angular
 * repository to see the complete solution using Java and Spring-security as back-end.
 * 
 * Example: 
 * 
 * <li security-element="{ROLE_ADMIN, ROLE_USER}">
 * 	Some element from menu
 * </li>
 * 
 * If you want, text me or create an Issue!
 *
 */

angular.module("securityElementModule").directive('securityElement', function($compile, $rootScope){

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			// elementAuthorities array has the list of permissions which was putted on the element as you can see in the example above
			var elementAuthorities = attrs.fwSecurityObject.replace("{", "").replace("}", "").split(",");
			
			// userAuthorities will have the list of permissions which was bring from the user on the backend.
			var userAuthorities = [];
			
			// flag to render or not the element
			var renderElement = false;

			// populating userAuthorities with permissions brought from $rootScope.currentUser.authorities which was setted on login management
			angular.forEach($rootScope.currentUser.authorities, function(value) {
			  this.push(value.authority);
			}, userAuthorities);

			// This code will find out if the permission setted on the element is present on the logged user permissions list. If yes, the flag comes true
			angular.forEach(elementAuthorities, function(authElem) {
				angular.forEach(userAuthorities, function(authUser) {			  
					if(authElem === authUser) {
						renderElement = true;
					}
				});
			});

			// If the user doesn't have the permission the ng-ig will be setted false
			if(!renderElement){
				element.attr('ng-if', renderElement);
	       		$compile(element)(scope);
			}
		}
		
	};

});
