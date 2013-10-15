(function() {

    var module = angular.module('pullreq.service.api', ['lib.lodash']);

    module.factory('apiService', [
        '$http',
        '$q',
        '_',
        function ($http, $q, _) {

            var getPullRequestInfo = function(owner, repo, pullNumber, sha) {
                var url = '/api/pullRequests/'+ owner +'/'+ repo +'/'+ pullNumber +'/info/' + sha;
                var promise = $q.defer();
                var http = $http({
                    method: 'GET',
                    url: url
                });
                http.success(function (repos) {
                    promise.resolve(repos);
                });
                http.error(function (data, status) {
                    if (status) {
                        promise.reject(status);
                    }
                });
                return promise.promise;
            };

            var getPullRequests = function () {
                var promise = $q.defer();
                var http = $http({
                    method: 'GET',
                    url: '/api/pullRequests'
                });
                http.success(function (repos) {
                    _(repos).forEach(function (repo) {
                        repo.status_flags = {};
                    });
                    promise.resolve(repos);
                });
                http.error(function (data, status) {
                    if (status) {
                        promise.reject(status);
                    }
                });
                return promise.promise;
            };

            var getWarningPaths = function() {
                var promise = $q.defer();
                var http = $http({
                    method: 'GET',
                    url: '/api/warningPaths'
                });
                http.success(function (paths) {
                    promise.resolve(paths);
                });
                http.error(function (data, status) {
                    if (status) {
                        promise.reject(status);
                    }
                });
                return promise.promise;
            };

            return {
                getPullRequests: getPullRequests,
                getPullRequestInfo: getPullRequestInfo,
                getWarningPaths: getWarningPaths
            }
        }
    ]);

})();