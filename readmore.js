;(function($) {
  var readmore = 'readmore',
      defaults = {
        maxHeight: 500,
        moreLink: '<div class="readmore"><span></i></div>'
      };

  function Readmore( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options) ;
    this._defaults = defaults;
    this._name = readmore;
    this.init();
  }

  Readmore.prototype = {
    init: function() {
	  var $this = this;
      $(this.element).each(function() {
        var current = $(this);
        var maxHeight = $this.options.maxHeight;
        if(current.innerHeight() < maxHeight) {
          return true;
        }
        else {
          current.append($($this.options.moreLink).on('click', function(event) { $this.openSlider(this, current, event) }));
        }
        current.css("height", maxHeight).css("overflow", 'hidden');
      });
    },
    openSlider: function(trigger, element, event)
    {
      event.preventDefault();
      $(element).css({"height": "100%"});
      $(trigger).remove();
    }
  };

  $.fn[readmore] = function( options ) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + readmore)) {
          $.data(this, 'plugin_' + readmore, new Readmore( this, options ));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + readmore);
        if (instance instanceof Readmore && typeof instance[options] === 'function') {
          instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
        }
      });
    }
  }
})(jQuery);
