app.config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        url: '/dashboard',
        data: {
            authenticate: true
        },
        resolve: {
            letters: (lcFactory) => {
                return lcFactory.getLetters({}).then(letters => {
                    return letters
                })
            },
            expiring: (lcFactory) => {
                return lcFactory.getExpiringLetters().then(expiring => {
                    return expiring
                })
            }
        }
    })
});

app.controller('dashboardCtrl', function($scope, $state, lcFactory, letters, countryFactory, userFactory, expiring) {
    $scope.letters = letters
    $scope.countries = {}
    countryFactory.getCountries({}).then(countries => {
        countries.forEach(country => {
            $scope.countries[country.id] = country.name
        })
    })
    $scope.customers = {}
    userFactory.getUsers({
        role: 0
    }).then(customers => {
        customers.forEach(customer => {
            $scope.customers[customer.id] = customer.username
        })
    })
    $scope.state = {
        1: 'New',
        2: 'Reviewed',
        3: 'Amended',
        4: 'Frozen',
        5: 'Pending Update'
    }
    $scope.countryFilter = {
        name: "All"
    }
    $scope.customerFilter = {
        name: "All"
    }

    $scope.allCountries = () => {
        $scope.countryFilter = {
            name: "All"
        }
        $scope.filter()
    }
    $scope.allCustomers = () => {
        $scope.customerFilter = {
            name: "All"
        }
        $scope.filter()
    }
    $scope.expiringLetters = expiring[0]

    $scope.reset = (letters) => {
        $scope.New = []
        $scope.Reviewed = []
        $scope.Amended = []
        $scope.Frozen = []
        $scope.Update = []
        $scope.amendedCustomer = 0
        $scope.amendedElite = 0
        $scope.reviewedCustomer = 0
        $scope.reviewedElite = 0
        $scope.Expiring = $scope.expiringLetters
            //set states
        letters.forEach(letter => {
                $scope[$scope.state[letter.state]].push(letter)
            })
            // $scope.Amended.forEach
        $scope.Frozen.forEach(frozen => {
            if (frozen.finDoc === 0) $scope.Update.push(frozen)
        })
        $scope.Amended.forEach(amended => {
            if (amended.approved[0] == "0") $scope.amendedCustomer++
                if (amended.approved[1] == "0") $scope.amendedElite++
        })
        $scope.Reviewed.forEach(reviewed => {
            if (reviewed.approved[0] == "0") $scope.reviewedCustomer++
                if (reviewed.approved[1] == "0") $scope.reviewedElite++
        })
    }
    $scope.filter = () => {
        $scope.New = []
        $scope.Reviewed = []
        $scope.Amended = []
        $scope.Frozen = []
        $scope.Update = []
        $scope.amendedCustomer = 0
        $scope.amendedElite = 0
        $scope.reviewedCustomer = 0
        $scope.reviewedElite = 0
        if ($scope.customerFilter.name !== "All") {
            if ($scope.countryFilter.name !== "All") {
                var letters = $scope.letters.filter(letter => {
                    return letter.client == $scope.customerFilter.filter && letter.country == $scope.countryFilter.filter
                })
                $scope.Expiring = $scope.expiringLetters.filter(letter => {
                    return letter.client == $scope.customerFilter.filter && letter.country == $scope.countryFilter.filter
                })
            } else {
                var letters = $scope.letters.filter(letter => {
                    return letter.client == $scope.customerFilter.filter
                })
                $scope.Expiring = $scope.expiringLetters.filter(letter => {
                    return letter.client == $scope.customerFilter.filter
                })
            }
        } else {
            if ($scope.countryFilter.name !== "All") {
                var letters = $scope.letters.filter(letter => {
                    return letter.country == $scope.countryFilter.filter
                })
                $scope.Expiring = $scope.expiringLetters.filter(letter => {
                    return letter.country == $scope.countryFilter.filter
                })
            } else {
                var letters = $scope.letters
                $scope.Expiring = $scope.expiringLetters
            }
        }
        console.log(letters)
        letters.forEach(letter => {
                $scope[$scope.state[letter.state]].push(letter)
            })
            // $scope.Amended.forEach
        $scope.Frozen.forEach(frozen => {
            if (frozen.finDoc === 0) $scope.Update.push(frozen)
        })
        $scope.Amended.forEach(amended => {
            if (amended.approved[0] == "0") $scope.amendedCustomer++
                if (amended.approved[1] == "0") $scope.amendedElite++
        })
        $scope.Reviewed.forEach(reviewed => {
            console.log(reviewed)
            if (reviewed.approved[0] == "0") $scope.reviewedCustomer++
                if (reviewed.approved[1] == "0") $scope.reviewedElite++
        })

    }

    $scope.filterByCustomer = (customerId, name) => {
        $scope.customerFilter = {
            name: name,
            filter: customerId
        }
        $scope.filter()
    }
    $scope.filterByCountry = (countryId, name) => {
        $scope.countryFilter = {
            name: name,
            filter: countryId
        }
        $scope.filter()
    }
    $scope.reset($scope.letters)

    //inits
    // $scope.letters = letters
    //$scope.analytics = analytics

    //end inits

    //functions to edit and ammend lcs


});