<!-- vim: set ts=4 sw=4 noet foldmethod=indent: -->
(function() {

	var model = { 
		files: "blue.jpg cute.jpg eyes.jpg gordi.jpg green.jpg sun.jpg",

		cats: {},

		current: null,

		load: function() {
			var cats = this.cats;
			_.each(this.files.split(" "), function(fn, idx, list) {
				var name = fn.slice(0, -4);
				cats[name] = { name:name, counter:0, url:"imgs/" + fn };
			});
			this.current = this.cats["blue"];
		},

		forTemplateCats: function() { return { names: _.keys(this.cats) } },

		forTemplateCat: function(cat_name) { 
			return this.cats[cat_name]; 
		}
	};


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
			d3.selectAll("button.b_list").on("click", function() { 
				octupus.showCat(this.innerHTML); 
			});	
		}
	};


	var viewDisplay = {
		init: function() {
		  this.tcompiled = _.template(d3.select('script[data-template="display"]').html());
		  this.render();
		},

		render: function() { 
			var cat = octupus.getCurrent();
		    d3.selectAll('#display').html(this.tcompiled(cat));
			this.addListener();
		},

		addListener: function() {
			d3.select('#display img').on("click", function() { 
				octupus.updateCat(); 
			});
		}
	}


	var octupus = {
		init: function() {
			model.load();
			viewList.init();
			viewDisplay.init();
    	},

		getCurrent: function() { return model.current; },

		getNames: function() { 
			return model.forTemplateCats();
		},

		showCat: function(name) {
			model.current = model.cats[name];
			viewDisplay.render();
		},

		updateCat: function() {
			model.current.counter += 1;
			viewDisplay.render();
		}
  	}

  	octupus.init();

})();

