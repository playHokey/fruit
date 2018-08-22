$(".row span").click(function () {
    var query = $(this).html();
    window.location.href = "./formulationList.html?query=" + query;
});

