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

function loadSections(data) {
	var raw = JSON.stringify(data, null, 4);
	/*$( ".results" ).innerText(raw);*/
};

var Section = function(section) {
	var self = this;
	self.name = ko.observable(section.name);
	self.img = section.img;
	self.links = ko.observableArray(section.links);
};

var SectionsModel = function(sectionList) {
	var self = this;
	self.raw = ko.observableArray(sectionList);
	self.list = ko.observableArray([]);
	self.curr = ko.observable('');
	self.selCurr = function(data) {
		self.curr(data);
		self.globalSel(true);
	};
	self.globalSel = ko.observable(false);
	self.adding = ko.observable(false);
	self.add = function(b) {
		var n = {
			desc: "",
			url: ""
		};
		self.curr().links.push(n);
	};
	self.addSec = function() {
		var a = {
			name: "",
			img: "",
			links: [
				{
					desc: "",
					url: ""
				}
			]
		};
		self.list.push(new Section(a));
		self.selCurr(self.list()[self.list().length-1]);
	};
	self.save = function() {
		var raw = JSON.stringify(ko.toJS(self.list()), null, 4);
		$( ".results" ).text(raw);
		self.globalSel(false);
	};
	self.hover = function(which) {
		if (self.curr()){
			if (which.name() !== self.curr().name()) {
				self.curr().delayClose(false).shown(false).slideOut(false).slideT(false);
			};
		};
		self.curr(which);
		self.globalSel(true);
		self.curr().slideOut(true);
		self.curr().slideTimer(true)
		self.curr().shown(true).delayClose(true);
	};
	self.unhover = function() {
		var checkTime = function() {
			if (!self.curr().delayClose()) {
				self.curr().slideT(false);
				self.curr().shown(false).slideOut(false).delayClose(false);
				self.curr('');
				self.globalSel(false);
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
	console.dir(self.list());	
};