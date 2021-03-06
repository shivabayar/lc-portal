app.factory('countryFactory', function($http, $q) {
    var d = {}
        //Fetches
    d.getCountries = (query) => {
        return $http.get('/api/countries/', {
            params: query
        }).then((response) => {
            return response.data
        }).catch(err => {
            return $q.reject({
                message: err
            })
        })
    }
    d.getSingleCountry = (id) => {
        return $http.get(`/api/countries/${id}`)
            .then(response => {
                return response.data
            }).catch(err => {
                return $q.reject({
                    message: err
                })
            })
    }

    //End Fetches

    //Sets
    d.createCountry = (Country) => {
        return $http.post('/api/countries/')
            .then(response => {
                return response.data
            }).catch(err => {
                return $q.reject({
                    message: err
                })
            })
    }

    //End Sets

    //Updates
    d.updateCountry = (country) => {
        return $http.put(`/api/countries/`, country)
            .then(response => {
                return response.data
            }).catch(err => {
                return $q.reject({
                    message: err
                })
            })
    }

    //End Updates

    //Deletes
    d.deleteCountry = (query) => {
        return $http.delete(`/api/countries/`, {
            params: query
        }).then(response => {
            return response.data
        }).catch(err => {
            return $q.reject({
                message: err
            })
        })
    }

    //End Deletes
    return d
});