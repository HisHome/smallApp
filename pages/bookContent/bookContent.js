// pages/bookContent.js
const app = getApp()
const { $Message } = require('../../iview/base/index');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showLeft: false,
        bookChapterList: [],
        bookContentList: [],
        fontSize: 14,
        visible: false,
        actions: [
            {
                name: '字号 +',
            },
            {
                name: '字号 -',
            },
            {
                name: '目录',
            }
        ],
        startNum: 0,
        pageNum: 0,
    },
    initBookContent: function(data){
        if(data.chapter&&data.chapter.cpContent){
            data.chapter.cpContentList = data.chapter.cpContent.split('\n')
            data.chapter.cpContentList.forEach((item)=>{
                item = item.replace(/\s/g,'')
            })
        }
        return data;
    },
    onPullDownRefresh: function(){
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        // 页数+1
        let startNum = this.data.startNum - 1
        if(startNum < 0){
            $Message({
                content: '已经是第一章',
                type: 'success'
            });
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            return;
        }
        this.setData({
            startNum: startNum
        })
        app.zhuishu.getData('zhuishuApi/chapterContent', {
            paramsList:[ this.data.bookChapterList[startNum].link ],
        }).then(data => {
            let bookContentList = this.data.bookContentList;
            data = this.initBookContent(data)
            bookContentList.unshift(data)
            this.setData({
                bookContentList: bookContentList
            })
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        })
    },
    onReachBottom: function(){
        // 显示加载图标
        wx.showLoading({
          title: '玩命加载中',
        })
        // 页数+1
        let pageNum = this.data.pageNum + 1
        this.setData({
            pageNum: pageNum
        })
        app.zhuishu.getData('zhuishuApi/chapterContent', {
            paramsList:[ this.data.bookChapterList[pageNum].link ],
        }).then(data => {
            let bookContentList = this.data.bookContentList;
            data = this.initBookContent(data)
            bookContentList.push(data)
            this.setData({
                bookContentList: bookContentList
            })
            wx.hideLoading();
        })
    },
    handleOpen: function(){
        this.setData({
            visible: true
        });
    },

    handleCancel:function(){
        this.setData({
            visible: false
        });
    },
    handleClickItem: function(data){
        const index = data.detail.index + 1;
        if(index == 1){
            if(this.data.fontSize > 19) return;
            this.setData({fontSize: this.data.fontSize + 1})
        } else if(index == 2){
            if(this.data.fontSize < 13) return;
            this.setData({fontSize: this.data.fontSize - 1})
        } else if(index == 3){
            this.toggleLeft();
            this.handleCancel();
        }
    },
    toggleLeft:function(){
        this.setData({
            showLeft: !this.data.showLeft
        });
    },
    chanageChapter:function(e){
        app.zhuishu.getData('zhuishuApi/chapterContent', {
            paramsList:[ e.currentTarget.dataset.link ],
         }).then(data => {
            data = this.initBookContent(data)
             this.setData({
                bookContentList: [data],
                 showLeft: !this.data.showLeft,
                 startNum: e.currentTarget.dataset.startnum,
                 pageNum: e.currentTarget.dataset.startnum,
             })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
         wx.showLoading({
            title: '玩命加载中',
          })
         app.zhuishu.getData('zhuishuApi/bookSources', {
            "book": options.id,
            "view":"summary"
         }).then(data => {
            app.zhuishu.getData('zhuishuApi/bookChapters', {
                paramsList:[ data[0]._id ],
                view: 'chapters'
             }).then(data => {
                this.setData({
                    bookChapterList: data.chapters
                })
                app.zhuishu.getData('zhuishuApi/chapterContent', {
                    paramsList:[ data.chapters[this.data.pageNum].link ],
                }).then(data => {
                    data = this.initBookContent(data)
                     this.setData({
                         bookContentList: [data]
                     })
                     setTimeout(()=>{
                        wx.hideLoading();
                     },500)
                })
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})