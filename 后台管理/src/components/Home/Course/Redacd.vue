<template>
  <div>
    <div>
      课程信息
      <div>
        <ul class="redacd_info">
          <!-- 课程信息表单 -->
          <li class="redacd_info_from">
            <ul>
              <li >
                <span>*</span>
                <input type="text" />
                <span>60字以内</span>
              </li>
              <li>
                <span>*</span>
                <input type="text" />
                <span>100字以内</span>
              </li>
              <li>
                <span>*</span>
                <input type="text" />
                <span>课程价格以元为单位，免费课程设置为0</span>
              </li>
              <li>
                  <span>专业选择</span>
                  <select>
  <option value ="volvo">请选择</option>
  <option value ="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
              </li>
            </ul>
          </li>
          <!-- 上传图片 -->
          <li>
              <p>课程封面</p>
            <p><img src="../../../assets/login.jpg" width="150" height="100"></p>
            <p>
            <span>清除</span>
            <i></i>
            <span>上传</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 课程内容区域 -->
    <div>
      <p>课程内容</p>
      <ul>
        <!-- 添加目录 -->
        <li  class="addContent">

        </li>
        <!-- 添加视频 -->
        <li class="addVideo">

        </li>
      </ul>
    </div>
    <!-- 课程详情区域 -->
    <div>
      <p>课程详情</p>
      <textarea/>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
.redacd_info { 
  display:flex;
  .redacd_info_from {
    margin-right: 33px;
  }
  i{padding: 0 35px;}
}

</style>