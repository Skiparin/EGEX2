var carApp = angular.module('DemoApp', ["ngRoute"]);

carApp.controller('CarController', ["CarFactory", function () {
        var cars = [
            {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
            , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
            , {id: 3, year: 2000, registered: new Date(199, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
            , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Air, moon roof, loaded', price: 4799}

        ]

        var self = this;
        self.cars = cars;
        self.title = "Cars Demo App"
        self.predicate = "year"
        self.reverse = false;
        self.nextId = 5;

    }]);

carApp.factory('CarFactory', function () {
    var cars = [
        {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
        , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
        , {id: 3, year: 2000, registered: new Date(199, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
        , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Moon roof', price: 4799}]
    var nextId = 5;
    var getCars = function () {
        return cars;
    }
    var deleteCar = function (id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    }
    var addEditCar = function (newcar) {
        if (newcar.id == null) {
            newcar.id = nextId++;
            cars.push(newcar);
        } else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                }
            }
        }
        console.log(cars);
    };
    return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar
    };
});


carApp.controller('AddCarController', ["CarFactory", "$routeParams", function (CarFactory, $routeParams) {

        var addCar = this;

        addCar.id = $routeParams;

        addCar.cars = CarFactory.getCars();
        console.log(addCar.cars);

        addCar.add = function (car) {
            CarFactory.addEditCar(car);
        }

        addCar.edit = function (editCar) {
            CarFactory.addEditCar(editCar);
        }

    }]);


carApp.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: 'allCars.html',
                controller: "CarController as ctrl"
            })
            .when("/addCar", {
                templateUrl: "addCar.html",
                controller: "AddCarController as Add"
            })
            .when("/editCar/:id", {
                templateUrl: "editCar.html",
                controller: "AddCarController as Add"

            })
});
