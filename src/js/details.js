/**
 * Author：liushaozong
 * Time：2018-01-29
 * Description：details
 */
import {getQueryString} from '../../libs/js/utils'
import {getTime, get, timestampToTime, formatDateMore, Animation} from '../js/public/public'
import html2canvas from 'html2canvas'

let url = '/info/news'
const htmlPath = ''

$(function () {
    $('#pageLoading').show()
    // 改变页面title
    let getDetails = (id, channelId) => {
        get(url + '/getbyid', {
            id: id,
            channelId: channelId
        }, (data) => {
            $('#pageLoading').hide()
            let cont = data.obj
            $('title').html(cont.current.title)
            // 设置时间
            let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
            let serve = originalDate + (3600000 * 8)
            let date = new Date(serve)
            let timestamp = date.getTime()
            let time = getTime(cont.current.publishTime, timestamp)
            let shadeTime = timestampToTime(timestamp)
            newsCorrelation(cont.current.tags, 5, cont.current.id)
            let synopsis = data.obj.current.synopsis
            let header = `<h6 data-time=${shadeTime} data-synopsis=${synopsis} id='flashNewsTime'>${cont.current.title}</h6>
                            <div class="list-text">
                                <div class="author clearfix">
                                    <sapn>${cont.current.author}</sapn>
                                </div>
                                <div class="time clearfix"><span>${time}</span></div>
                                <div 
                                class="share-btn"
                                data-synopsis="${synopsis}"
                                data-time="${formatDateMore(cont.current.publishTime)}"></div>
                            </div>`

            let content = cont.current.content
            $('.details-header').html(header)
            $('.details-cont').html(content)
        })
    }
    getDetails(getQueryString('id'), getQueryString('channelId'))

    const $shareBox = $('#shareBox')
    const $shareTime = $('#shareTime')
    const $shareCon = $('#shareCon')
    const $imgWrap = $('#imgWrap')
    const $imgCon = $('#imgCon')
    const $imgConMask = $('#imgConMask')
    const $articleTitle = $('#articleTitle')

    $('.details-header').on('click', '.share-btn', function () {
        $shareBox.show()
        $shareTime.text($(this).data('time'))
        $articleTitle.text($('#flashNewsTime').html())
        $shareCon.text($('#flashNewsTime').data('synopsis'))
        setTimeout(function () {
            html2canvas(document.getElementById('shareBox')).then(canvas => {
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

    let newsCorrelation = (tags, newsCounds, id) => {
        get(url + '/relatednews', {
            tags: tags,
            newsCounds: newsCounds,
            id: id
        }, (data) => {
            let dataArr = data.obj.inforList
            let originalDate = new Date($.ajax({async: false}).getResponseHeader('Date'))
            let serve = originalDate + (3600000 * 8)
            let date = new Date(serve)
            let timestamp = date.getTime()
            let newsList = ''
            dataArr.map(function (d, i) {
                let time = getTime(d.publishTime, timestamp)
                let img = JSON.parse(d.coverPic)
                newsList += `<div class="news-list-more ">
                                <a href=${htmlPath + '/details.html?id=' + d.id + '&channelId=' + d.channelId}>
                                    <div class="title">${d.title}</div>
                                    <div class="list-text">
                                        <div class="author clearfix"><span>${d.author}</span></div>
                                        <div class="time clearfix"><span>${time}</span></div>
                                    </div>
                                    <div class="cover-img-sma"><img src=${img.wap_small} alt=""></div>
                                </a>
                            </div>`
            })
            $('.news-list-box').html(newsList)
        })
    }

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
