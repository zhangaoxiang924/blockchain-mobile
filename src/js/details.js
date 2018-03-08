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
let apiInfo = '/info'
const htmlPath = ''
if (isPc()) {
    let href = window.location.href
    if (href.indexOf('details') !== -1) {
        window.location.href = `http://www.huoxing24.com/#/newsdetail/${getQueryString('id')}`
    } else {
        window.location.href = 'http://www.huoxing24.com'
    }
}

// let musicList = [
//     {
//         title: 'Memories',
//         singer: 'Approaching Nirvana',
//         cover: 'http://p1.music.126.net/-Rt_0o6k71V_-OZUjpi_6Q==/6641050232203243.jpg',
//         src: 'http://qqma.tingge123.com:83/123/2016/10/青蛙乐队 - 小跳蛙.mp3',
//         lyric: null
//     }, {
//         title: 'Don t Look',
//         singer: 'Usher',
//         cover: 'http://p1.music.126.net/ldpRUbUReUBh45wJIqfHng==/7748258441443132.jpg',
//         src: 'http://qqma.tingge123.com:83/20081119/甜甜的.mp3',
//         lyric: null
//     }, {
//         title: 'Don t Losdfgsdfgok',
//         singer: 'Usher',
//         cover: 'http://p1.music.126.net/ldpRUbUReUBh45wJIqfHng==/7748258441443132.jpg',
//         src: 'http://qqma.tingge123.com:83/123/2014/12/无字碑-张靓颖.mp3',
//         lyric: null
//     }
// ]

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
    let getDetails = (id) => {
        ajaxGet(url + '/getbyid', {
            id: id,
            channelId: 2
        }, (data) => {
            let audio = data.obj.current.audio
            let musicList = []
            if (audio && audio !== '' && audio.indexOf('[') > -1) {
                if (JSON.parse(audio).length !== 0) {
                    JSON.parse(audio).map(function (item, index) {
                        musicList.push({
                            title: item.fileName,
                            singer: '',
                            cover: 'http://p1.music.126.net/ldpRUbUReUBh45wJIqfHng==/7748258441443132.jpg',
                            src: item.fileUrl,
                            lyric: null
                        })
                    })

                    console.log(musicList[0].src)
                    console.log(musicList[0].title)

                    $('#jquery_jplayer_1').jPlayer({
                        ready: function (event) {
                            $(this).jPlayer('setMedia', {
                                title: musicList[0].title,
                                // m4a: 'http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a',
                                // oga: 'http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg',
                                mp3: musicList[0].src
                            })
                        },
                        swfPath: './jplayer',
                        supplied: 'mp3, m4a, oga',
                        wmode: 'window',
                        useStateClassSkin: true,
                        autoBlur: false,
                        smoothPlayBar: true,
                        keyEnabled: true,
                        remainingDuration: true,
                        toggleDuration: true
                    })
                } else {
                    $('.audio-wrap').css('display', 'none')
                }
            } else {
                $('.audio-wrap').css('display', 'none')
            }

            $('.audio-list-btn').click(function () {
                $('.m-music-list-wrap').toggle()
            })

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

            let readNumber = `<div class="read-number">${cont.current.hotCounts}</div>`

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
    getDetails(getQueryString('id'))

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
                                <a href=${htmlPath + '/details.html?id=' + d.id}>
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

    // 广告
    ajaxGet(apiInfo + '/ad/showad', {
        adPlace: 2,
        type: 2
    }, (data) => {
        const obj = data.obj[2]
        let list = ''
        obj.map((item) => {
            list += `<div class="block-ad">
                        <div class="block-ad-title">
                            <h3>${item.remake}</h3>
                            <span>广告</span>
                        </div>
                        <div class="block-ad-con">
                            <a href="${item.url}"><img src="${item.img_url}"/></a>
                        </div>
                    </div>`
        })
        $('.advertising').append(list)
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
