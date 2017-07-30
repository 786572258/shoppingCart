// 模拟数据
var json = {
  "status":1,
  "result":{
    "totalMoney":109,
    "list":[
      {
        "productId":"600100002115",
        "productName":"黄鹤楼香烟",
        "productPrice":19,
        "productQuantity":1,
        "productImage":"static/img/goods-1.jpg",
        "parts":[
          {
            "partsId":"10001",
            "partsName":"打火机",
            "imgSrc":"static/img/part-1.jpg"
          },
          {
            "partsId":"10002",
            "partsName":"打火机",
            "imgSrc":"static/img/part-1.jpg"
          }
        ]
      },
      {
        "productId":"600100002120",
        "productName":"加多宝",
        "productPrice":8,
        "productQuantity":5,
        "productImage":"static/img/goods-2.jpg",
        "parts":[
          {
            "partsId":"20001",
            "partsName":"吸管",
            "imgSrc":"static/img/part-2.jpg"
          }
        ]
      },
      {
        "productId":"600100002117",
        "productName":"金装黄鹤楼",
        "productPrice":25,
        "productQuantity":2,
        "productImage":"static/img/goods-1.jpg",
        "parts":[
          {
            "partsId":"10001",
            "partsName":"打火机-1",
            "imgSrc":"static/img/part-1.jpg"
          },
          {
            "partsId":"10002",
            "partsName":"打火机-2",
            "imgSrc":"static/img/part-1.jpg"
          }
        ]
      }
    ]
  },
  "message":""
}
// 要放到new vue 的上面！！ 全局过滤器
Vue.filter('money', function(value, type) {
  return "¥" + value.toFixed(2) + type;
})
var vm = new Vue({
  el: "#app",
  data: {
    productList: {},
    checkAllFlag: false,
    delFlag: false,
    curProduct: '',
    //totalMoney: 0
  },
  filters: {
    formatMoney: function(value) {
      return "¥" + value.toFixed(2);
    }
  },
  methods: {
    getProductList: function () {
        this.productList = json.result.list;
    },
    selectedProduct(item) {
      if (typeof item.checked == 'undefined') {
        // Vue.set(item, "checked", true);
        this.$set(item, "checked", true);
      } else {
        item.checked = !item.checked;
      }
    },
    checkAll: function () {
      this.checkAllFlag = !this.checkAllFlag;
      var _this = this;
      this.productList.forEach(function (value, index) {
        if (typeof value.checked == 'undefined') {
          _this.$set(value, "checked", true);
        } else {
          value.checked = _this.checkAllFlag;
        }
      })
    },
    changeMoney: function (item, flag) {
      if (flag >= 1) {
        item.productQuantity++;
      } else {
        item.productQuantity--;
        if (item.productQuantity < 1) {
          item.productQuantity = 1;
        }
      }
    },
    calcTotalPrice: function () {
      this.totalMoney = 0;
      this.productList.forEach((value, index) => {
        if (value.checked == true) {
            this.totalMoney += value.productPrice * value.productQuantity;
        }
      })
    },
    delConfirm: function (item) {
      this.delFlag = true;
      this.curProduct = item;
    },
    delProduct: function () {
      var index = this.productList.indexOf(this.curProduct);
      this.productList.splice(index, 1);
      this.delFlag = false;
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getProductList();
    })
  },
  computed:{
    totalMoney:function () {
        var money = 0
        if (this.productList[0]) {
          this.productList.forEach(function (e, i) {
              if(e.checked) {
                  money += e.productPrice * e.productQuantity;
              }
          })
        }
        return money
    }
  },
  watch: {
    // checkAllFlag: {
    //   deep:true,
    //   handler: function (val, oldVal) {
    //   //  this.calcTotalPrice();
    //
    //   }
    // }
  }
});
