//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: '你好，世界，未来，和平',
        bookTypeList: {},
        bookType: 'female',
        bookTypeTitleList:[
            {title:'女生',type: 'female',imgName: 'index1'},
            {title:'男生',type: 'male',imgName: 'index2'},
            {title:'漫画',type: 'picture',imgName: 'index3'},
            {title:'出版',type: 'press',imgName: 'index4'},
            // {title:'排行',type: '',imgName: 'index5'},
        ]
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
    changeTookType:function(e){
        if (e.currentTarget.dataset.index == 4){
            wx.navigateTo({
                url: '../rank/rank'
            })
        } else {
            this.setData({
                bookType: e.currentTarget.dataset.booktype
            })
        }
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    getSearchContent: function(e){
        this.setData({
            searchContent: e.detail.value,
        })
    },
    submitSearchBoolOrAuthor: (e)=>{
        if(e.detail.value){
            wx.navigateTo({
                url: '../searchList/searchList?value='+e.detail.value
            })
        }
    }
})
