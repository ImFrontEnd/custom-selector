(function () {
	'use strict';
	angular
		.module('myApp')
		.directive('Selector', ['$rootScope', 'Connection', 'Utils', Directive]);

	function Directive() {
		var directive = {
			restrict: 'E',
			templateUrl: '/selector.html',
			controller: Controller,
			controllerAs: 'selector',
			scope: {
				uid: '@?',
				nclass: '@?',
				source: '@?',
				parent: '=?',
				disabled: '=?',
				data: '=?',
				model: '='
			}
		};
		return directive;

		function Controller($scope, $rootScope, Connection, Utils) {
			var vm = $scope;
			vm.filter = '';
			vm.list = list;
			vm.selection = selection;
			if (!vm.uid) {
				vm.uid = 'select-' + vm.$id;
			}
			if (vm.source) {
				var company_id = Utils.storage('company_id');
				vm.data = [];
				var waiting = Connection.get(Utils.api.url[vm.source]);
					waiting.then(function (response) {
						angular.extend(vm.data, response);
					});
				var service = Connection.get(Utils.api.url[vm.source]);
				service.then(function (response) {
					angular.extend(vm.data, response);
				});
			}
			if (vm.disabled) {
				vm.list = undefined;
				vm.selection = undefined;
			}
			return vm;

			function list() {
				toogleList(event, 'list');
				event.stopImmediatePropagation();
			}

			function selection(element) {
				var propagation = $rootScope.$broadcast('choose', element, vm);
				if (!propagation.defaultPrevented) {
					vm.model = element;
				}
				toogleList(event, 'selection');
				event.stopImmediatePropagation();
			}

			function toogleList(e) {
				var $parent = angular.element(e.currentTarget).parents('.select'),
					$list = $parent.children('.list'),
					$doc = angular.element(document);
				$list.toggleClass('hidden');
				if ($list.is('.hidden')) {
					$doc.off('click');
				} else {
					$doc.click(function () {
						$list.toggleClass('hidden');
						$doc.off('click');
					});
				}
			}
		}
	}

})();