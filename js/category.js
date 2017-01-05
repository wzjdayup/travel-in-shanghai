/*
 * @Author: zhengwei
 * @Date:   2016-10-19 17:07:19
 * @Last Modified by:   zwxs
 * @Last Modified time: 2016-10-27 18:52:10
 */

'use strict';
$(function() {

    // var  = $('#menu');
    // 获取所有的列表标题，并且给标题添加一个titleId
    setCategoryTitle($('#category > .row'));

    function setCategoryTitle(dom, callback) {
        $.ajax({
            "url": "http://mmb.ittun.com/api/getcategorytitle",
            success: function(data) {
                data = data.result;
                var titleHtml = '<ul class="category-title">';
                for (var i = 0; i < data.length; i++) {
                    titleHtml += '<li>';
                    // 这里添加了一个HTML5 data-属性，在js中的使用是titleId。
                    titleHtml += '<a href="javascript:void(0)" data-title-id="' + data[i].titleId + '" style="background-image:url(http://www.zuyushop.com/wap/images/arrow1.gif);">';
                    titleHtml += data[i].title;
                    titleHtml += '</a>';
                    titleHtml += '</li>';
                }
                titleHtml += "</ul>";
                $(dom).html(titleHtml);
                setCategory($('#category > .row > .category-title > li > a'));
            }
        })
    }

    function setCategory(dom, callback) {
        // .one()和.on()是相同的，不同之处在于，对于给定的元素和事件类型，
        // 处理程序在第一次触发事件后会被立即解除绑定
        $(dom).one('click', function() {
                var that = $(this);
                // 以下两句代码仅供测试
                // console.log(that.data());
                // console.log(that.data('titleId'));
                // 给当前title下面的ul列表切换样式显示与隐藏
                $(this).parent().find('ul').toggleClass('hide'); // 这句话有点儿鸡肋，数据都没有加载出来，去哪里找ul
                $.ajax({
                    url: "http://mmb.ittun.com/api/getcategory",
                    data: {
                        // jQuery中.data(name)方法是获取绑定在给定DOM元素上的数据
                        "titleid": $(this).data('titleId'),
                    },
                    success: function(data) {
                        data = data.result;
                        var categoryHtml = '<ul class="category-content clearfix">';
                        for (var i = 0; i < data.length; i++) {
                            categoryHtml += '<li>';
                            categoryHtml += '<a href="productlist.html?categoryid=' + data[i].categoryId + '&category=' + data[i].category + '&pageid=1" data-category-id="' + data[i].categoryId + '">';
                            categoryHtml += data[i].category;
                            categoryHtml += '</a>';
                            categoryHtml += '</li>';
                        }
                        categoryHtml += "</ul>";
                        // 插入标题下面的详情列表ul
                        that.parent().append(categoryHtml);
                    }
                })
            })
            // 当ajax加载数据完成以后，那么每次点击的时候只需要显示隐藏元素就可以了，不需要再发送ajax请求，提升用户体验
        $(dom).on('click', function() {
            $(this).parent().find('ul').toggleClass('hide');
        })
    }
});