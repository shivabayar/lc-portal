app.config(function($stateProvider) {
    $stateProvider.state('listManager.reviewed', {
        templateUrl: 'js/listManager/reviewed/reviewed.html',
        controller: 'reviewedCtrl',
        url: '/listManager/reviewed',
        parent: 'listManager',
        // data: {
        //     authenticate: true
        // },
        resolve: {}
    })
});

app.controller('reviewedCtrl', ($scope, lcFactory, letters, $state) => {
    $scope.displayLetters = $scope.letters.filter(letter => {
        return letter.state === 2
    })
    $state.transition = (lc_number) => {
        $state.go('singleLc', {
            lc_number: lc_number
        })
    }
});