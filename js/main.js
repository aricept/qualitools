
function supportsTransitions() {
	/*credit to the following StackExchange:
	https://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr */
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';

    if (typeof s[p] == 'string') { return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i=0; i<v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }

    return false;
};

var Section = function(section) {
	var self = this;
	self.name = ko.observable(section.name);
	self.links = ko.observableArray(section.links);
	self.img = section.img;
	self.shown = ko.observable(false);
	self.slideOut = ko.observable(false);
	self.slideT = ko.observable(false);
	self.delayClose = ko.observable(false);
	self.slideIn = ko.observable(true);
};

var SectionsModel = function(sectionList) {
	var self = this;
	self.raw = ko.observableArray(sectionList);
	self.list = ko.observableArray([]);
	self.curr = ko.observable('');
	self.globalSel = ko.observable(false);
	self.hover = function(which) {
		if (self.curr()){
			if (which.name() !== self.curr().name()) {
				self.curr().delayClose(false).shown(false).slideOut(false).slideT(false);
			};
		};
		self.curr(which);
		self.globalSel(true);
		self.curr().slideOut(true);
		self.slideTimer(true)
		self.curr().shown(true).delayClose(true);
	};
	self.slideTimer = function(v) {
		if (self.curr().slideT()) {
			return;
		};
		if (supportsTransitions()) {
			var t = setTimeout(function() {
				self.curr().slideT(v);
			}, 200);
		}
		else {
			self.curr().slideT(v);
		}
	};
	self.unhover = function() {
		var checkTime = function() {
			if (!self.curr().delayClose()) {
				self.curr().slideT(false);
				self.curr().shown(false).slideOut(false).delayClose(false);
				self.curr('');
				self.globalSel(false);
			};
		};
		self.curr().delayClose(false);
		var newTimer = setTimeout(checkTime, 500);
	};
	
	self.raw().forEach(function(section) {
		self.list.push(new Section(section));
	});
};