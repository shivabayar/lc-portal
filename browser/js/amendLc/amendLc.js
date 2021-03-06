app.config(function($stateProvider) {
    $stateProvider.state('amendLc', {
        templateUrl: 'js/amendLc/amendLc.html',
        controller: 'amendLcCtrl',
        url: '/amend/:lc_number',
        resolve: {
            letter: (lcFactory, $stateParams) => {
                return lcFactory.getSingleLetter($stateParams.lc_number).then(letter => {
                    return letter
                })
            }
        }
    })
});

app.controller('amendLcCtrl', ($scope, lcFactory, countryFactory, userFactory, bankFactory, letter, $state, LETTER_EVENTS, $rootScope) => {
    $scope.letter = letter
    console.log($scope.letter)
    $scope.updateLc = () => {
        $scope.letter.amendedCount++
            $scope.letter.state = 3
        $scope.approved = "00"
        lcFactory.updateLetterFile($scope.letter, $scope.updatedFile).then(letter => {
            $state.go('singleLc', {
                lc_number: letter.lc_number
            })

        })
    }

    //get banks
    bankFactory.getBanks({}).then(banks => {
            $scope.banks = banks
        })
        //get countries
    countryFactory.getCountries({}).then(countries => {
            $scope.countries = countries
        })
        //get picusers
    userFactory.getUsers({
            role: 1
        }).then(picUsers => {
            $scope.picUsers = picUsers
        })
        //get cspusers
    userFactory.getUsers({
            role: 2
        }).then(cspUsers => {
            $scope.cspUsers = cspUsers
        })
        //get clients
    userFactory.getUsers({
        role: 0
    }).then(clients => {
        $scope.clients = clients
        console.log($scope.clients)
    })
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

})