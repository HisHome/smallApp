// pages/bookTypeInfo/bookTypeInfo.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookType: 'female',
        type: 'hot',
        minor: '',
        bookTypeInfo: {},
        bookSearchList: [
            { name: '热门', value: 'hot' },
            { name: '新书', value: 'new' },
            { name: '好评', value: 'reputation' },
            { name: '完结', value: 'over' },
            { name: '包月', value: 'monthly' }
        ],
        bookMinor: ['晓说2', '小说1']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.zhuishu.getData('zhuishuApi/categoryInfo', options).then(data => {
            this.setData({
                bookTypeInfo: data,
                searchType: options.type,
                gender: options.gender,
                major: options.major,
                options: options
            })
        })
        app.zhuishu.getData('zhuishuApi/categoryWithSubCategories', options).then(data => {
            let arr = data[options.gender]
            let arr2 = []
            if (arr) {
                arr.forEach(element => {
                    if (element.major == options.major) {
                        arr2 = element.mins
                    }
                });
                if (arr2.length) {
                    arr2.unshift('')
                }
            }
            this.setData({
                bookMinor: arr2
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    changeSearch: function (e) {
        this.setData({
            ...e.target.dataset
        })
        let obj = {
            ...this.options,
            "type": this.data.type,
            "minor": this.data.minor
        }
        app.zhuishu.getData('zhuishuApi/categoryInfo', obj).then(data => {
            this.setData({
                bookTypeInfo: data,
            })
        })
    }
})