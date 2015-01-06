<!-- vim: set ts=4 sw=4 noet foldmethod=indent: -->
(function() {

	var model = { 
		files: "blue.jpg cute.jpg eyes.jpg gordi.jpg green.jpg sun.jpg",
		cats: {},
		load: function() {
			var cats = this.cats;
			_.each(this.files.split(" "), function(fn, idx, list) {
				cats[fn.slice(0, -4)] = 0;
			});
		},
		forTemplateCats: function() { return { names: _.keys(this.cats) } },
		forTemplateCat: function(cat_name) { 
			return { name: cat_name, counter: this.cats[cat_name] };
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
			model.load();
			viewList.init();
			viewDisplay.init();
    	},

		getNames: function() { 
			return model.forTemplateCats();
		},

		showCat: function(name) { 
			viewDisplay.render(model.forTemplateCat(name));
		},

		updateCat: function(name) {
			model.cats[name] += 1;
			viewDisplay.render(model.forTemplateCat(name));
		}
  	}

  	octupus.init();

})();

