/* global define, app*/
define([],

  function() {

  return {

    showResults: function(){
      $('.resultsSmall-container').show();
      $('#resultsSmall').show();
    },

    hideResults: function(){
      $('.resultsSmall-container').hide();
      $('#resultsSmall').hide();
    }
  };
});