var diaryViewModel = function () {
    var self = this;
    self.pageSize = 6;
    self.currentPage = 1;
    self.finish = ko.observable(false);
    self.diaryList = ko.observableArray([]);
}

var dModel = new diaryViewModel();
ko.applyBindings(dModel);

/*var getData = function (pageIndex) {
    var params = {
        url: 'index/index/productlist',
        type: 'get',
        data: {
            limit: dModel.pageSize,
            page: dModel.currentPage,
        },
        sCallback: function (res) {
            // 重置加载flag
            loading = false;
            if (res && res.code == 200) {
                var mappingList = {
                    'create_time': {
                        create: function (options) {
                            return "【活动时间】" + CommonTools.formatDate(options.data);
                        }
                    },
                }

                var newList = res.data.list.data;
                if (res.data.list.current_page == 1) {
                    ko.mapping.fromJS(newList, mappingList, dModel.diaryList);
                }
                else {
                    var list = dModel.diaryList();
                    for (var i = 0; i < newList.length; i++) {
                        list.push(newList[i]);
                    }
                    ko.mapping.fromJS(list, mappingList, dModel.diaryList);
                }

                if (res.data.list.current_page == res.data.list.last_page) {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    dModel.finish(true);
                    return;
                }
                else {
                    dModel.currentPage++;
                }

                $.refreshScroller();
            }
            else {
                alert(res.msg);
            }
        },
        eCallback: function (e) {
            // 重置加载flag
            loading = false;
        }
    };
    CommonTools.getData(params);
}*/
var getData = function (pageIndex) {
    var res = {
        "code": 200,
        "data": {
            "list": {
                "total": 6,
                "per_page": "6",
                "current_page": 1,
                "last_page": 1,
                "data": [{
                    "id": 1,
                    "title": "产品一",
                    "category_id": 3,
                    "description": "",
                    "create_time": 0,
                    "cover_id": 1,
                    "img": "./image/diary_img1.png"
                }, {
                    "id": 2,
                    "title": "产品二",
                    "category_id": 3,
                    "description": "",
                    "create_time": 1522204260,
                    "cover_id": 2,
                    "img": "./image/diary_img1.png"
                }, {
                    "id": 3,
                    "title": "产品三",
                    "category_id": 3,
                    "description": "",
                    "create_time": 1522204284,
                    "cover_id": 3,
                    "img": "./image/diary_img1.png"
                }, {
                    "id": 4,
                    "title": "产品四",
                    "category_id": 3,
                    "description": "",
                    "create_time": 1522204301,
                    "cover_id": 0,
                    "img": "./image/diary_img1.png"
                }, {
                    "id": 5,
                    "title": "产品五",
                    "category_id": 3,
                    "description": "",
                    "create_time": 1522204316,
                    "cover_id": 0,
                    "img": "./image/diary_img1.png"
                }, {
                    "id": 6,
                    "title": "产品六",
                    "category_id": 2,
                    "description": "",
                    "create_time": 1522204335,
                    "cover_id": 4,
                    "img": "./image/diary_img1.png"
                }]
            }
        }
    };
    var mappingList = {
        'create_time': {
            create: function (options) {
                return "【活动时间】" + CommonTools.formatDate(options.data);
            }
        },
    }
    var newList = res.data.list.data;
    if (res.data.list.current_page == 1) {
        ko.mapping.fromJS(newList, mappingList, dModel.diaryList);
    }
    else {
        var list = dModel.diaryList();
        for (var i = 0; i < newList.length; i++) {
            list.push(newList[i]);
        }
        ko.mapping.fromJS(list, mappingList, dModel.diaryList);
    }

    if (res.data.list.current_page == res.data.list.last_page) {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        $.detachInfiniteScroll($('.infinite-scroll'));
        dModel.finish(true);
        return;
    }
    else {
        dModel.currentPage++;
    }

    $.refreshScroller();
};

var loading = false;
// 注册'infinite'事件处理函数
$('.infinite-scroll').on('infinite', function () {
    // 如果正在加载，则退出
    if (loading) return;
    // 设置flag
    loading = true;
    getData();
});

$(function () {
    $.init();
    getData();
});


