/**
 * Author: liushaozong
 * Date: 2018/1/29
 * Time: 22:02
 * Description:Description
 */

const formatDateMore = (time) => {
    const timemap = new Date(time)
    const y = timemap.getFullYear()
    const m = timemap.getMonth() < 10 ? '0' + (timemap.getMonth() + 1) : timemap.getMonth() + 1
    const d = timemap.getDate() < 10 ? '0' + timemap.getDate() : timemap.getDate()
    const h = timemap.getHours() < 10 ? '0' + timemap.getHours() : timemap.getHours()
    const mn = timemap.getMinutes() < 10 ? '0' + timemap.getMinutes() : timemap.getMinutes()
    return `${y}-${m}-${d} ${h}:${mn}`
}

const get = (url, data, fn) => {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        data: data,
        error: function () {
            console.log('error')
        },
        success: function (data) {
            fn.call(window, data, url)
        }
    })
}

const getTime = (publishTime, requestTime) => {
    const zero = (m) => {
        return m < 10 ? '0' + m : m
    }
    const format = (date) => {
        let time = new Date(date)
        let y = time.getFullYear()
        let m = time.getMonth() + 1
        let d = time.getDate()
        if (date) {
            return y + '-' + zero(m) + '-' + zero(d)
        } else {
            return ''
        }
    }
    let limit = parseInt((requestTime - publishTime))
    let content = ''
    if (limit < 60) {
        content = '刚刚'
    } else if (limit >= 60 && limit < 3600) {
        content = Math.floor(limit / 60) + ' 分钟前'
    } else if (limit >= 3600 && limit < 86400) {
        content = Math.floor(limit / 3600) + ' 小时前'
    } else {
        content = format(publishTime) || '时间格式错误'
    }
    return content
}

// 计算前7天日期
const sevenDays = () => {
    const formatDate = (y, m, d) => {
        const newM = m < 10 ? `0${m + 1}` : m + 1
        const newD = d < 10 ? `0${d}` : d

        return `${y}-${newM}-${newD}`
    }

    let dateArray = []
    for (let i = 0; i < 7; i++) {
        const caDate = new Date()
        caDate.setDate(caDate.getDate() - i)
        dateArray.push(formatDate(caDate.getFullYear(), caDate.getMonth(), caDate.getDate()))
    }

    return dateArray
}

// 时间戳转日期
const timestampToTime = (timestamp) => {
    const date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    const h = date.getHours() + ':'
    const m = date.getMinutes() + ':'
    const s = date.getSeconds()
    return Y + M + D + h + m + s
}
// 返回顶部
const Animation = () => {
    const timer = setInterval(() => {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        document.documentElement.scrollTop = osTop - (osTop) / 8
        document.body.scrollTop = osTop - (osTop) / 8
        if (osTop <= 5) {
            clearInterval(timer)
        }
    }, 10)
}

export { get, getTime, sevenDays, timestampToTime, formatDateMore, Animation }
