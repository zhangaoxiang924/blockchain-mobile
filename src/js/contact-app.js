/**
 * Author：liushaozong
 * Time：2018-03-01
 * Description：about
 */
import { pageLoadingHide } from '../../libs/js/utils'

pageLoadingHide()

$(function () {
    let media = [
        {
            title: '微信公众号',
            img: '../img/wx.png',
            cont: 'huoxing24h'
        },
        {
            title: '微博',
            img: '../img/sina.png',
            cont: '火星财经24H'
        },
        {
            title: 'QQ群',
            img: '../img/qq.png',
            cont: '680655203'
        }
    ]
    let collaborate = [
        {
            title: '商务合作',
            img: '../img/business.png',
            cont: '13133477779'
        }
    ]
    let mediaList = ''
    media.map((item) => {
        mediaList += `<li><img src=${item.img} alt=""><span class="title">${item.title}</span><span class="cont">${item.cont}</span></li>`
    })
    $('.media-list').append(mediaList)

    let collaborateList = ''
    collaborate.map((item) => {
        collaborateList += `<li><img src=${item.img} alt=""><span class="title">${item.title}</span><span class="cont">${item.cont}</span></li>`
    })
    $('.collaborateList-list').append(collaborateList)
})
