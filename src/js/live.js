/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：js demo index
 */

import {pageLoadingHide} from '../../libs/js/utils'

$(function () {
    pageLoadingHide()
    $('.introduction-btn').on('click', function () {
        $('.introduction-cont').addClass('bounceInRight').removeClass('bounceInLeft')
    })

    $('#left-btn').on('click', function () {
        $('.introduction-cont').removeClass('bounceInRight').addClass('bounceInLeft')
    })
})
