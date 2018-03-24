/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：js demo index
 */

import {pageLoadingHide} from '../../libs/js/utils'
import {ajaxGet, isJsonString, getTime} from '../js/public/public'
let url = '/info/topic'
// let url2 = '/push/text/room/content/list'
// let websocketUrl = 'ws://www.huoxing24.com/push/websocket/text'
// const htmlPath = ''
$(function () {
    pageLoadingHide()
    let currentPage = 1
    let moreState = true
    let totalPage = 1
    let INLIST = window.location.href.indexOf('btaList') !== -1
    // 热点轮播
    let hot = new Swiper('.hot-swiper', {
        autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false
        },
        spaceBetween: -60,
        initialSlide: 1,
        observer: true,
        preventClicks: false,
        observeParents: true
    })

    // 快讯轮播
    let live = new Swiper('.live-swiper', {
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
        },
        observer: true,
        direction: 'vertical',
        preventClicks: false,
        observeParents: true
    })
    console.log(live, hot)

    // 新闻列表
    const getNewsList = (obj) => {
        const {currentPage, type, fn} = obj
        if (currentPage > totalPage) {
            $('#news-more').html(INLIST ? '已加载全部~' : '查看更多').addClass('grey')
            return false
        }
        let data = {
            currentPage: currentPage,
            pageSize: INLIST ? 10 : 4,
            type: 3,
            id: '2018031315490692386'
        }

        ajaxGet(url + '/detail', data, function (data) {
            let newsList = data.obj.newsList.inforList
            totalPage = data.obj.newsList.pageCount
            let liContent = ''
            newsList.map((item, index) => {
                let pic = isJsonString(item.coverPic) ? JSON.parse(item.coverPic) : ''
                liContent += `<li class="news-item" data-id=${item.id}>
                        <p class="news-img">
                            <img src=${pic.wap_small} alt="">
                        </p>
                        <div class="news-item-content">
                            <p class="news-item-title">${item.title}</p>
                            <p class="news-item-desc">${item.synopsis}</p>
                        </div>
                        <p class="news-date">${getTime(item.publishTime, Date.parse(new Date()))}</p>
                    </li>`
            })
            if (type === 'addMore') {
                $('.news-content').append(liContent)
            } else {
                $('.news-content').html(liContent)
            }
            if (fn) {
                fn()
            }
        })
    }

    getNewsList({
        currentPage: 1,
        type: ''
    })

    // 推荐新闻轮播
    !INLIST && ajaxGet('/info/news/shownews', {
        currentPage: 1,
        pageSize: 5,
        recommend: 1,
        channelId: 9
    }, function (data) {
        let newsList = data.obj.inforList
        let swiperSlide = ''
        newsList.map((item, index) => {
            let pic = isJsonString(item.coverPic) ? JSON.parse(item.coverPic) : ''
            swiperSlide += `<div class="swiper-slide" data-id=${item.id}>
                    <div class="swiper-item">
                        <span class="mode"></span>
                        <img src=${pic.wap_small} alt="">
                        <p class="news-title">
                            ${item.title}
                        </p>
                    </div>
                </div>`
        })
        $('.hot-swiper .swiper-wrapper').html(swiperSlide)
    })

    // 快讯
    !INLIST && ajaxGet('/info/lives/showlives', {
        queryTime: '',
        currentPage: 1,
        pageSize: 5
    }, function (data) {
        let newsList = data.obj.inforList
        let swiperSlide = ''
        newsList.map((item, index) => {
            swiperSlide += `<div class="swiper-slide" data-id=${item.id}>
                    <div class="live-content">
                            <span class="create-time">${getTime(item.createdTime, Date.parse(new Date()))}</span>
                            <span class="separate"> | </span>
                            <span class="content">${item.content}</span>
                    </div>
                </div>`
        })
        $('.live-swiper .swiper-wrapper').html(swiperSlide)
    })

    $('.news-content').on('click', '.news-item', function (e) {
        e.preventDefault()
        window.location.href = '/details.html?id=' + $(e.currentTarget).attr('data-id')
    })

    $('.hot-swiper').on('click', '.swiper-wrapper .swiper-slide', function (e) {
        e.preventDefault()
        window.location.href = '/details.html?id=' + $(e.currentTarget).attr('data-id')
    })

    $('.live-more-btn').click(() => {
        window.location.href = '/html?from=bta'
    })

    $('.news-more').click(() => {
        if (INLIST) {
            getNewsList({
                currentPage: ++currentPage,
                type: 'addMore',
                fn: function () {
                    moreState = true
                }
            })
        } else {
            window.location.href = '/html/btaList.html'
        }
    })
    INLIST && $(window).on('scroll', function () {
        let btnMoreTop = $('#news-more').offset().top
        let nowtop = $(window).scrollTop() + $(window).height()
        if (nowtop > btnMoreTop && moreState) {
            moreState = false
            let page = ++currentPage
            getNewsList({
                currentPage: page,
                type: 'addMore',
                fn: function () {
                    moreState = true
                }
            })
        }
    })
})
