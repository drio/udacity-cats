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


	var viewAdmin = {
		init: function() {
			this.addListeners();
		},

		addListeners: function() {
			var form = d3.selectAll("#admin_area form");
                inputs = d3.selectAll("#form input[type='text']");

			d3.select("#admin_area #admin").on("click", function() {
				var new_v = form.style('visibility') === 'hidden' ? 'visible' : 'hidden';
				form.style('visibility', new_v); 
				octopus.adminOn();
			});

			d3.select("#form #cancel").on("click", function() {
				_.each(inputs[0], function(e, i, l) { e.value = ''; });
				form.style('visibility', 'hidden'); 
			});

			d3.select("#form #submit").on("click", function(e) {
				var args = _.object(["name", "url", "counter"], _.pluck(inputs[0], 'value'));
				args.counter = +args.counter;
				octopus.changeCat(args);
			});

		},

		update: function(cat) {
			d3.selectAll("#form input[name='name']").property("value", cat.name);
			d3.selectAll("#form input[name='url']").property("value", cat.url);
			d3.selectAll("#form input[name='counter']").property("value", cat.counter);
		}
	};


	var viewList = {
		init: function() {
		  this.tcompiled = _.template(d3.select('script[data-template="list"]').html());
		  this.render();
		  this.addListeners();
		},

		render: function() { 
			d3.selectAll('#buttons').html((this.tcompiled(octopus.getNames())));
		},

		addListeners: function() {
			d3.selectAll("button.b_list").on("click", function() { 
				octopus.showCat(this.innerHTML); 
			});	
		}
	};


	var viewDisplay = {
		init: function() {
		  this.tcompiled = _.template(d3.select('script[data-template="display"]').html());
		  this.render();
		},

		render: function() { 
			var cat = octopus.getCurrent();
		    d3.selectAll('#display').html(this.tcompiled(cat));
			this.addListener();
		},

		addListener: function() {
			d3.select('#display img').on("click", function() { 
				octopus.updateCat(); 
			});
		}
	}


	var octopus = {
		init: function() {
			model.load();
			viewList.init();
			viewDisplay.init();
			viewAdmin.init();
    	},

		getCurrent: function() { return model.current; },

		getNames: function() { 
			return model.forTemplateCats();
		},

		showCat: function(name) {
			model.current = model.cats[name];
			viewDisplay.render();
			viewAdmin.update(model.current);
		},

		updateCat: function() {
			model.current.counter += 1;
			viewDisplay.render();
			viewAdmin.update(model.current);
		},

		changeCat: function(cat) {
			delete model.cats[model.current.name];
			model.cats[cat.name] = cat;
			model.current = cat;
			viewList.init();
			viewDisplay.init();
		},

		adminOn: function() {
			viewAdmin.update(model.current);
		}
  	}

  	octopus.init();

})();

