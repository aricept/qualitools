var Section = function(section) {
	var self = this;
	self.name = ko.observable(section.name);
	self.links = ko.observableArray(section.links);
	self.shown = ko.observable(false);
	self.slideOut = ko.observable(false);
	self.closing = ko.observable(false);
	self.hideAll = section.hideAll;
	self.delayClose = ko.observable(false);
	self.showLinks = function() {
		self.shown(true);
		var slider = setTimeout(self.slideOut, 50, true);
	};
	self.hideOne = function() {
		self.shown(false);
		self.slideOut(false);
		self.delayClose(false);
	};
	self.childWidth = function() {
		return $( ".shown" ).width();
	};
};

var SectionsModel = function(sectionList) {
	var self = this;
	self.raw = ko.observableArray(sectionList);
	self.list = ko.observableArray([]);
	self.curr = ko.observable();
	self.hover = function(which) {
		if (which !== self.curr()) {
			self.list().forEach(function(section){
				section.delayClose(false);
				section.shown(false);
				section.slideOut(false);
			});
			which.shown(true);
			which.slideOut(true);
			which.delayClose(true);
		};
	};
	self.unhover = function(which) {
		var checkTime = function() {
			if (!which.delayClose()) {
				which.shown(false);
				which.slideOut(false);
				which.delayClose(false);
			};
		};
		which.delayClose(false);
		var newTimer = setTimeout(checkTime, 500);
	};
	
	self.raw().forEach(function(section) {
		self.list.push(new Section(section));
	});
	
};