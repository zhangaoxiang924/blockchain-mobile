/**
 * Author：liushaozong
 * Time：2018-03-01
 * Description：about
 */
import {pageLoadingHide, isIos, isAndroid} from '../../libs/js/utils'

pageLoadingHide()

$(function () {
    let iosUrl = 'https://www.pgyer.com/huoxing24_ios'
    let andUrl = 'https://www.pgyer.com/huoxing24_android'
    if (isIos) {
        location.href = iosUrl
    }
    if (isAndroid) {
        location.href = andUrl
    }
})
