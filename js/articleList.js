var articleListViewModel = function () {
    var self = this;
    self.pageSize = 6;
    self.currentPage = 1;
    self.artList = ko.observableArray([]);
}

var alModel = new articleListViewModel();
ko.applyBindings(alModel);

var getData = function (pageIndex) {
    var params = {
        url: 'index/index/productlist',
        type: 'get',
        data: {
            limit: alModel.pageSize,
            page: alModel.currentPage,
        },
        sCallback: function (res) {
            // 重置加载flag
            loading = false;
            if (res && res.code == 200) {
                var mappingList = {
                    'create_time': {
                        create: function (options) {
                            return CommonTools.formatDate(options.data);
                        }
                    },
                }

                var newList = res.data.list.data;
                if (res.data.list.current_page == 1) {
                    ko.mapping.fromJS(newList, mappingList, alModel.artList);
                }
                else {
                    var list = alModel.artList();
                    for (var i = 0; i < newList.length; i++) {
                        list.push(newList[i]);
                    }
                    ko.mapping.fromJS(list, mappingList, alModel.artList);
                }

                if (res.data.list.current_page == res.data.list.last_page) {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                    return;
                }
                else{
                    alModel.currentPage++;
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
}

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


