/**
 * Author：liushaozong
 * Time：2018-01-29
 * Description：index
 */
import {pageLoadingHide, isPc, isIos, isAndroid, getQueryString} from '../../libs/js/utils'
import {getTime, sevenDays, timestampToTime, formatDateMore, Animation, ajaxGet} from '../js/public/public'
import html2canvas from 'html2canvas'
// import swal from 'sweetalert2'

if (isPc()) {
    window.location.href = 'http://www.huoxing24.com'
}

let url = '/info/news'
let url2 = '/info/lives'
// let url3 = '/market/coin'
const htmlPath = ''

// 频道分类数组
const navIndex = [
    {
        title: '最新',
        channelId: '0'
    }, {
        title: '快讯',
        channelId: '100' // 假的channelId
    }, {
        title: '产业',
        channelId: '2'
    }, {
        title: '王峰十问',
        channelId: '9'
    }, {
        title: '技术',
        channelId: '6'
    }, {
        title: '项目',
        channelId: '3'
    }, {
        title: '人物',
        channelId: '4'
    }, {
        title: '游戏',
        channelId: '7'
    }, {
        title: '八点',
        channelId: '8'
    }
]

$(function () {
    // 微信朋友圈分享
    $.ajax({
        url: 'http://104.194.89.167:3000/signture',
        type: 'GET',
        dataType: 'jsonp',
        // data: {url: encodeURIComponent(location.href.split('#')[0])},
        data: {url: location.href.split('#')[0]},
        success: function (res) {
            console.log(res)
            wx.config({
                debug: false,
                appId: 'wxec2dc083d4024311',
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            })
            wx.ready(function () {
                const shareData = {
                    title: document.title,
                    desc: getDesc(),
                    link: res.url,
                    imgUrl: getImage()
                }
                wx.onMenuShareAppMessage(shareData)
                wx.onMenuShareTimeline(shareData)
                wx.onMenuShareQQ(shareData)
            })
            wx.error(function (res) {
                alert(res.errMsg) // 正式环境记得关闭啊！！！！
            })
        }
    })

    // 获取描述字段方法
    function getDesc() {
        let meta = document.getElementsByTagName('meta')
        for (let i = 0; i < meta.length; i++) {
            if (typeof meta[i].name !== 'undefined' && meta[i].name.toLowerCase() === 'description') {
                return meta[i].content
            }
        }
    }

    // 获取图片
    function getImage() {
        return 'http://' + location.host + '/images/logo.jpg'
    }

    if ($('#livesPage').length === 0) {
        // 初始化新闻列表
        getNewsList({
            channelId: 0,
            currentPage: 1
        })

        // 获取banner
        getNewsList({
            channelId: 0,
            currentPage: 1,
            type: 'getBanner',
            recommend: true
        })
    }

    // app快讯页面 默认列表
    if ($('#livesPage').length !== 0) {
        getFlashNewsList({
            queryTime: '',
            pageSize: 30,
            currentPage: 1,
            type: 1
        })
    }

    // 快讯时间
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
        if ($(this).index() === 1) {
            getFlashNewsList({
                queryTime: '',
                pageSize: 30,
                currentPage: 1,
                type: 1,
                more: 2
            })

            $('.btn-more-flash').css('display', 'block')
        } else {
            let date = new Date(dayArr[$(this).index() - 2])
            let time = Date.parse(date)
            getFlashNewsList({
                queryTime: time,
                pageSize: 200,
                currentPage: 1,
                type: 0,
                more: 2
            })
        }
    })

    let moreIndex = 0
    let moreState = true
    let swiper = new Swiper('#hxwrap', {
        pagination: {
            el: '#hxWrapPage',
            clickable: true,
            renderBullet: function (index, className) {
                if (index === 0) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[0].channelId + '">' + navIndex[0].title + '<i class="active"></i></span>'
                } else if (index === 1) {
                    return '<span class="' + className + ' column-nav">' + navIndex[1].title + '<i></i></span>'
                } else if (index === 2) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[2].channelId + '">' + navIndex[2].title + '<i></i></span>'
                } else if (index === 3) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[3].channelId + '">' + navIndex[3].title + '<i></i></span>'
                } else if (index === 4) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[4].channelId + '">' + navIndex[4].title + '<i></i></span>'
                } else if (index === 5) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[5].channelId + '">' + navIndex[5].title + '<i></i></span>'
                } else if (index === 6) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[6].channelId + '">' + navIndex[6].title + '<i></i></span>'
                } else if (index === 7) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[7].channelId + '">' + navIndex[7].title + '<i></i></span>'
                } else if (index === 8) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[8].channelId + '">' + navIndex[8].title + '<i></i></span>'
                } else if (index === 9) {
                    return '<span class="' + className + ' column-nav" data-type="' + navIndex[9].channelId + '">' + navIndex[9].title + '<i></i></span>'
                }
            }
        },
        on: {
            slideChangeTransitionStart: function () {
                $('.body-wrap .swiper-pagination-bullet').eq(this.activeIndex).children('i').addClass('active').parent().siblings().children('i').removeClass('active')

                if (this.activeIndex >= 4) {
                    $('#hxWrapPage').addClass('active')
                } else {
                    $('#hxWrapPage').removeClass('active')
                }
            },
            slideChangeTransitionEnd: function () {
                const type = $('span.column-nav').eq(this.activeIndex).data('type')
                const moreNo = $('#listBox' + type).children('.news-list-more').length === 0
                const firstNo = $('#listBox' + type).children('.news-list-first').length === 0

                moreIndex = navIndex[this.activeIndex].channelId
                moreState = true
                if (type !== 0 && moreNo && firstNo) {
                    if (this.activeIndex !== 1) {
                        getNewsList({
                            channelId: type,
                            currentPage: 1
                        })
                    } else {
                        /* let flashTime = new Date(sevenDays()[0])
                         let flashTimestamp = Date.parse(flashTime) */
                        const flashNo = $('.lives-box').children('.new-fash-list').length === 0
                        if (flashNo) {
                            getFlashNewsList({
                                queryTime: '',
                                pageSize: 30,
                                currentPage: 1,
                                type: 1
                            })
                        }
                    }
                }
                $(window).scrollTop(0)

                if (this.activeIndex !== 1) {
                    calculateHeight(type)
                } else {
                    calculateHeight('Live')
                }
            }
        }
    })
    swiper.init()

    if (getQueryString('from') === 'bta') {
        swiper.slideTo(1)
    }

    let swiper2 = new Swiper('#newsWrap', {
        /* pagination: {
         el: '#newsWrapPage',
         clickable: true
         }, */
        observer: true,
        observeParents: true
    })
    swiper2.init()

    // 三个栏目
    $('#eightClock').on('click', function () {
        swiper.slideTo(9)
    })
    $('#tenQuestions').on('click', function () {
        swiper.slideTo(4)
    })
    $('#twoSessions').on('click', function () {
        swiper.slideTo(2)
    })

    /* ---------------记载更多--------------- */
    let flashCurrentPage = null
    let flashPage = $('.btn-more-flash').data('type')
    $(window).on('scroll', function () {
        let btnMoreTop = $('#btnMore' + moreIndex).offset().top
        let nowtop = $(window).scrollTop() + $(window).height()
        if (nowtop > btnMoreTop && moreState) {
            moreState = false
            if (moreIndex !== '100') {
                const type = 'addMore'
                const channelId = $('#btnMore' + moreIndex).data('type')
                const page = $('#listBox' + channelId).data('page')
                getNewsList({
                    channelId: channelId,
                    currentPage: page,
                    type: type,
                    fn: function () {
                        moreState = true
                    }
                })
            } else {
                flashPage++
                getFlashNewsList({
                    queryTime: '',
                    pageSize: 30,
                    currentPage: flashPage,
                    type: 1,
                    fn: function () {
                        moreState = true
                    }
                }, 500)
            }
        }
    })

    $('.btn-more').click(function () {
        const type = 'addMore'
        const channelId = $(this).data('type')
        const page = $('#listBox' + channelId).data('page')
        getNewsList({
            channelId: channelId,
            currentPage: page,
            type: type
        })
    })

    $('.btn-more-flash').click(function () {
        flashPage++
        if (flashPage > flashCurrentPage) {
            return false
        }
        getFlashNewsList({
            queryTime: '',
            pageSize: 30,
            currentPage: flashPage,
            type: 1
        })
    })

    /* --------------获取快讯列表-------------- */
    function getFlashNewsList(obj) {
        const {queryTime, pageSize, currentPage, type, more, fn} = obj

        ajaxGet(url2 + '/showlives', {
            queryTime: queryTime,
            pageSize: pageSize,
            currentPage: currentPage
        }, function (data) {
            pageLoadingHide()
            let dataArr = data.obj.inforList
            let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
            let serve = originalDate + (3600000 * 8)
            let date = new Date(serve)
            let timestamp = date.getTime()
            let time = getTime(timestamp, dataArr.publishTime)
            $('.news-fash .time').html(time)
            let livesList = ''
            flashCurrentPage = data.obj.pageCount
            dataArr.map(function (d, i) {
                let time = (timestampToTime(d.createdTime).split(' ')[1]).split(':')
                let year = (timestampToTime(d.createdTime).split(' ')[0]).split('-')
                let allTime = type === 1 ? `${year[1] + '-' + timeNum(year[2])} ${timeNum(time[0])}:${timeNum(time[1])}` : `${timeNum(time[0])}:${timeNum(time[1])}`
                const idName = i.toString() + data.obj.currentPage
                let status = d.tag === 2 ? 'red' : ''
                let url = d.url ? d.url : ''
                let originalUrl = url !== '' ? 'block' : ''
                livesList += `<div class="new-fash-list">
                                    <div class="time-flash" data-time=${d.createdTime} id=${'flashNewsTime' + idName}><img src="../img/time-t.png" alt="">${allTime}</div>
                                    <div class="text-flash clearfix">
                                        <p class=${status}><span id=${'flashNewsCon' + idName} >${d.content}</span><a href=${url} class=${originalUrl}>「查看原文」</a></p>
                                        <div class="share" data-type=${idName} data-time=${d.createdTime}></div>
                                    </div>
                                    <div style="clear: both"></div>
                                </div>`
            })
            if (more === 2) {
                $('.lives-box').html(livesList)
            } else {
                $('.lives-box').append(livesList)
            }
            calculateHeight('Live')
            if (fn) {
                fn()
            }
        })
    }

    // 获取汇率
    /* ajaxGet(url3 + '/total', {}, function (data) {
        ajaxGet(url3 + '/financerate', {}, function (dataIn) {
            let coinStr = ''
            data.data.coin.map(function (d, i) {
                coinStr += `<div class="price-list">
                            <div class="price-number">
                                <h3>${d.cn_name}</h3>
                                <p>${d.percent_change_24h}%</p>
                            </div>
                            <h2>￥${parseInt(dataIn.data.legal_rate.CNY * d.price_usd)}</h2>
                        </div>`
            })

            $('#coinList').html(coinStr)
        })
    }) */

    // 快讯分享
    const $shareBox = $('#shareBox')
    const $shareTime = $('#shareTime')
    const $shareCon = $('#shareCon')
    const $imgWrap = $('#imgWrap')
    const $imgCon = $('#imgCon')
    const $imgConMask = $('#imgConMask')

    $(document).on('click', '.new-fash-list .share', function () {
        const idNum = $(this).data('type')

        $shareTime.text(formatDateMore($('#flashNewsTime' + idNum).data('time')))
        const conArr = $('#flashNewsCon' + idNum).html().split('】')
        $('#articleTitle').text(conArr[0].split('【')[1])
        $shareCon.text(conArr[1])

        setTimeout(function () {
            $shareBox.show()
            const conHeight = parseInt($shareBox.find('.share-cont').height())
            const conPadding = parseInt($shareBox.find('.share-box').css('padding-top'))
            $shareBox.height(conPadding + conHeight)

            html2canvas(document.getElementById('shareBox'), {
                /* dpi: window.devicePixelRatio * 2,
                 scale: 1 * 2 */
            }).then(canvas => {
                let imgUri = canvas.toDataURL('image/jpeg') // 获取生成的图片的url
                $imgCon.attr('src', imgUri)
                $imgWrap.show()
            })
        }, 100)
    })
    $imgConMask.click(function () {
        $shareBox.hide()
        $imgWrap.hide()
    })

    // 顶部滚动
    const $hxWrapPage = $('#hxWrapPage')
    const $overAllBox = $('#overAllBox')
    $(window).scroll(function () {
        if (parseInt($(this).scrollTop()) < parseInt($('#huoxingTop').height())) {
            $hxWrapPage.css('position', 'relative')
            $overAllBox.removeClass('active')
        } else {
            $hxWrapPage.css('position', 'fixed')
            $overAllBox.addClass('active')
        }
    })

    // 返回顶部
    $(window).on('scroll', function () {
        let backTop = $(window).height() + $(window).scrollTop()
        if (backTop > 1500) {
            $('.back-top').addClass('top')
        } else {
            $('.back-top').removeClass('top')
        }
    })
    $('.back-top').on('click', function () {
        Animation()
    })

    function calculateHeight(channelId) {
        const $overAllBox = $('#overAllBox')
        const windowHeight = parseInt($(window).height())

        let wHeight = parseInt($('#pageConWrap' + channelId).height()) + 80

        if (wHeight < windowHeight) {
            $overAllBox.height(windowHeight)
        } else {
            $overAllBox.height(wHeight)
        }
    }

    function getNewsList(obj) {
        const {channelId, currentPage, type, recommend, fn} = obj
        let data = {
            currentPage: currentPage,
            pageSize: 20,
            channelId: channelId
        }
        if (recommend) {
            data = {
                pageSize: 4,
                recommend: 1
            }
        }

        ajaxGet(url + '/shownews', data, function (data) {
            pageLoadingHide()
            if (data.obj.inforList.length !== 0) {
                // 设置当前频道下一页数字
                const $listBox = $('#listBox' + channelId)
                $listBox.data('page', data.obj.currentPage)

                // 设置时间
                let dataArr = data.obj.inforList
                let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
                let serve = originalDate + (3600000 * 8)
                let date = new Date(serve)
                let timestamp = date.getTime()

                // banner html string
                let swiperSlide = ''

                // list html string
                let newsList = ''

                for (let i = 0; i < dataArr.length; i++) {
                    const d = dataArr[i]
                    if (recommend && i >= 4) {
                        break
                    }

                    // banner
                    let img = JSON.parse(d.coverPic)
                    swiperSlide += `<div class="swiper-slide">
<a href=${htmlPath + '/details.html?id=' + d.id}><img src=${img.wap_big} alt=""></a>
<span class="img-news-title">${d.title}</span>
</div>`

                    // list
                    let time = getTime(d.publishTime, timestamp)
                    let author = `<div class="author clearfix"><sapn>${d.author}</sapn></div>`
                    author = ''
                    const htmlStr = `<div class="news-list-more ">
                <a href=${htmlPath + '/details.html?id=' + d.id}>
                     <div class="title">${d.title}</div>
                     <div class="list-text">
                        ${author}
                        <div class="author read-number clearfix"><sapn>${d.hotCounts}</sapn></div>
                        <div class="time clearfix"><span>${time}</span></div>
                     </div>
                     <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                 </a>
              </div>`
                    if (type !== 'addMore') {
                        if (i > 0 || channelId !== navIndex[0].channelId) {
                            newsList += htmlStr
                        } else if (channelId === 0) {
                            newsList += `<div class="news-list-first ">
                <a href=${htmlPath + '/details.html?id=' + d.id}>
                    <div class="cover-img"><img src=${img.wap_big} alt=""></div>
                    <div class="title">${d.title}</div>
                    <div class="list-text">
                        <div class="author clearfix"><span>${d.author}</span></div>
                        <div class="time clearfix"><span>${time}</span></div>
                    </div>
                </a>
            </div>`
                        }
                    } else {
                        newsList += htmlStr
                    }
                }

                if (recommend) {
                    // banner
                    $('.newsWrap').html(swiperSlide)
                } else {
                    // list
                    $listBox.append(newsList)
                    calculateHeight(channelId)
                    if (fn) {
                        fn()
                    }
                }
            } else {
                // swal('没有更多了!')
                $('#btnMore' + moreIndex).html('没有更多了!')
            }
        })
    }

    // 下载
    let iosUrl = 'https://www.pgyer.com/huoxing24_ios'
    let andUrl = 'https://www.pgyer.com/huoxing24_android'
    let downLoad = $('.b-down')

    downLoad.on('click', function () {
        if (isIos()) {
            downLoad.attr('href', iosUrl)
        }
        if (isAndroid()) {
            downLoad.attr('href', andUrl)
        }
        /* if (isWeixin() && isAndroid()) {
            $('.hint').show()
            return false
        } */
    })

    /* $('.hint').on('click', function () {
        $('.hint').hide()
    }) */
})

// 小于10加0
function timeNum(t) {
    if (t < 10) {
        t = '0' + t
    }
    return t
}
