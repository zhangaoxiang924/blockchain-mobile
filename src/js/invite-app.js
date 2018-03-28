/**
 * Author：liushaozong
 * Time：2018-03-01
 * Description：about
 */
import {pageLoadingHide, getQueryString} from '../../libs/js/utils'
import {
    ajaxGet
} from '../js/public/public'
pageLoadingHide()
let id = '24ab75bba4564567844ef146a47fe2bf'
let getInvite = (id) => {
    ajaxGet('/passport/account/getinvitecard', {
        passportid: id
    }, (data) => {
        console.log(id)
        if (data.code === '1') {
            $('.invite-name span').html(data.obj.nickName)
            // 设置参数方式
            let qrcode = new QRCode('qrcode', {
                text: '邀请你加入火星财经关注区块链第一手信息',
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            })
            // 使用 API
            qrcode.clear()
            qrcode.makeCode(`http://m.huoxing24.com/register.html?passportid=${id}&inviteCode=${data.obj.inviteCode}&giveBonus=${data.obj.giveBonus}`)
        }
    })
}
getInvite(id)
