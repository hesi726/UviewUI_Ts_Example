import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import UniUtil from '@/publicUniTsLib/UniUtil';

export default class BaseVueComponent extends Vue {

    /** 实现 IError 接口中的方法 */
    public error(message: string): void {
        uni.showModal({
            title: '错误',
            content: message,
            showCancel: false,
            confirmText: '关闭'
        });
    }

    /** toast */
    public toast(msg: any): void {
        UniUtil.showToast(msg);
    }

    /** 将对象输出到终端 */
    public debug(...parameter: any[]) {
        //DebugUtil.debug(parameter);
    }
    
    /** mounted 事件,  */
    mounted() {        
        //DebugUtil.debug("mounted @ BaseVueComponent");
    }

    private hasInitiate: boolean = false;

    
    disableAuthen() {
        this.toast('很遗憾,欢迎使用其他功能');
    }

	/**
	 * 回到上一个页面
	 */
	backToPrev() {        
		UniUtil.navigateBack();
    }
   

}
