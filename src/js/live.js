/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：js demo index
 */

import {pageLoadingHide, getQueryString} from '../../libs/js/utils'
import {ajaxGet, timestampToTime} from '../js/public/public'
let url = '/push/text/room/list'
let url2 = '/push/text/room/content/list'
let websocketUrl = 'ws://www.huoxing24.com/push/websocket/text'
const htmlPath = ''
$(function () {
    pageLoadingHide()
    $('.introduction-btn').on('click', function () {
        $('.introduction-cont').addClass('bounceInRight').removeClass('bounceInLeft')
    })

    $('#left-btn').on('click', function () {
        $('.introduction-cont').removeClass('bounceInRight').addClass('bounceInLeft')
    })

    // 二维码
    $('#wxBtn').on('click', () => {
        $('.live-shade').addClass('show')
        $('.live-ewm').addClass('show')
    })

    $('#liveShade').on('click', () => {
        $('.live-shade').removeClass('show')
        $('.live-ewm').removeClass('show')
    })
    // 小于10加0
    function timeNum(t) {
        if (t < 10) {
            t = '0' + t
        }
        return t
    }

    const rem = (value) => {
        return (value / 24) + 'rem'
    }

    $('.not-message').css('height', rem(document.body.offsetHeight))

    // 获取直播列表
    let getDetails = (status, pageSize, currentPage) => {
        ajaxGet(url, {
            status: status,
            pageSize: pageSize,
            currentPage: currentPage
        }, (data) => {
            if (data.code === 1) {
                let dataList = data.data.inforList
                let list = ''
                let listText = ''
                dataList.map((item, index) => {
                    switch (item.webcast.status) {
                        case 0:
                            listText = '<font class="c0"></font>'
                            break
                        case 1:
                            listText = '<font class="c1"></font>'
                            break
                        case 2:
                            listText = '<font class="c2"></font>'
                            break
                        default:
                            listText = ''
                    }
                    list += `<div class="list">
                                <a href="${htmlPath}/liveDetails.html?castId=${item.webcast.castId}&status=${item.webcast.status}">
                                    <p class="list-img"><img src=${item.webcast.coverPic} alt=""></p>
                                    <p class="list-text">${item.webcast.title}</p>
                                    <p class="list-state">${listText}</p>
                                </a>
                            </div>`
                })
                $('.live-list').html(list)
            }
        })
    }
    let isCastId = window.location.href.indexOf('castId') !== -1
    let isStatus = window.location.href.indexOf('castId') !== -1
    let castId = getQueryString('castId')
    let status = getQueryString('status')
    if (!isCastId && !isStatus) {
        getDetails(-3, 40, 1)
    }
    let stateText = ''
    if (isCastId && isStatus) {
        switch (status) {
            case '0':
                stateText = '<font class="c0">即将开始</font>'
                break
            case '1':
                stateText = '<font class="c1">直播中...</font>'
                break
            case '2':
                stateText = '<font class="c2">已结束</font>'
                break
            default:
                stateText = ''
        }
        $('.lives-state').html(stateText)
    }
    if (isCastId && status === '2') { // 获取往期内容
        ajaxGet(url2, {
            castId: castId
        }, (data) => {
            let dataArr = data.data
            let contList = ''
            let userMessage = dataArr.room.webcast
            if (data.code === 1) {
                let startTime = timestampToTime(userMessage.createIime).split(' ')
                let year = startTime[0]
                let hour = startTime[1].split(':')
                $('img.banner-img').attr('src', userMessage.backImage)
                $('.introduction-cont p').html(userMessage.desc)
                $('.live-time p span').html(year + ' ' + timeNum(hour[0]) + ':' + timeNum(hour[1]))
                dataArr.contentList.map((item, index) => {
                    let time = timestampToTime(item.content.createTime)
                    contList += `<div class="inform-cont clearfix">
                        <div class="inform-portrait"><img src=${item.user.headUrl} alt=""></div>
                        <div class="inform-right-cont">
                            <div class="inform-cont-top">
                                <p class="name">${item.user.userName}</p>
                                <p class="time">${time}</p>
                            </div>
                            <p class="r-arrow"></p>
                            <div class="inform-cont-text">${item.content.content}</div>
                        </div>
                    </div>`
                })
                $('#informBox').html(contList)
            }
            if ($('.inform-cont').length === 0) {
                $('.not-message').show()
            } else {
                $('.not-message').hide()
            }
        })
    }
    if (isCastId && (status === '0' || status === '1')) {
        let websocket = null
        // 判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            websocket = new WebSocket(websocketUrl)
        } else {
            alert('当前浏览器 Not support websocket')
        }

        // 将消息显示在网页上
        const setMessageInnerHTML = (innerHTML) => {
            console.log(innerHTML)
            // document.getElementById('message').innerHTML += innerHTML + '<br/>'
        }

        // 关闭WebSocket连接
        const closeWebSocket = () => {
            websocket.close()
            // alert('链接断开，请刷新页面...')
        }

        // 连接发生错误的回调方法
        websocket.onerror = () => {
            setMessageInnerHTML('WebSocket连接发生错误')
        }

        // 连接成功建立的回调方法
        websocket.onopen = () => {
            setMessageInnerHTML('WebSocket连接成功')
            /* setInterval(() => {
                websocket.send(`{"type": 0, "castId": ${castId}}`)
            }, 59000) */
            websocket.send(`{"type": 0, "castId": ${castId}}`)
        }

        // 接收到消息的回调方法
        websocket.onmessage = (event) => {
            // setMessageInnerHTML(event.data)
            let dataArr = JSON.parse(event.data)
            let contList = ''
            // console.log(dataArr.data.room.webcast.status)
            if (dataArr.type === 0) {
                let bannerMessage = dataArr.data.room.webcast
                let startTime = timestampToTime(bannerMessage.createIime).split(' ')
                let year = startTime[0]
                let hour = startTime[1].split(':')
                $('img.banner-img').attr('src', bannerMessage.backImage)
                $('.introduction-cont p').html(bannerMessage.desc)
                $('.live-time p span').html(year + ' ' + timeNum(hour[0]) + ' : ' + timeNum(hour[1]))
                dataArr.data.contentList.map((item, index) => {
                    let time = timestampToTime(item.content.createTime)
                    contList += `<div class="inform-cont clearfix" data-id=${item.content.contentId}>
                        <div class="inform-portrait"><img src=${item.user.headUrl} alt=""></div>
                        <div class="inform-right-cont">
                            <div class="inform-cont-top">
                                <p class="name">${item.user.userName}</p>
                                <p class="time">${time}</p>
                            </div>
                            <p class="r-arrow"></p>
                            <div class="inform-cont-text">${item.content.content}</div>
                        </div>
                    </div>`
                })
                $('#informBox').html(contList)
            } else if (dataArr.type === 1) {
                let time = timestampToTime(dataArr.data.content.createTime)
                contList += `<div class="inform-cont clearfix" data-id=${dataArr.data.content.contentId}>
                        <div class="inform-portrait"><img src=${dataArr.data.user.headUrl} alt=""></div>
                        <div class="inform-right-cont">
                            <div class="inform-cont-top">
                                <p class="name">${dataArr.data.user.userName}</p>
                                <p class="time">${time}</p>
                            </div>
                            <p class="r-arrow"></p>
                            <div class="inform-cont-text">${dataArr.data.content.content}</div>
                        </div>
                    </div>`
                $('#informBox').prepend(contList)
            } else if (dataArr.type === 2) {
                let classArr = ''
                $('.inform-cont').each(function (i, d) {
                    if ($('.inform-cont').eq(i).data('id') !== dataArr.data.contentId) {
                        classArr += $(d).get(0).outerHTML
                    }
                })
                $('.details-box').html(classArr)
            } else if (dataArr.type === 3) {
                $('.inform-cont').each(function (i, d) {
                    if ($(d).data('id') === dataArr.data.contentId) {
                        $(d).find('.inform-cont-text').html(dataArr.data.content)
                    }
                })
            } else if (dataArr.type === 4) {
                stateText = '<font class="c2">已结束</font>'
            } else if (dataArr.type === 5) {
                stateText = '<font class="c1">直播中...</font>'
            }
            $('.lives-state').html(stateText)

            if ($('.inform-cont').length === 0) {
                $('.not-message').show()
            } else {
                $('.not-message').hide()
            }
        }

        // 连接关闭的回调方法
        websocket.onclose = () => {
            setMessageInnerHTML('WebSocket连接关闭')
            alert('链接断开，请刷新页面...')
        }

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = () => {
            closeWebSocket()
        }
    }
    // let websocket = null
    // // 判断当前浏览器是否支持WebSocket
    // if ('WebSocket' in window) {
    //     websocket = new WebSocket(url)
    // } else {
    //     alert('当前浏览器 Not support websocket')
    // }
    //
    // // 连接发生错误的回调方法
    // websocket.onerror = () => {
    //     setMessageInnerHTML('WebSocket连接发生错误')
    // }
    //
    // // 连接成功建立的回调方法
    // websocket.onopen = () => {
    //     setMessageInnerHTML('WebSocket连接成功')
    //     websocket.send('{"type": 1, "castId": "222"}')
    // }
    //
    // // 接收到消息的回调方法
    // websocket.onmessage = function (event) {
    //     // setMessageInnerHTML(event.data)
    //     let dataArr = JSON.parse(event.data)
    //     console.log(dataArr)
    // }
    //
    // // 连接关闭的回调方法
    // websocket.onclose = () => {
    //     setMessageInnerHTML('WebSocket连接关闭')
    // }
    //
    // // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    // window.onbeforeunload = () => {
    //     closeWebSocket()
    // }
    //
    // // 将消息显示在网页上
    // function setMessageInnerHTML(innerHTML) {
    //     // document.getElementById('message').innerHTML += innerHTML + '<br/>'
    // }
    //
    // // 关闭WebSocket连接
    // function closeWebSocket() {
    //     websocket.close()
    // }
})
