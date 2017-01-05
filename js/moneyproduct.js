 /*
 * @Author: zhengwei
 * @Date:   2016-10-24 22:14:54
 * @Last Modified by:   zwxs
 * @Last Modified time: 2016-11-04 22:04:31
 */

'use strict';
$(function() {
    setProductList($('.money-product'), $.getUrlParam('productid'))

    function setProductList(dom, productid, callback) {       
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrlproduct",
            data: { 'productid': productid },
            success: function(data) {
                var html = template("moneyProduct",data);
                dom.html(html);
            }
        })
    }
});
