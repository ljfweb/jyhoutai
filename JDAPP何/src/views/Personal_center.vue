<template>
  <div style="background-color: white;">
    <van-nav-bar title="个人中心" left-arrow @click-left="onClickLeft" />
    <div>
      <van-row type="flex" align="center">
        <van-col :span="6">当前头像：</van-col>
        <van-col :span="6"
          ><van-image :src="headerImg" width="78px" height="78px"
        /></van-col>
        <van-col span="6">
          修改头像:
          <van-uploader :after-read="afterRead" />
        </van-col>
      </van-row>
    </div>
    <van-form @submit="onSubmit">
      <!-- <van-field v-model="username" name="truename" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" /> -->
      <van-field
        v-model="nickname"
        name="nickname"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal" name="sex">
            <van-radio name="1">女</van-radio>
            <van-radio name="2">男</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="birthday"
        name="birthday"
        label="生日"
        placeholder="生日"
      />
      <van-area
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import AreaList from "../assets/Area.js";
export default {
  created() {
    // 获取用户数据方法
    this.userid = this.$route.query.uid;
    this.userInformationDate();
  },
  data() {
    return {
      headerImg: "",
      nickname: "",
      radio: "1",
      birthday: "",
      areaList: AreaList,
      uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
    };
  },
  methods: {
    onClickLeft() {
      ///返回删一页
      this.$router.go(-1);
    },
    async userInformationDate() {
      const { data: res } = await this.$axios.post(
        `https://api.ymduo.com/Member/information`,
        this.$qs.stringify({ uid: this.userid })
      );
      console.log(res.result.data);
      const result = res.result.data;
      this.nickname = result.nickname;
      this.radio = result.sex;
      this.birthday = result.birthday;
      this.headerImg = result.head;
    }, //获取是所有数据提jiao
    async onSubmit(values) {
      values.uid = 956535;
      values.radio == "2" ? (values.sex = "2") : "";
      values.radio == "1" ? (values.sex = "1") : "";
      console.log("submit", values);
      const { data: res } = await this.$axios.post(
        `https://api.ymduo.com/Member/imchange`,
        this.$qs.stringify(values)
      );
      console.log(res);
      if (res.code == 200) this.$toast.success("提交成功");
      if (res.code !== 200) this.$toast.fail("提交失败");
      window.location.reload(); //刷新页面,不重复提交页面。
    },
    async afterRead(file) {
      //
      // 此时可以自行将文件上传至服务器
      console.log(file.content);
      const binary = file.content.split(",")[1];
      const { data: res } = await this.$axios.post(
        `https://api.ymduo.com/Home/member/uploadImage`,
        this.$qs.stringify({ image: binary })
      );
      console.log(res);
    }
  }
};
</script>
<style scoped></style>
