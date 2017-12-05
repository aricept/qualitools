var Section = function(section) {
	var self = this;
	self.name = ko.observable(section.name);
	self.links = ko.observableArray(section.links);
	self.shown = ko.observable(false);
	self.slideOut = ko.observable(false);
	self.hideAll = section.hideAll;
	self.delayClose = ko.observable(false);
};

var SectionsModel = function(sectionList) {
	var self = this;
	self.raw = ko.observableArray(sectionList);
	self.list = ko.observableArray([]);
	self.curr = ko.observable();
	self.hover = function(which) {
		console.log("hovered: " + which.name());
		console.log(self.curr());
		if (self.curr()){
			if (which.name() !== self.curr().name()) {
				/*self.list().forEach(function(section){
					section.delayClose(false);
					section.shown(false);
					section.slideOut(false);
				});*/
				self.curr().delayClose(false).shown(false).slideOut(false);
			};
		};
			self.curr(which);
			which.shown(true);
			which.slideOut(true);
			which.delayClose(true);
		};
	self.unhover = function() {
		var checkTime = function() {
			if (!self.curr().delayClose()) {
				self.curr().shown(false).slideOut(false).delayClose(false);
				self.curr();
			};
		};
		self.curr().delayClose(false);
		var newTimer = setTimeout(checkTime, 500);
	};
	
	self.raw().forEach(function(section) {
		self.list.push(new Section(section));
	});
	
};