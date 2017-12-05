var Section = function(section) {
	var self = this;
	self.name = ko.observable(section.name);
	self.links = ko.observableArray(section.links);
	self.shown = ko.observable(false);
	self.slideOut = ko.observable(false);
	self.delayClose = ko.observable(false);
	self.slideIn = ko.observable(true);
	self.iconify = ko.computed(function() {
		return self.slideIn() && !self.slideOut() && globalSel();
	});
};

var globalSel;

var SectionsModel = function(sectionList) {
	var self = this;
	self.raw = ko.observableArray(sectionList);
	self.list = ko.observableArray([]);
	self.curr = ko.observable('');
	globalSel = ko.observable(false);
	self.hover = function(which) {
		if (self.curr()){
			if (which.name() !== self.curr().name()) {
				self.curr().delayClose(false).shown(false).slideOut(false);
			};
		};
		self.curr(which);
		globalSel(true);
		self.curr().shown(true).slideOut(true).delayClose(true);
	};
	self.unhover = function() {
		var checkTime = function() {
			if (!self.curr().delayClose()) {
				self.curr().shown(false).slideOut(false).delayClose(false);
				self.curr('');
				globalSel(false);
				console.dir(self.curr());
				console.log(self.curr());
			};
		};
		self.curr().delayClose(false);
		var newTimer = setTimeout(checkTime, 500);
	};
	
	self.raw().forEach(function(section) {
		self.list.push(new Section(section));
	});
};