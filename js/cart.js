new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productList: [],
    checkAllFlag: false,
    delFlag: false,
    curProduct: ''
  },
  filters: {
    formatMoney: function(value) {
      return "¥" + value.toFixed(2);
    }

  },
  mounted: function() {
    this.$nextTick(function() {
      this.cartView();
    })
  },
  methods: {
      cartView: function() {
        var _this = this;
        // this.$http.get("file:///www/shoppingCart/data/cartData.json", {"id": 123}).then(function(res) {
        //   _this.productList = res.body.result.list;
        //   // _this.totalMoney =  res.body.result.totalMoney;
        // });

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
        _this.productList = json.result.list;

      },
      changeMoney: function(product, way) {
        if (way > 0) {
          product.productQuantity++;
        }
        else {
          product.productQuantity--;
          if (product.productQuantity < 1) {
            product.productQuantity = 1;
          }
        }
        this.calcTotalPrice();

      },
      selectedProduct: function(item) {
        if (typeof item.checked == 'undefined') {
          // Vue.set(item, "checked", true);
          this.$set(item, "checked", true);
        }
        else {
          item.checked = !item.checked;
        }
        this.calcTotalPrice();
      },
      checkAll: function(flag) {
        this.checkAllFlag = flag;
        var _this = this;
        this.productList.forEach(function (item, index) {
          if (typeof item.checked == 'undefined', _this.checkAllFlag) {
            _this.$set(item, "checked", _this.checkAllFlag);
          }
          else {
            item.checked = _this.checkAllFlag;
          }
        });
        this.calcTotalPrice();
      },
      calcTotalPrice: function() {
        var _this = this;
        this.totalMoney = 0;
        this.productList.forEach(function(item, index) {
          if (item.checked) {
            _this.totalMoney += item.productPrice * item.productQuantity;
          }
        });
      },
      delConfirm: function(item) {
        this.delFlag = true;
        this.curProduct = item;
      },
      delProduct: function() {
        var index = this.productList.indexOf(this.curProduct);
        this.productList.splice(index, 1);
        this.delFlag = false;
      }
    }
});
// 全局过滤器
Vue.filter('money', function(value, type) {
  return "¥" + value.toFixed(2) + type;
})
