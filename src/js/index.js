/**
 * Author：liushaozong
 * Time：2018-01-29
 * Description：index
 */
import {pageLoadingHide, isPc} from '../../libs/js/utils'
import {getTime, sevenDays, timestampToTime, formatDateMore, Animation} from '../js/public/public'
import html2canvas from 'html2canvas'

if (isPc()) {
    window.location.href = 'http://www.huoxing24.com'
}

let url = '/info/news'
let url2 = '/info/lives'
let url3 = '/market/coin'
const htmlPath = ''

// 频道分类数组
const navIndex = [
    {
        title: '最新',
        channelId: '0'
    }, {
        title: '快讯',
        channelId: ''
    }, {
        title: '新闻',
        channelId: '1'
    }, {
        title: '行业',
        channelId: '2'
    }, {
        title: '产品',
        channelId: '3'
    }, {
        title: '观点',
        channelId: '4'
    }, {
        title: '新手',
        channelId: '5'
    }
]

$(function () {
    $('#pageLoading').show()
    // 初始化新闻列表
    getNewsList(0, 1)

    // 获取banner
    getNewsList(0, 1, 'getBanner', true)

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
            getFlashNewsList('', 30, 1, 1, 2)
            $('.btn-more-flash').css('display', 'block')
        } else {
            let date = new Date(dayArr[$(this).index() - 2])
            let time = Date.parse(date)
            getFlashNewsList(time, 200, 1, 0, 2)
        }
    })

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
                }
            }
        },
        on: {
            slideChangeTransitionStart: function () {
                $('.body-wrap .swiper-pagination-bullet').eq(this.activeIndex).children('i').addClass('active').parent().siblings().children('i').removeClass('active')

                if (this.activeIndex === 6) {
                    $('#hxWrapPage').addClass('active')
                } else {
                    $('#hxWrapPage').removeClass('active')
                }
            },
            slideChangeTransitionEnd: function () {
                const type = $('span.column-nav').eq(this.activeIndex).data('type')
                const moreNo = $('#listBox' + type).children('.news-list-more').length === 0
                const firstNo = $('#listBox' + type).children('.news-list-first').length === 0

                if (type !== 0 && moreNo && firstNo) {
                    if (this.activeIndex !== 1) {
                        getNewsList(type, 1)
                    } else {
                        /* let flashTime = new Date(sevenDays()[0])
                         let flashTimestamp = Date.parse(flashTime) */
                        getFlashNewsList('', 30, 1, 1)
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

    let swiper2 = new Swiper('#newsWrap', {
        /* pagination: {
         el: '#newsWrapPage',
         clickable: true
         }, */
        observer: true,
        observeParents: true
    })
    swiper2.init()

    $('.btn-more').click(function () {
        const type = 'addMore'
        const channelId = $(this).data('type')
        const page = $('#listBox' + channelId).data('page')
        getNewsList(channelId, page, type)
    })

    // 获取汇率
    $.ajax({
        type: 'GET',
        url: url3 + '/total',
        dataType: 'json',
        async: false,
        success: function (data) {
            $.ajax({
                type: 'GET',
                url: url3 + '/financerate',
                dataType: 'json',
                async: false,
                success: function (dataIn) {
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
                }
            })
        }
    })

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
                let imgUri = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream') // 获取生成的图片的url
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
})

function calculateHeight(channelId) {
    const $overAllBox = $('#overAllBox')
    const windowHeight = parseInt($(window).height())

    let wHeight = parseInt($('#pageConWrap' + channelId).height()) + 20

    if (wHeight < windowHeight) {
        $overAllBox.height(windowHeight)
    } else {
        $overAllBox.height(wHeight)
    }
}

function getNewsList(channelId, currentPage, type, recommend) {
    let data = {
        currentPage: currentPage,
        pageSize: 20,
        channelId: channelId
    }
    if (recommend) {
        data = Object.assign({}, data, {recommend: 1})
    }

    $.ajax({
        type: 'GET',
        url: url + '/shownews',
        dataType: 'json',
        async: false,
        data: data,
        success: function (data) {
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

                dataArr.map(function (d, i) {
                    // banner
                    let img = JSON.parse(d.coverPic)
                    swiperSlide += `<div class="swiper-slide">
<a href=${htmlPath + '/details.html?id=' + d.id + '&channelId=' + d.channelId}><img src=${img.wap_big} alt=""></a>
<span class="img-news-title">${d.title}</span>
</div>`

                    // list
                    let time = getTime(d.publishTime, timestamp)
                    const htmlStr = `<div class="news-list-more ">
                <a href=${htmlPath + '/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                     <div class="title">${d.title}</div>
                     <div class="list-text">
                        <div class="author clearfix"><sapn>${d.author}</sapn></div>
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
                <a href=${htmlPath + '/details.html?id=' + d.id + '&channelId=' + d.channelId}>
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
                })

                if (recommend) {
                    // banner
                    $('.newsWrap').html(swiperSlide)
                } else {
                    // list
                    $listBox.append(newsList)
                    calculateHeight(channelId)
                }
            } else {
                console.log('没有更多了')
            }
        },
        error: function () {
            console.log('error')
        }
    })
}

let flashCurrentPage = null
let flashPage = $('.btn-more-flash').data('type')

function getFlashNewsList(queryTime, pageSize, currentPage, type, more) {
    $.ajax({
        type: 'GET',
        url: url2 + '/showlives',
        dataType: 'json',
        async: false,
        data: {
            queryTime: queryTime,
            pageSize: pageSize,
            currentPage: currentPage
        },
        success: function (data) {
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
        },
        error: function () {
            console.log('error')
        }
    })
}

$('.btn-more-flash').on('click', function () {
    flashPage++
    if (flashPage > flashCurrentPage) {
        return false
    }
    getFlashNewsList('', 30, flashPage, 1)
})

// 小于10加0
function timeNum(t) {
    if (t < 10) {
        t = '0' + t
    }
    return t
}
