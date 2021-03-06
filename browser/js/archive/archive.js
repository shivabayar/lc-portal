app.config(function($stateProvider) {
    $stateProvider.state('listManager.archive', {
        templateUrl: 'js/archive/archive.html',
        controller: 'archiveCtrl',
        url: '/archive',
        resolve: {
            archivedLetters: (lcFactory) => {
                return lcFactory.getLetters({
                    archived: true
                }).then(archived => {
                    return archived
                })
            }
        }
    })
});

app.controller('archiveCtrl', function($scope, archivedLetters) {
    $scope.letters = archivedLetters

});