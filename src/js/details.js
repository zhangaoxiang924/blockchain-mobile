/**
 * Author：liushaozong
 * Time：2018-01-29
 * Description：details
 */
import {getQueryString, pageLoadingHide, isPc} from '../../libs/js/utils'
import {
    getTime,
    ajaxGet,
    timestampToTime,
    formatDateMore,
    Animation,
    compareCalendar,
    scrollDirect
} from '../js/public/public'
import html2canvas from 'html2canvas'

let url = '/info/news'
const htmlPath = ''
if (isPc()) {
    let href = window.location.href
    if (href.indexOf('details') !== -1) {
        window.location.href = `http://www.huoxing24.com/#/newsdetail/${getQueryString('id')}/${getQueryString('channelId')}`
    } else {
        window.location.href = 'http://www.huoxing24.com'
    }
}
$(function () {
    const $huoxingTop = $('#huoxingTop')
    scrollDirect(function (direction) {
        if (direction === 'down') {
            if (parseFloat($(window).scrollTop()) >= 600) {
                $huoxingTop.addClass('active')
            }
        }
        if (direction === 'up') {
            $huoxingTop.removeClass('active')
        }
    })

    // 改变页面title
    let getDetails = (id, channelId) => {
        ajaxGet(url + '/getbyid', {
            id: id,
            channelId: channelId
        }, (data) => {
            console.log(data)

            pageLoadingHide()

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

            const timer = compareCalendar('2018-02-10', formatDateMore(cont.current.createTime).split(' ')[0])
            const $detailsSynopsis = $('#detailsSynopsis')
            if (timer) {
                $detailsSynopsis.addClass('active').children('p').text(synopsis)
            }

            // 作者信息备份
            let author = `<div class="author clearfix">
                                    <sapn>${cont.current.author}</sapn>
                                </div>`
            author = ''

            let readNumber = `<div class="read-number">${cont.current.readCounts}</div>`
            readNumber = ''

            let header = `<h6 data-time=${shadeTime} data-synopsis=${synopsis} id='flashNewsTime'>${cont.current.title}</h6>
                            <div class="list-text">
                                ${author}
                                <div class="time clearfix"><span>${time}</span></div>
                                ${readNumber}
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

    // 超出字数显示省略号
    const cutString = (str, len) => {
        // length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
            return str
        }
        let strlen = 0
        let s = ''
        for (let i = 0; i < str.length; i++) {
            s = s + str.charAt(i)
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2
                if (strlen >= len) {
                    return s.substring(0, s.length - 1) + '...'
                }
            } else {
                strlen = strlen + 1
                if (strlen >= len) {
                    return s.substring(0, s.length - 2) + '...'
                }
            }
        }
        return s
    }

    const $shareBox = $('#shareBox')
    const $shareTime = $('#shareTime')
    const $shareCon = $('#shareCon')
    const $imgWrap = $('#imgWrap')
    const $imgCon = $('#imgCon')
    const $imgConMask = $('#imgConMask')
    const $articleTitle = $('#articleTitle')

    $('.details-header').on('click', '.share-btn', function () {
        $shareTime.text($(this).data('time'))
        $articleTitle.text($('#flashNewsTime').html())
        $shareCon.text($('#flashNewsTime').data('synopsis'))

        setTimeout(function () {
            $shareBox.show()
            const conHeight = parseInt($shareBox.find('.share-cont').height())
            const conPadding = parseInt($shareBox.find('.share-box').css('padding-top'))
            $shareBox.height(conPadding + conHeight)

            html2canvas(document.getElementById('shareBox')).then(canvas => {
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

    let newsCorrelation = (tags, newsCounds, id) => {
        ajaxGet(url + '/relatednews', {
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
                                    <div class="title">${cutString(d.title, 60)}</div>
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
