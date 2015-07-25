/* global define, app, _*/
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
    },

    buildTable: function(el, data, values, ref){
      var $table = $(el);
      _.each(ref, function(mon){
        $table.find('tbody')
          .append($('<tr>')
            .append($('<td style="width:50%">')
              .text(mon)
            )
            .append($('<td>')
              .text(data[mon][values].toFixed(2))
            )
          );   
        
      });
      
    }
  };
});