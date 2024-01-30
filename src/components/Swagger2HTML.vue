<template src="./template.html"></template>

<script>
import QTSelect from './QTSelect.vue';
const baseURL = 'https://api-dev-onebss.vnpt.vn/proxy/service/';
export default {
  name: 'Swagger2HTML',
  components: {
    QTSelect
  },
  data() {
    return {
      selected: '',
      txtUrl: '',
      hostArr: [],
      jsonRootArr: [],
      listAPI: [],
      modalTitle: '',
      currentAPI: {}
    }
  },
  mounted() {

  },
  methods: {
    async onEnter() {
      if (this.txtUrl.trim() == '') {
        this.$toast.error('Vui lòng nhập api');
        return;
      }
      let url = this.txtUrl.trim();
      //check url if already exist
      if (this.listAPI.find(x => x.url == url)) {
        this.$toast.error('Api đã tồn tại');
        return;
      }
      const host = url.split('/')[1];
      if (!this.hostArr.includes(host)) {
        const path = baseURL + host;
        let res = await fetch(path);
        const jsonRoot = await res.json();
        this.hostArr.push(host);
        this.jsonRootArr.push({
          host,
          jsonRoot
        });
      }
      //find api
      const api = url.replace("/" + host, "");
      const ds = [];
      const jsonRoot = this.jsonRootArr.find(x => x.host == host).jsonRoot;
      if(!jsonRoot.paths[api]){
        this.$toast.error('Không tìm thấy api');
        return;
      }
      else{
        this.$toast.success('Tìm thấy api');
        this.listAPI.push({
          host,
          url,
          api,
          method: Object.keys(jsonRoot.paths[api])[0].toUpperCase(),
          stt: this.listAPI.length + 1,
          json: jsonRoot.paths[api]
        });
      }
      this.txtUrl = '';
      // console.log(this.listAPI);
    },
    test() {
      this.$toast.info(this.selected);
    },
    tableHeaderClass() {
      return 'table-header'
    },
    tableRowClass() {
      return 'table-row'
    },
    onView(item) {
      this.modalTitle = item.method + ': ' + item.url;
      this.currentAPI = item;
      let schema = {};
      const jsonRoot = this.jsonRootArr.find(x => x.host == item.host).jsonRoot;
      item.json[item.method.toLowerCase()].parameters.forEach(x => {
        if (x.schema) {
          const schemaName = x.schema.$ref.split('/')[2];
          const schemaObj = jsonRoot.definitions[schemaName];
          schema[schemaName] = schemaObj;
        }
      });
      const n = item.json[item.method.toLowerCase()].responses['200'].schema.$ref.split('/')[2];
      schema[n] = jsonRoot.definitions[n];
      this.currentAPI.schema = schema;
      this.$refs.APIHtml.open();
    },
    onDelete(item) {
      this.listAPI = this.listAPI.filter(x => x.stt != item.stt);
      this.$toast.success('Xóa thành công');
    },
  }
}
</script>

<style lang="scss" src="./style.scss" scoped>

</style>