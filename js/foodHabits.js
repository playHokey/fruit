var foodHabitsModel = function () {
    var self = this;
    self.isDrink = ko.observable(true);
    self.isSmoke = ko.observable(true);
    self.isSugar = ko.observable(true);
    self.isFastFood = ko.observable(true);
    self.isFiredFood = ko.observable(true);
    self.isMilk = ko.observable(true);
    self.isSalt = ko.observable(true);
    self.isOil = ko.observable(true);
    self.eatingOutList =['0', '1', '2-3', '4-6', '7及以上'];
    self.selectedEatingOut = ko.observable("");
    self.selectedShow = ko.observable("");
    self.illness = ko.observable("");
    self.improve = ko.observable("");

    self.setItem = function (item, bool) {
        switch (item) {
            case'drink':
                if (bool != self.isDrink()) {
                    self.isDrink(bool);
                }
                break;
            case'smoke':
                if (bool != self.isSmoke()) {
                    self.isSmoke(bool);
                }
                break;
            case'sugar':
                if (bool != self.isSugar()) {
                    self.isSugar(bool);
                }
                break;
            case'fastFood':
                if (bool != self.isFastFood()) {
                    self.isFastFood(bool);
                }
                break;
            case'firedFood':
                if (bool != self.isFiredFood()) {
                    self.isFiredFood(bool);
                }
                break;
            case'milk':
                if (bool != self.isMilk()) {
                    self.isMilk(bool);
                }
                break;
            case'salt':
                if (bool != self.isSalt()) {
                    self.isSalt(bool);
                }
                break;
            case'oil':
                if (bool != self.isOil()) {
                    self.isOil(bool);
                }
                break;
            case'eatingOut':
                if (bool != self.selectedEatingOut()) {
                    self.selectedEatingOut(bool);
                }
                break;
        }
    }

    self.setShow = function (showItem) {
        if (showItem != self.selectedShow()) {
            self.selectedShow(showItem);
        }
        else if (showItem != "") {
            self.selectedShow("")
        }
    }
}

var fhModel = new foodHabitsModel();

$(function () {
    ko.applyBindings(fhModel);
})
