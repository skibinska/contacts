(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ModalContactController', controllerFn);

    function controllerFn(contact, $log, $uibModalInstance) {
        var vm = this;
        vm.contact = angular.copy(contact);
        vm.cancel = cancel;
        vm.confirm = confirm;

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function confirm() {
            if (vm.editForm.$valid) {
                applyChanges();
                $uibModalInstance.close();
            } else {
                $log.error('Invalid form data ', vm.editForm.$error);
            }
        }

        function applyChanges() {
            for (var property in vm.contact) {
                if (vm.contact.hasOwnProperty(property)) {
                    //console.info(property, 'new', vm.contact[property], 'old', contact[property]);
                    contact[property] = vm.contact[property];
                }
            }
        }
    }
})();