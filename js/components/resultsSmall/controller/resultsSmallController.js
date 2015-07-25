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
        var shortMonth = mon.abbr;
        var longMonth = mon.full;
        $table.find('tbody')
          .append($('<tr>')
            .append($('<td style="width:50%">')
              .text(longMonth)
            )
            .append($('<td>')
              .text(data[shortMonth][values].toFixed(2))
            )
          );   
        
      });
      
    }
  };
});