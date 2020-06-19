// pages/bookDetail/bookDetail.js
const app = getApp()
const { $Message } = require('../../iview/base/index');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookDetail: {},
        bookReview: {}
    },
    addBook: function(){
        $Message({
            content: '功能待开通',
            type: 'success'
        });
    },
    startRead: function(e){
        if(e.currentTarget.dataset.id){
            wx.navigateTo({
                url: '../bookContent/bookContent?id='+e.currentTarget.dataset.id
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            bookId: options.id
        })
        if(options.id){
            app.zhuishu.getData("zhuishuApi/bookInfo", {paramsList:[ options.id]}).then(data => {
                this.setData({
                    bookDetail: data
                })
             })
             app.zhuishu.getData('zhuishuApi/bookReviews', {
                 book: options.id,
                 sort: 'updated',
                 start: 0,
                 limit: 3,
             }).then(data => {
                 this.setData({
                     bookReview: data
                 })
              })
        }
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

    }
})