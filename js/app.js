<!-- vim: set ts=4 sw=4 noet foldmethod=indent: -->
(function() {
	var data  = {},
		files = "blue.jpg cute.jpg eyes.jpg gordi.jpg green.jpg sun.jpg";


	var viewList = {
		init: function() {
		  this.tcompiled = _.template(d3.select('script[data-template="list"]').html());
		  this.render();
		  this.addListeners();
		},

		render: function() { 
			d3.selectAll('#buttons').html((this.tcompiled(octupus.getNames())));
		},

		addListeners: function() {
			d3.selectAll("button").on("click", function() { 
				octupus.showCat(this.innerHTML); 
			});	
		}
	};


	var viewDisplay = {
		init: function() {
		  this.tcompiled = _.template(d3.select('script[data-template="display"]').html());
		},

		render: function(cat) { 
		    d3.selectAll('#display').html(this.tcompiled(cat));
			this.addListener(cat);
		},

		addListener: function(cat) {
			d3.select('#display img').on("click", function() { 
				octupus.updateCat(cat.name); 
			});	
		}
	}


	var octupus = {
		init: function() {
			_.each(files.split(" "), function(fn, idx, list) {
				var name = fn.slice(0, -4);
        		data[name] = 0;
      		});
			viewList.init();
			viewDisplay.init();
    	},

		getNames: function() { 
			return { 'names': _.keys(data) };
		},

		showCat: function(name) { 
			viewDisplay.render({ 'name': name, 'counter': data[name] });
		},

		updateCat: function(name) {
			data[name] += 1;
			viewDisplay.render({ 'name': name, 'counter': data[name] });
		}
  	}

  	octupus.init();

})();

