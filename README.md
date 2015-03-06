# pubsub
Lightweight publishing/subscribe module with dev logging.

### Pubsub usage

To subscribe to an event:

````
pubsub.subscribe( 'someEvent', function(data) { console.log(data) } );
````

Or, probably more often:

````
var someFunction = function(data) { console.log(data) };
pubsub.subscribe( 'someEvent', someFunction);
````

Or, to only subscribe once:

````
pubsub.once( 'something', function(data) { console.log(data) } );
````

To publish the event:

````
pubsub.publish( 'someEvent', { some: 'data' });
````

To unsubscribe:

````
pubsub.unsubscribe( 'something', function(data) { console.log(data) });
````

Or:

````
pubsub.unsubscribe( 'something', someFunction);
````

You can also pass in arguments as an array to the function you
are subscribing by adding a 3rd 'context' argument that gets
bound to the function you pass in in the 2nd argument. e.g.

````
var x = 5;
var newFunction = function(x) { return x; };
pubsub.subscribe('newEvent', newFunction, x);
pubsub.publish('newEvent', {extra: 'data'});  =>  returns 5
````

What's more, you can also chain any of the pubsub commands, e.g.

````
pubsub
  .subscribe('event1', somefunction)
  .publish('event2', {some: 'data'})
````
