var registerMoreModel = function () {
    var self = this;
    self.educationList = ['大专', '本科', '硕士', '博士', 'MBA', 'EMBA', '中专', '中技', '高中', '初中', '其他'];
    self.selectedEducation = ko.observable("");
    self.bloodTypeList = ['A型', 'B型', 'O型', 'AB型'];
    self.selectedBloodType = ko.observable("");
    self.exerciseList = ['0', '1', '2-3', '4-6', '7及以上'];
    self.selectedExercise = ko.observable("");
    self.selectedSex = ko.observable("male");
    self.locationList = [];
    self.selectedState = ko.observable("");
    self.selectedCity = ko.observable("");
    self.selectedRegion = ko.observable("");
    self.selectedShow = ko.observable("");
    self.name = ko.observable().extend({
        required:{params:true,message:'姓名不能为空'}
    });
    self.mobile = ko.observable().extend({
        pattern: {params:'^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$',message:'请输入合法的手机号码，以“1”开头的11位数字，不要加“086”前缀'}
    });
    self.QQ = ko.observable().extend({
       pattern:{params:'[1-9][0-9]{4,14}',message:'请输入合法的QQ号码，不能以“0”开头的5-15位数字'}
    });
    self.height = ko.observable().extend({
        pattern:{params:'^([0-9]*[1-9][0-9]*)+([.]{1}[0-9]{1,2})?$',message:'最多2位小数'}
    });
    self.weight = ko.observable().extend({
        pattern:{params:'^([0-9]*[1-9][0-9]*)+([.]{1}[0-9]{1,2})?$',message:'最多2位小数'}
    });
    self.address = ko.observable("");
    self.dailyActivities = ko.observable("");
    self.birthday = ko.observable("");

    self.setSex = function (sex) {
        if (sex != self.selectedSex()) {
            self.selectedSex(sex);
        }
    }

    self.setEducation = function (education) {
        if (education != self.selectedEducation()) {
            self.selectedEducation(education);
        }
    }

    self.setState = function (state) {
        if (state != self.selectedState()) {
            self.selectedState(state);
            self.selectedCity("");
            self.selectedRegion("");
        }
    }

    self.setCity = function (city) {
        if (city != self.selectedCity()) {
            self.selectedCity(city);
            self.selectedRegion("");
        }
    }

    self.setRegion = function (region) {
        if (region != self.selectedRegion()) {
            self.selectedRegion(region);
        }
    }

    self.setExercise = function (exercise) {
        if (exercise != self.selectedExercise()) {
            self.selectedExercise(exercise);
        }
    }

    self.setBloodType = function (bloodType) {
        if (bloodType != self.selectedBloodType()) {
            self.selectedBloodType(bloodType);
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

    self.submit = function () {
        if (rmModel.errors().length == 0) {
            var params = {
                url: '#',
                type: 'post',
                tokenFlag: true,
                data: {
                    'name': self.name(),
                    'sex':self.selectedSex(),
                    'education':self.selectedEducation(),
                    'state':self.selectedState().name,
                    'city':self.selectedCity().name,
                    'region':self.selectedRegion(),
                    'address':self.address(),
                    'mobile':self.mobile(),
                    'QQ':self.QQ(),
                    'weight':self.weight(),
                    'height':self.height(),
                    'dailyActivities':self.dailyActivities(),
                    'bloodType':self.selectedBloodType(),
                    'exercise':self.selectedExercise(),
                    'birthday':self.birthday()
                },
                sCallback: function (res) {},
                eCallback: function (e) {
                    console.log("错误");
                }
            };
            console.info(params);
            window.location.href="./foodHabits.html";
        } else {
            rmModel.errors.showAllMessages();
        }
    };
}

var rmModel = new registerMoreModel();

var initLocation = new Promise(function (resolve, reject) {
    var params = {
        sCallback: function (data) {
            rmModel.locationList = data;
            resolve('success');
        },
    };
    CommonTools.getLocation(params);
});

$(function () {
    initLocation.then(function () {
        rmModel.errors = ko.validation.group(rmModel);
        ko.applyBindings(rmModel);
    })
})
