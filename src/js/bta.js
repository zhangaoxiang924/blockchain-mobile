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
    // 热点轮播
    let hot = new Swiper('.hot-swiper', {
        autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false
        },
        spaceBetween: -70,
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
        initialSlide: 1,
        observer: true,
        direction: 'vertical',
        preventClicks: false,
        observeParents: true
    })
    console.log(live, hot)

    // 新闻列表
    ajaxGet(url + '/detail', {
        type: 3,
        id: '2018031315490692386'
    }, function (data) {
        let newsList = data.obj.newsList.inforList
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
        $('.news-content').html(liContent)
    })

    // 推荐新闻轮播
    ajaxGet('/info/news/shownews', {
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

    $('body').on('click', '.news-content .news-item', function (e) {
        console.log(123)
        e.preventDefault()
        window.location.href = '/details.html?id=' + $(e.currentTarget).attr('data-id')
    })

    $('body').on('click', '.hot-swiper .swiper-wrapper .swiper-slide', function (e) {
        e.preventDefault()
        window.location.href = '/details.html?id=' + $(e.currentTarget).attr('data-id')
    })
})
