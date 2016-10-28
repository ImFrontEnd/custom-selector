(function () {
	'use strict';
	angular
		.module('contralormx')
		.directive('cxSelect', ['$rootScope', 'Connection', 'Contralor', Directive]);

	function Directive() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/selector/selector.html',
			controller: Controller,
			controllerAs: 'selector',
			scope: {
				nid: '@?',
				nclass: '@?',
				source: '@?',
				parent: '=?',
				disabled: '=?',
				data: '=?',
				model: '='
			}
		};
		return directive;

		function Controller($scope, $rootScope, Connection, Contralor) {
			var vm = $scope;
			vm.filter = '';
			vm.list = list;
			vm.selection = selection;
			if (!vm.uid) {
				vm.uid = 'select-' + vm.$id;
			}
			if (vm.source) {
				var company_id = Contralor.storage('company_id');
				vm.data = [];
				if (vm.source === 'compañia-cuentas-contables') {
					var promise = Connection.get(Contralor.api.url[vm.source] + company_id);
					promise.then(function (response) {
						var temp = [];
						angular.forEach(response, function (value) {
							var element = {
								id: value.id,
								name: value.code + ' ' + value.name
							};
							temp.push(element);
						});
						angular.extend(vm.data, temp);
						Contralor.storage(vm.source, temp);
					});
				} else {
					var waiting = Connection.get(Contralor.api.url[vm.source]);
					waiting.then(function (response) {
						angular.extend(vm.data, response);
					});
				}
				var service = Connection.get(Contralor.api.url[vm.source]);
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