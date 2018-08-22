$(function () {
    "use strict";
    $('#content').artEditor({
        imgTar: '#imageUpload',
        limitSize: 5,   // 兆
        showServer: true,
        uploadUrl: g_restUrl + 'home/user/avatar',
        data: {},
        uploadField: 'image',
        breaks: false,
        placeholader: '',
        validHtml: ["<br/>"],
        formInputId: 'target',
        uploadSuccess: function (res) {
            // 这里是处理返回数据业务逻辑的地方
            // `res`为服务器返回`status==200`的`response`
            // 如果这里`return <path>`将会以`<img src='path'>`的形式插入到页面
            // 如果发现`res`不符合业务逻辑
            // 比如后台告诉你这张图片不对劲
            // 麻烦返回 `false`
            // 当然如果`showServer==false`
            // 无所谓咯
            debugger
            return './image/logo_view.png';
        },
        uploadError: function (status, error) {
            //这里做上传失败的操作
            //也就是http返回码非200的时候
            alert('网络异常' + status)
        }
    });

    $('#content1').artEditor({
        imgTar: '#imageUpload1',
        formInputId: 'target1',
    });
});