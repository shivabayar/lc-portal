app.config(function($stateProvider) {
    $stateProvider.state('editCustomer', {
        templateUrl: 'js/admin/customerList/editCustomer.html',
        controller: 'editCustomerCtrl',
        url: '/editCustomer/:userId',
        resolve: {
            user: (userFactory, $stateParams) => {
                return userFactory.getSingleUser($stateParams.userId).then(user => {
                    //remember to shortcircuit if it's not a customer
                    return user
                })
            },
        }
    })
});

app.controller('editCustomerCtrl', function($scope, userFactory, $state, user, $rootScope, LETTER_EVENTS, lcFactory) {
    $scope.user = user
    $scope.updateUser = (user) => {
        userFactory.updateUser(user).then(user => {
            $state.go('customerList')
        })
    }
    $scope.state = {
        1: 'New',
        2: 'Reviewed',
        3: 'Amended',
        4: 'Frozen',
        5: 'Pending Update'
    }
    var refreshLetters = () => {
        lcFactory.getLetters({}).then(letters => {
            $scope.letters = letters
            $scope.New = []
            $scope.Reviewed = []
            $scope.Amended = []
            $scope.Frozen = []
            $scope.Update = []
            $scope.letters = letters
                //set states
            $scope.letters.forEach(letter => {
                $scope[$scope.state[letter.state]].push(letter)
            })
            $scope.Frozen.forEach(frozen => {
                if (frozen.finDoc === 0) $scope.Update.push(frozen)
            })
        })
        lcFactory.getExpiringLetters({}).then(expiring => {
            $scope.Expiring = expiring[0]
        })
    }
    $rootScope.$on(LETTER_EVENTS.refreshLetters, refreshLetters);

    refreshLetters();
});