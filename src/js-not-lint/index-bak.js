/**
 * Author：liushaozong
 * Time：2018-01-29
 * Description：index
 */
import { pageLoadingHide } from '../../libs/js/utils'
import { getTime, get, sevenDays, timestampToTime } from '../js/public/public'
let url = '/info/news'
let url2 = '/info/lives'
$(function () {
    // 时间前加0
    let timeNum = (t) => {
        if (t < 10) {
            t = '0' + t
        }
        return t
    }
    pageLoadingHide('')
    let swiper0 = new Swiper('#hxWrapPage', {
        slidesPerView: 4,
        spaceBetween: 0,
        loop: true,
        lazyLoading: true
    })
    swiper0.autoplay = true

    let swiper = new Swiper('#hxwrap', {
        pagination: '#hxWrapPage',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
            if (index === 0) {
                return '<span class="' + className + '">新闻<i class="active"></i></span>'
            } else if (index === 1) {
                return '<span class="' + className + '">快讯<i></i></span>'
            } else if (index === 2) {
                return '<span class="' + className + '">区块链<i></i></span>'
            } else if (index === 3) {
                return '<span class="' + className + '">比特币<i></i></span>'
            } else if (index === 4) {
                return '<span class="' + className + '">新币动态<i></i></span>'
            } else if (index === 5) {
                return '<span class="' + className + '">火星一线<i></i></span>'
            } else if (index === 6) {
                return '<span class="' + className + '">火星清单<i></i></span>'
            } else if (index === 7) {
                return '<span class="' + className + '">火星精译<i></i></span>'
            }
        }
    })
    swiper.init()
    let swiper2 = new Swiper('#newsWrap', {
        pagination: '#newsWrapPage',
        paginationClickable: true,
        observer: true,
        observeParents: true
    })
    swiper2.init()

    // 今日新闻列表
    function newsList (currentPage, pageSize, channelId, callback) {
        $.ajax({
            type: 'GET',
            url: url + '/shownews',
            dataType: 'json',
            async: false,
            data: {
                currentPage: currentPage,
                pageSize: pageSize,
                channelId: channelId
            },
            success: function (data) {
                callback(data)
            },
            error: function () {
                console.log('error')
            }
        })
    }

    let listPage = null
    newsList(listPage, 3, 0, newsFn, 0)
    function newsFn (data) {
        let dataArr = data.obj.inforList
        let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
        let serve = originalDate + (3600000 * 8)
        let date = new Date(serve)
        let timestamp = date.getTime()
        listPage = data.obj.pageCount
        let newsList = ''
        dataArr.map(function (d, i) {
            let time = getTime(d.createTime, timestamp)
            let img = JSON.parse(d.coverPic)
            if (i >= 1) {
                newsList += `<div class="news-list-more ">
                                    <a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                         <div class="title">${d.title}</div>
                                         <div class="list-text">
                                            <div class="author clearfix"><sapn>${d.author}</sapn></div>
                                            <div class="time clearfix"><span>${time}</span></div>
                                         </div>
                                         <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                                     </a>
                                  </div>`
            } else {
                newsList += `<div class="news-list-first ">
                                        <a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                            <div class="cover-img"><img src=${img.wap_big} alt=""></div>
                                            <div class="title">${d.title}</div>
                                            <div class="list-text">
                                                <div class="author clearfix"><span>${d.author}</span></div>
                                                <div class="time clearfix"><span>${time}</span></div>
                                            </div>
                                        </a>
                            </div>`
            }
        })
        $('.list-box').append(newsList)
    }

    $('.btn-more.newsBtn').on('click', function () {
        newsList(listPage, 2, 0, newsFn)
    })

    // 轮播图
    newsList(1, 5, '', function (data) {
        let dataArr = data.obj.inforList
        let swiperSlide = ''
        dataArr.map(function (d, i) {
            let img = JSON.parse(d.coverPic)
            swiperSlide += `<div class="swiper-slide"><a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}><img src=${img.wap_big} alt=""></a></div>`
        })
        $('.newsWrap').html(swiperSlide)
    })

    // 快讯
    let dayArr = sevenDays()
    let dayStr = ''
    dayArr.map(function (d, i) {
        let daySplit = d.split('-')[2]
        dayStr += `<span>${daySplit}</span>`
    })
    $('.fash-title').append(dayStr)
    $('.fash-title span').eq(0).addClass('active')
    $('.fash-title span').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        let date = new Date(dayArr[$(this).index() - 1])
        let time = Date.parse(date)
        getLives(1, '', 1, time)
    })

    let getLives = (currentPage, pageSize, channelId, queryTime) => {
        get(url2 + '/showlives', {
            currentPage: currentPage,
            pageSize: pageSize,
            channelId: channelId,
            queryTime: queryTime
        }, (data) => {
            let dataArr = data.obj.inforList
            let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
            let serve = originalDate + (3600000 * 8)
            let date = new Date(serve)
            let timestamp = date.getTime()
            let time = getTime(timestamp, dataArr.createTime)
            $('.news-fash .time').html(time)
            let livesList = ''
            dataArr.map(function (d, i) {
                let time = (timestampToTime(d.createdTime).split(' ')[1]).split(':')
                livesList += `<div class="new-fash-list">
                                    <div class="time-left ">${timeNum(time[0])}:${timeNum(time[1])}</div>
                                    <div class="text-right clearfix">
                                        <p>${d.content}</p>
                                    </div>
                                    <div style="clear: both"></div>
                                </div>`
            })
            $('.lives-box').html(livesList)
        })
    }
    getLives(1, '', 1, '')

    // ---------------------------后面栏目

    let blockchainNum = 1
    newsList(blockchainNum, 3, 1, function (data) {
        let dataArr = data.obj.inforList
        let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
        let serve = originalDate + (3600000 * 8)
        let date = new Date(serve)
        let timestamp = date.getTime()
        let blockchainStr = ''
        dataArr.map(function (d, i) {
            let time = getTime(d.createTime, timestamp)
            let img = JSON.parse(d.coverPic)
            blockchainStr += `<div class="news-list-more">
                                <a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                    <div class="title">${d.title}</div>
                                    <div class="list-text">
                                        <div class="author clearfix"><span>${d.author}</span></div>
                                        <div class="time clearfix"><span>${time}</span></div>
                                    </div>
                                    <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                                </a>
                            </div>`
        })
        $('.blockchain-box').append(blockchainStr)
    })

    let btbNum = 1
    newsList(btbNum, 10, 2, function (data) {
        let dataArr = data.obj.inforList
        let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
        let serve = originalDate + (3600000 * 8)
        let date = new Date(serve)
        let timestamp = date.getTime()
        let btbStr = ''
        dataArr.map(function (d, i) {
            let time = getTime(timestamp, d.createTime)
            let img = JSON.parse(d.coverPic)
            btbStr += `<div class="news-list-more">
                                <a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                    <div class="title">${d.title}</div>
                                    <div class="list-text">
                                        <div class="author clearfix"><span>${d.author}</span></div>
                                        <div class="time clearfix"><span>${time}</span></div>
                                    </div>
                                    <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                                </a>
                            </div>`
        })
        $('.btb-box').append(btbStr)
    })

    let newCurrency = 1
    newsList(newCurrency, 10, 3, function (data) {
        let dataArr = data.obj.inforList
        let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
        let serve = originalDate + (3600000 * 8)
        let date = new Date(serve)
        let timestamp = date.getTime()
        let newCurrencyStr = ''
        dataArr.map(function (d, i) {
            let time = getTime(timestamp, d.createTime)
            let img = JSON.parse(d.coverPic)
            btbStr += `<div class="news-list-more">
                                <a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                    <div class="title">${d.title}</div>
                                    <div class="list-text">
                                        <div class="author clearfix"><span>${d.author}</span></div>
                                        <div class="time clearfix"><span>${time}</span></div>
                                    </div>
                                    <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                                </a>
                            </div>`
        })
        $('.newCurrency-box').append(newCurrencyStr)
    })

    let huoxingYx = 1
    newsList(huoxingYx, 10, 3, function (data) {
        let dataArr = data.obj.inforList
        let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
        let serve = originalDate + (3600000 * 8)
        let date = new Date(serve)
        let timestamp = date.getTime()
        let time = getTime(timestamp, dataArr.createTime)
        let huoxingYxStr = ''
        console.log(data)
        dataArr.map(function (d, i) {
            let img = JSON.parse(d.coverPic)
            btbStr += `<div class="news-list-more">
                                <a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                    <div class="title">${d.title}</div>
                                    <div class="list-text">
                                        <div class="author clearfix"><span>${d.author}</span></div>
                                        <div class="time clearfix"><span>${time}</span></div>
                                    </div>
                                    <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                                </a>
                            </div>`
        })
        $('.newCurrency-box').append(huoxingYxStr)
    })

    let huoxingQd = 1
    newsList(huoxingQd, 10, 4, function (data) {
        let dataArr = data.obj.inforList
        let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
        let serve = originalDate + (3600000 * 8)
        let date = new Date(serve)
        let timestamp = date.getTime()
        let huoxingQdStr = ''
        dataArr.map(function (d, i) {
            let img = JSON.parse(d.coverPic)
            let time = getTime(timestamp, d.createTime)
            btbStr += `<div class="news-list-more">
                                <a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                    <div class="title">${d.title}</div>
                                    <div class="list-text">
                                        <div class="author clearfix"><span>${d.author}</span></div>
                                        <div class="time clearfix"><span>${time}</span></div>
                                    </div>
                                    <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                                </a>
                            </div>`
        })
        $('.newCurrency-box').append(huoxingQdStr)
    })

    let huoxingJy = 1
    newsList(huoxingJy, 10, 5, function (data) {
        let dataArr = data.obj.inforList
        let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
        let serve = originalDate + (3600000 * 8)
        let date = new Date(serve)
        let timestamp = date.getTime()
        let huoxingJyStr = ''
        dataArr.map(function (d, i) {
            let time = getTime(timestamp, d.createTime)
            let img = JSON.parse(d.coverPic)
            btbStr += `<div class="news-list-more">
                                <a href=${'/html/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                    <div class="title">${d.title}</div>
                                    <div class="list-text">
                                        <div class="author clearfix"><span>${d.author}</span></div>
                                        <div class="time clearfix"><span>${time}</span></div>
                                    </div>
                                    <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                                </a>
                            </div>`
        })
        $('.newCurrency-box').append(huoxingJyStr)
    })
})
