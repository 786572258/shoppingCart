var json =
{
  "status":0,
  "message":"",
  "result":[
    {
      "addressId":"100001",
      "userName":"JackBean",
      "streetName":"北京市朝阳区朝阳公园1",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":true
    },
    {
      "addressId":"100002",
      "userName":"JackBean",
      "streetName":"北京市朝阳区朝阳公园2",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100003",
      "userName":"JackBean",
      "streetName":"北京市朝阳区朝阳公园3",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100004",
      "userName":"JackBean",
      "streetName":"北京市朝阳区朝阳公园4",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100005",
      "userName":"JackBean",
      "streetName":"北京市朝阳区朝阳公园5",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    }
  ]
}
new Vue({
  el: '.container',
  data: {
    limitNum: 3,
    addressList: [],
    currentIndex: 0,
    shippingMethod: 1
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddressList();
    });
  },
  computed: {
    filterAddress: function() {
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    getAddressList: function() {
      this.addressList = json.result;
    },
    loadMore: function() {
      this.limitNum = this.addressList.length;
    },
    setDefault: function(addressId) {
      this.addressList.forEach(function (address, index) {
        if (address.addressId == addressId) {
          address.isDefault = true;
        }
        else {
          address.isDefault = false;
        }
      });
    }
  }
});
