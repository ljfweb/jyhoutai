<template>
  <div>
    <quill-editor class="editor" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
    </quill-editor>
    <el-button type="success">确定提交</el-button>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';
export default {
  data() {
    return {
      content: null,
      editorOption: {},
      components: {
        quillEditor
      }
    };
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
  },
};
</script>
<style lang="less" scoped>
  .quill-editor{
    height: 200px;
    margin-bottom: 50px;
  }
</style>