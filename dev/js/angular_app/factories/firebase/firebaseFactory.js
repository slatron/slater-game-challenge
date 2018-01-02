angular.module('Challenge').
factory('firebaseFactory', function($firebaseObject) {
  var methods = {};
  var ref = firebase.database().ref();
  var challengeObject = $firebaseObject(ref);

  var boardData = {
    options: ['family'],
    selected: 'family'
  };

  // ==============================================================================================

  function _getEmptySlots() {
    var emptySlots = 0;
    var times = challengeObject[boardData.selected].times;

    // TODO: Refactor _.each to _.reduce
    _.each(challengeObject[boardData.selected], function(game) {
      if (game.played !== undefined) {
        emptySlots += (times - game.played);
      }
    });
    return emptySlots;
  }

  function _getCompletionDate() {
    return moment(new Date(challengeObject.data.completion[boardData.selected]));
  }

  // ==============================================================================================

  methods.getTimeLeftBy = function(by) {
    var timeLeft = _getCompletionDate().diff(moment(), by);
    timeLeft = by === 'months' ? ++timeLeft : timeLeft;
    return _.round(_getEmptySlots() / timeLeft, 1);
  };

  // ==============================================================================================

  methods.getBoardData = function() {
    return boardData;
  };

  methods.selectBoard = function(board) {
    if (boardData.options.indexOf(board) > -1) {
      boardData.selected = board;
    }
  };

  methods.followFirebaseRootObject = function() {
    return challengeObject;
  };

  methods.saveData = function() {
    challengeObject.$save();
  };

  methods.setGameTimes = function(gameId, times) {
    challengeObject[boardData.selected][gameId].played = times;
    methods.saveData();
  };

  // ==============================================================================================

  methods.incrementPlaycount = function(gameId) {
    if (challengeObject[boardData.selected][gameId].played < challengeObject[boardData.selected].times) {
      challengeObject[boardData.selected][gameId].played =
        challengeObject[boardData.selected][gameId].played + 1;
      methods.saveData();
    }
  };

  methods.decrementPlaycount = function(gameId) {
    if (challengeObject[boardData.selected][gameId].played > 0) {
      challengeObject[boardData.selected][gameId].played =
        challengeObject[boardData.selected][gameId].played - 1;
      methods.saveData();
    }
  };

  return methods;
});
