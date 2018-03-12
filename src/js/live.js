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
    const socket = new WebSocket('ws://localhost:8080')

    socket.addEventListener('open', function (event) {
        socket.send('Hello Server!')
    })

    socket.addEventListener('message', function (event) {
        console.log('Message from server', event.data)
    })
})
