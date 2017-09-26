(function() {
  'Use strict';
  angular.module('app')
    .component('dashboard', {
      templateUrl: '/javascripts/dashboard/dashboard.html',
      controller: controller
    });

  controller.$inject = ['$scope', '$http'];

  function controller($scope, $http) {
    const vm = this;
    vm.$onInit = onInit;

    function onInit() {

      //check if user is authenticated
      //TODO Render 401 error
      $http.get('/confirm-login').success(function(session) {
        $scope.user = session.passport.user;
        //TODO check if user has a destination

        //TODO if user has a destination render timeline

        //TODO else render destination picker

      });

      //load map data
      $(".container").mapael({
        map: {
          name: "world_countries_miller",
          defaultArea: {
            attrs: {
              fill: "#4ABDAC",
              stroke: "#DFDCE3"
            },
            attrsHover: {
              fill: "#F7B733"
            }
          }
        }
      });

      //add event listener => get destination from map click
      $("path").click(function() {
        let countryCode = $(this).attr("data-id");
        $http.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`).success(function(countryData) {
          $scope.destination = countryData.name;
          if (countryCode === 'US' || countryCode === 'RU') {
            $scope.destination = `the ${countryData.name}`;
          } else if (countryData.name.includes('(')) {
            $scope.destination = countryData.name.replace(/ *\([^)]*\) */g, "");
          }
          dashboardUtil.getTweetsByCountry(countryData.name).then(function(twitterResults){
            console.log(twitterResults.data);
            let twitterURLArray = twitterResults.data.map(function(tweet){
              return `{https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}}`
            });

            // let reducedTwitterURLs = twitterURLArray.reduce(function(a,b){
            //   if (a.indexOf(b) === -1) {
            //     a.push(b);
            //   }
            //   return a;
            // }, []);
            console.log(twitterURLArray);
            $scope.tweets = twitterURLArray;
            twttr.widgets.load();
          });
        });
      });

    }

    let dashboardUtil = {
      getTweetsByCountry : function(countryName, index){
        return $http.get(`/dashboard/api/country/${countryName}`);
      }
    };

    vm.embedTweet = function(tweetURL,index){
      console.log(tweetURL, index);
        $.ajax({
          url: `https://publish.twitter.com/oembed?url=${tweetURL}`,
          dataType:"jsonp",
          success: function(result){
            $(`#${index}`).inner(result)
          }
        })
    }
  }

}());
