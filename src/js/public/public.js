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

// 比较日前大小
const compareDate = (checkStartDate, checkEndDate) => {
    let arys1 = []
    let arys2 = []
    if (checkStartDate != null && checkEndDate != null) {
        arys1 = checkStartDate.split('-')
        const sdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2])
        arys2 = checkEndDate.split('-')
        const edate = new Date(arys2[0], parseInt(arys2[1] - 1), arys2[2])
        if (sdate > edate) {
            console.log('日期开始时间大于结束时间')
            return false
        } else {
            console.log('通过')
            return true
        }
    }
}

// 判断日期，时间大小
const compareTime = (startDate, endDate) => {
    if (startDate.length > 0 && endDate.length > 0) {
        const startDateTemp = startDate.split(' ')
        const endDateTemp = endDate.split(' ')

        const arrStartDate = startDateTemp[0].split('-')
        const arrEndDate = endDateTemp[0].split('-')

        const arrStartTime = startDateTemp[1].split(':')
        const arrEndTime = endDateTemp[1].split(':')

        const allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2])
        const allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2])

        if (allStartDate.getTime() >= allEndDate.getTime()) {
            console.log('startTime不能大于endTime，不能通过')
            return false
        } else {
            console.log('startTime小于endTime，所以通过了')
            return true
        }
    } else {
        console.log('时间不能为空')
        return false
    }
}

// 比较日期，时间大小
const compareCalendar = (startDate, endDate) => {
    if (startDate.indexOf(' ') !== -1 && endDate.indexOf(' ') !== -1) {
        // 包含时间，日期
        return compareTime(startDate, endDate)
    } else {
        // 不包含时间，只包含日期
        return compareDate(startDate, endDate)
    }
}

const ajaxGet = (url, data, fn) => {
    const ajaxLoadingStr = `<div class="lk-loading ajax active" id="ajaxLoading">
    <div class="lk-loading-center">
        <div class="lk-loading-center-absolute">
            <div class="round round-one"></div>
            <div class="round round-two"></div>
            <div class="round round-three"></div>
        </div>
    </div>
</div>`

    if ($('#ajaxLoading').length === 0) {
        $('body').append(ajaxLoadingStr)
    }

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        data: data,
        error: function () {
            console.log('error')
        },
        success: function (data) {
            $('#ajaxLoading').remove()
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
    let limit = parseInt((requestTime - publishTime)) / 1000
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

// 滚动方向
const scrollDirect = (fn) => {
    let beforeScrollTop = document.body.scrollTop

    fn = fn || function () {
    }

    window.addEventListener('scroll', function (event) {
        // const event = event || window.event
        const afterScrollTop = parseFloat($(window).scrollTop())
        const delta = afterScrollTop - beforeScrollTop
        beforeScrollTop = afterScrollTop

        const scrollTop = $(this).scrollTop()
        const scrollHeight = $(document).height()
        const windowHeight = $(this).height()
        if (scrollTop + windowHeight > scrollHeight - 10) { // 滚动到底部执行事件
            fn('up')
            return
        }
        if (afterScrollTop < 10 || afterScrollTop > $(document.body).height - 10) {
            fn('up')
        } else {
            if (Math.abs(delta) < 10) {
                return false
            }
            fn(delta > 0 ? 'down' : 'up')
        }
    }, false)
}

// 判断是否为对象字符串
const isJsonString = (str) => {
    try {
        if (typeof JSON.parse(str) === 'object') {
            return true
        }
    } catch (e) {
        // console.log(e)
    }
    return false
}

export {
    ajaxGet,
    getTime,
    sevenDays,
    timestampToTime,
    formatDateMore,
    Animation,
    compareCalendar,
    compareTime,
    scrollDirect,
    isJsonString
}
