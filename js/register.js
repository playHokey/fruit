var registerModel = function () {
    var self = this;
    self.phoneNumber = ko.observable().extend({
        required: {params: true, message: '手机号不能为空'},
        pattern: {params:'^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$',message:'请输入合法的手机号码，以“1”开头的11位数字，不要加“086”前缀'}
    });

    self.email = ko.observable().extend({
        email: {params:true,message:'请输入合法的邮箱地址'}
    });

    self.submit = function () {
        if (rModel.errors().length == 0) {
            window.location.href ="./registerMore.html"
        } else {
            rModel.errors.showAllMessages();
        }
    };
}

var rModel = new registerModel();
rModel.errors = ko.validation.group(rModel);
ko.applyBindings(rModel);
