/*
 * @Author: zhengwei
 * @Date:   2016-10-20 10:29:50
 * @Last Modified by:   zwxs
 * @Last Modified time: 2016-10-27 17:00:05
 */

'use strict';
$(function() {
    //  根据分类页面中a标签出入的参数，
    setProductListTitle($('.product-list-title'), $.getUrlParam('categoryid'));
    setProductList($("#product-list > .product-list"), $.getUrlParam('categoryid'), $.getUrlParam('pageid'));

    function setProductListTitle(dom, categoryid, callback) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorybyid",
            data: {
                "categoryid": categoryid
            },
            success: function(data) {
                data = data.result;
                var titleHtml = "";
                titleHtml += '  <a href="index.html" class="list-title1">首页</a> >'
                titleHtml += '  <a href="category.html" class="list-title2">全部分类</a> >'
                // 在设置标题的时候，已经获取到了category，在下面设置产品列表跳转的时候，需要用到它去拼接跳转路径
                titleHtml += '  <a href="#" class="list-title3" id="category">' + data[0].category + '</a> >'
                titleHtml += '  <a href="" class="select">筛选</a>';
                dom.html(titleHtml);
            }
        });
    }

    function getCategory(categoryid) {
        var category = "";
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorybyid",
            data: {
                "categoryid": categoryid
            },
            success: function(data) {
                data = data.result;
                category = data[0].category;
            }
        });
        return category;
    }

    function setProductList(dom, categoryid, pageid, callback) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            data: {
                "categoryid": categoryid,
                "pageid": pageid
            },
            success: function(data) {
                // 一共多少页
                var pageCount = Math.ceil(data.totalCount / data.pagesize);
                data = data.result;
                var productlistHtml = "<ul>";
                for (var i = 0; i < data.length; i++) {
                    productlistHtml += '<li>';
                    productlistHtml += '<a href="bijia.html?productid=' + data[i].productId + '">';
                    productlistHtml += '<div class="pic">';
                    productlistHtml += data[i].productImg;
                    productlistHtml += '</div>';
                    productlistHtml += '<div class="info">';
                    productlistHtml += '<div class="tit">';
                    productlistHtml += data[i].productName;
                    productlistHtml += '</div>';
                    productlistHtml += '<div class="price">';
                    productlistHtml += '<em>' + data[i].productPrice + '</em>';
                    productlistHtml += '<span class="star"><em class="star5"></em></span>';
                    productlistHtml += '</div>';
                    productlistHtml += '<div class="other">';
                    productlistHtml += '<em>' + data[i].productQuote + '</em>';
                    productlistHtml += '<em>' + data[i].productCom + '</em>';
                    productlistHtml += '</div>';
                    productlistHtml += '</div>';
                    productlistHtml += '</a>';
                    productlistHtml += '</li>';
                }
                productlistHtml += "</ul>";
                productlistHtml += '<div class="clearfix page">';
                productlistHtml += '<span class="w33">' + '<a href="productlist.html?categoryid=' + categoryid + '&category=' + $('#category').html() + '&pageid=' + (pageid - 1) + '">上一页</a></span>';
                productlistHtml += '<span class="w33"><select id="selectPage" name="select"  selected style="border: 1px solid #bababa; font-size: 16px; padding: 8px 15px; height: 36px"">';
                // 加载完成所有的option标签
                for (var i = 0; i < pageCount; i++) {
                    if (pageid == i + 1) {
                        productlistHtml += '<option value="' + Number(i + 1) + '" selected>' + Number(i + 1) + '/' + Number(pageCount) + '</option>';
                    } else {
                        productlistHtml += '<option value="' + Number(i + 1) + '">' + Number(i + 1) + '/' + Number(pageCount) + '</option>';
                    }
                }
                productlistHtml += '</select></span>'
                productlistHtml += '<span class="w33"><a href="productlist.html?categoryid=' + categoryid + '&category=' + $('#category').html() + '&pageid=' + (Number(pageid) + 1) + '" >下一页</a></span>'
                productlistHtml += '</div>'
                dom.html(productlistHtml);
                $('#selectPage').on('change', function(e) {
                    window.location.href = 'productlist.html?categoryid=' + $.getUrlParam('categoryid') + '&category=' + $('#category').html() + '&pageid=' + $(this).val();
                    $(this).attr('selected', "selected");
                })
            }
        })
    }
});
(function($) {
    // 获取url参数
    $.getUrlParam = function(name) {
        // 构造一个含有目标参数的正则表达式对象
        // 这个正则是寻找&+url参数名字=值+&，&可以不存在。
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // 匹配目标参数
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);