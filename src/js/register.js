/**
 * Author：liushaozong
 * Time：2018-03-01
 * Description：about
 */
import {pageLoadingHide, getQueryString, isIos, isAndroid} from '../../libs/js/utils'
import {isPoneAvailable} from '../js/public/public'
pageLoadingHide()

$(function () {
    // 积分
    $('.nst-num span').html(getQueryString('giveBonus'))

    // 错误提示
    let hintText = $('.register-hint')
    // 邀请注册
    let getInviteRegister = (password, phonenum, nickName, verifcode, inviteCode) => {
        $.ajax({
            type: 'post',
            url: '/passport/account/register',
            dataType: 'json',
            data: {
                password: password,
                phonenum: phonenum,
                nickName: nickName,
                verifcode: verifcode,
                verifcategory: 1,
                inviteCode: inviteCode
            },
            success: function (data) {
                if (data.code === -2) {
                    hintText('手机号已注册')
                } else if (data.code === -5) {
                    hintText('请输入正确的手机号码')
                } else if (data.code === 1) {
                    $('.down-hint, .register-shade').show()
                }
                console.log(data)
            }
        })
    }
    // getInviteRegister()

    // 获取验证码
    let getCode = (countrycode, phonenum) => {
        $.ajax({
            type: 'post',
            url: '/passport/account/getverifcode',
            dataType: 'json',
            data: {
                countrycode: countrycode,
                phonenum: phonenum,
                verifcategory: 1
            },
            success: function (data) {
                console.log(data)
                if (data.code === -8) {
                    hintText.html('该手机号已经注册')
                } else if (data.code === 1) {
                    codeTime(document.getElementById('btnCode'))
                }
            }
        })
    }
    // 倒计时
    let wait = 60
    function codeTime(obj) {
        if (wait === 0) {
            obj.removeAttribute('disabled')
            obj.innerHTML = '获取验证码'
            wait = 60
        } else {
            obj.setAttribute('disabled', true)
            obj.innerHTML = `重新发送(${wait}s)`
            wait--
            setTimeout(function () {
                codeTime(obj)
            }, 1000)
        }
    }
    
    document.getElementById('btnCode').onclick = function () {
        if ($.trim($('#phonenum').val()) === '') {
            hintText.html('手机号不能为空')
        } else {
            if (isPoneAvailable($.trim($('#phonenum').val())) === false) {
                hintText.html('请输入正确的手机号')
            } else {
                getCode(86, $.trim($('#phonenum').val()))
            }
        }
        setTimeout(() => {
            hintText.html('')
        }, 3000)
    }
    $('.register-submit').on('click', () => {
        let phoneNumber = $.trim($('#phonenum').val())
        let verifcode = $.trim($('#verifcode').val())
        let password1 = $.trim($('#password1').val())
        let password2 = $.trim($('#password2').val())
        if (phoneNumber === '') {
            hintText.html('手机号不能为空')
        } else if (isPoneAvailable(phoneNumber) === false) {
            hintText.html('请输入正确的手机号')
        } else if (verifcode === '') {
            hintText.html('验证码不能为空')
        } else if (password1 === '') {
            hintText.html('密码不能为空')
        } else if (password1.length < 6) {
            hintText.html('密码不能少于6位')
        } else if (password1 !== password2) {
            hintText.html('密码输入不一致，请重新输入')
        } else {
            getInviteRegister(password2, phoneNumber, '', verifcode, getQueryString('inviteCode'))
        }
        setTimeout(() => {
            hintText.html('')
        }, 3000)
    })

    // 下载
    let iosUrl = 'https://www.pgyer.com/huoxing24_ios'
    let andUrl = 'https://www.pgyer.com/huoxing24_android'
    let downLoad = $('.b-down, .down-app')

    downLoad.on('click', function () {
        if (isIos()) {
            downLoad.attr('href', iosUrl)
        }
        if (isAndroid()) {
            downLoad.attr('href', andUrl)
        }
    })

    $('.hint-bottom .close').on('click', () => {
        $('.down-hint, .register-shade').hide()
    })
})
