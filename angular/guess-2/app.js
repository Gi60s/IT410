(function() {
    "use strict";

    var app = angular.module('app', []);

    app.controller('AppController', ['GuessGame', function(guessGame) {
        var game = guessGame(100);

        Object.defineProperty(this, 'done', {
            enumerable: true,
            configurable: false,
            get: function() {
                return game.done();
            }
        });

        this.guess = 50;

        this.guesses = game.guesses;

        this.remaining = game.remaining;

        this.message = '';

        this.checkGuess = function(e) {
            var result;
            e.preventDefault();

            result = game.makeGuess(this.guess);
            if (result === true) {
                this.message = 'You are so right!';
            } else {
                this.message = 'You need to ' + result;
            }
        };

    }]);

    app.factory('GuessGame', [function() {
        return function(max) {
            var answer;
            var factory = {};
            var guesses;
            var remaining;

            factory.done = function () {
                return remaining === 0;
            };

            factory.guesses = function () {
                return guesses.slice(0);
            };

            factory.remaining = function () {
                return remaining;
            };

            factory.makeGuess = function (number) {
                if (factory.done()) return 'stop trying';

                remaining--;
                guesses.push(number);

                if (number === answer) {
                    remaining = 0;
                    return true;
                } else if (number < answer) {
                    return 'try higher';
                } else {
                    return 'try lower';
                }
            };

            factory.reset = function () {
                answer = Math.round(Math.random() * max);
                guesses = [];
                remaining = 7;
            };

            factory.reset();

            return factory;
        }
    }]);
})();