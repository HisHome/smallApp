//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: '你好，世界，未来，和平',
        bookTypeList: {},
        bookType: 'female'
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        app.zhuishu.getData('zhuishuApi/categoryWithBookCount').then(data => {
            this.setData({
                bookTypeList: data
            })
        })
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
