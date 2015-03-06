(function( p ) {

  var e = p.e = { };

  p.updateDev = function() {
    pubsub['dev'] = window.development;
  }

  p.addFnToArray = function(name, type, f, handler) {
    e[ name ] = e[ name ] || {};
    e[ name ][ type ] = e[ name ][ type ] || []
    e[ name ][ type ].push([handler, f]);
  }

  p.callFnsInArray = function(array, data, name) {
    if (array) {
      var subsLength = array.length;
      if (pubsub.dev) {
        console.log(
          { dispatchedEvent: { name: name, data: data } }
        );
      }
      for (i = 0; i < subsLength; i++) {
        array[subsLength - (i + 1)][1](data);
      }
    }
  }

  p.removeFn = function(array, handler) {
    var checkArray = [];
    for (j = 0; j < array.length; j++) {
      checkArray.push(array[j][0]);
    }
    var i = checkArray.indexOf(handler);
    array.splice(i,1);
    return (i != -1);
  }

  p.publish = function( name, data ) {
    setTimeout(function(){
      pubsub.updateDev();
      if (e[ name ]) {
        pubsub.callFnsInArray(e[ name ][ 'subs' ], data, name);
        pubsub.callFnsInArray(e[ name ][ 'once' ], data, name);
      }
    }, 0)
    return p;
  };

  p.subscribe = function( name, handler, context ) {
    f = function(data){
      handler.bind(context)(data);
      if (pubsub.dev) {
        console.log(
          { recievedEvent: { name: name, handler: handler.prototype, context: context, data: data } }
        );
      };
    };
    pubsub.addFnToArray(name, 'subs', f, handler);
    return p;
  };

  p.once = function( name, handler, context ) {
    f = function(data){
      handler.bind(context)(data);
      pubsub.unsubscribe(name, handler);
      if (pubsub.dev) {
        console.log(
          { recievedEvent: { name: name, handler: handler.prototype, context: context, data: data } }
        );
      }
    };
    pubsub.addFnToArray(name, 'once', f, handler);
    return p;
  };

  p.unsubscribe = function( name, handler) {
    var fnExists = false;
    if (e[ name ]) {
      if (e[ name ][ 'once' ]) {
        fnExists = pubsub.removeFn(e[ name ][ 'once' ], handler);
      } else if (e[ name ]['subs'] && !fnExists) {
        fnExists = pubsub.removeFn(e[ name ][ 'subs' ], handler);
      }
      if (fnExists && pubsub.dev) {
        console.log(
          "Unsubscribed " + handler + " from '" + name + "' event."
        );
      }
    } else if (pubsub.dev){
      console.log(
        "Couldn't unsubscribe. No event by the name '" + name + "'."
      );
    }
    return p;
  };

  pubsub.updateDev();

})( this.pubsub = {} );
