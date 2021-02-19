/**
 * Uni 的工具类;
*     https://uniapp.dcloud.io/api/
 */
export default class UniUtil {
    private static debugSuccess(operType: string) {
        return (args: any) => {
            console.log(operType + "操作成功");
            console.log(args);
        }
    }
    private static debugFail(operType: string) {
        return (args: any) => {
            console.log(operType + "操作失败");
            console.log(args);
        }
    }
    
    /** 上传文件的url; */
    public static UploadFileUrl: string = '';

    /** 选择图片 */
    public static chooseImage(): Promise<UniApp.ChooseImageSuccessCallbackResult> {
        return new Promise((resolve, reject) => {
            let option: UniApp.ChooseImageOptions = {  // 选择图片的选项;
                success: (result: UniApp.ChooseImageSuccessCallbackResult) => {  // 成功选择视频，回调                                  
                    resolve(result);
                },
                fail: () => {
                    reject();
                }
            };
            uni.chooseImage(option);
        });
    }

    /** 选择视频 */
    public static chooseVideo(): Promise<UniApp.ChooseVideoSuccess> {
        return new Promise((resolve, reject) => {
            let option: UniApp.ChooseVideoOptions = {  // 选择视频的选项;
                sourceType: ["album"],
                compressed: false,
                success: (result: UniApp.ChooseVideoSuccess) => {  // 成功选择视频，回调                               
                    resolve(result);
                },
                fail: () => {
                    reject();
                }
            };
            uni.chooseVideo(option);
        });
    }



    /** 根据头设置一下某些内容; */
    public static convertUniPromiseResponse<TResponse>(errorAndResponse: any[]): TResponse {
        let [error, rdata] = errorAndResponse;
        let response: TResponse = rdata as TResponse;
        return response;
    }

    public static download(url: string, parameter: any): Promise<string> {
        let urlAndPar: string = url;
        let downloadOption: UniApp.DownloadFileOption = {
            url: urlAndPar,
        };
        UniUtil.fillRequestHeader(downloadOption);
        let unirequestPromise: Promise<any[]> = (uni.downloadFile(downloadOption) as any) as Promise<any[]>;
        return unirequestPromise.then((datas) => {
            let [error, response] = datas;
            let xdata: string = JSON.parse((response as UniApp.DownloadSuccessData).tempFilePath as string);
            return new Promise((resolve) => resolve(xdata));
        });
    }

    /**
       * 设置一下请求的 header,例如补充 x-token之类的东东;
       * @param option -- 选项;
       */
    public static fillRequestHeader(option: UniApp.RequestOptions | UniApp.DownloadFileOption): void {
        if (!option.header) option.header = {};
        option.header["Content-Type"] = "application/x-www-form-urlencoded";
        // option.header.crossDomain = true;
        // option.header.xhrFields = { withCredentials: true };
        return;
    }

    /**
     * 
     * @param provider 
     * @param withCredentials 
     */
    public static getUserinfo(provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi', withCredentials: boolean = true): Promise<UniApp.GetUserInfoRes> {
        return new Promise((resolve, reject) => {
            let getuserOption: UniApp.GetUserInfoOptions = {  // 获得用户信息;
                provider: provider, // "weixin",
                withCredentials: withCredentials,
                success: (userInfoRes: UniApp.GetUserInfoRes) => {  // 成功获得用户信息，进行解密;                                    
                    resolve(userInfoRes);
                },
                fail: () => {
                    reject();
                }
            };
            uni.getUserInfo(getuserOption);
        });
    }
    /** 获取 GetProvider的结果; */
    public static getProvider(service: 'oauth' | 'share' | 'payment' | 'push'): Promise<UniApp.GetProviderRes> {
        return new Promise((resolve) => {
            let requestOption: UniApp.GetProviderOptions = {
                service: service,
                success: (result: any) => {
                    resolve(result);
                }
            };
            uni.getProvider(requestOption);
        });
    }


    public static handleResponseHeader(xdata: any): void {
        // if (xdata.usertoken) {
        //     TokenUtil.set(xdata.usertoken);
        // }
        return;
    }

    /** Uni.login 的 promise 函数 */
    public static login(provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi'): Promise<UniApp.LoginRes> {
        return new Promise((resolve, reject) => {
            let loginOptions: UniApp.LoginOptions = {
                provider: provider,
                success: (result: UniApp.LoginRes) => {
                    resolve(result);
                },
                fail: () => {
                    reject();
                }
            };
            uni.login(loginOptions);
        });

    }

    /** 使用 post 发送数据 */
    public static async post(url: string, parameter: any): Promise<any> {
        let requestOption: UniApp.RequestOptions = {
            url: url,
            data: parameter,
            method: "POST"
        };
        UniUtil.fillRequestHeader(requestOption);
        return new Promise((resolve) => {
            let requestOption: UniApp.RequestOptions = {
                url: url,
                data: parameter,
                method: "POST",
                success: (result: any) => {
                    // DebugUtil.debug(JSON.stringify(result.data));
                    // if (result.data[TokenUtil.TokenName]) {
                    //     TokenUtil.set(result.data[TokenUtil.TokenName]);  //设置一下 Token;
                    // }
                    resolve(result.data);
                }
            };
            UniUtil.fillRequestHeader(requestOption);
            uni.request(requestOption);
        });
    }

    private static convertToNavigateToOption(optionsOrUrl: string | UniApp.NavigateToOptions, complete?: () => void): UniApp.NavigateToOptions {
        if (typeof (optionsOrUrl) === "string") {
           return {
                url: optionsOrUrl,
                complete: complete,
                success: UniUtil.debugSuccess("navigateTo"),
                fail: UniUtil.debugFail("navigateTo"),
            };
        }
        else {
           return optionsOrUrl;
        }
    }
    /**
     * 跳转到给定的页面
     * complete: 成功跳转 或者 失败跳转之后的回调;
     */
    public static navigateTo(optionsOrUrl: string | UniApp.NavigateToOptions, complete?: () => void) {
        // DebugUtil.debug("navigateTo", optionsOrUrl);
        uni.navigateTo(UniUtil.convertToNavigateToOption(optionsOrUrl, complete));
    }

    /**
     * 关闭当前页面，然后重定向到给定的页面。
     * complete: 成功重定向 或者 失败重定向之后的回调;
     */
    public static redirectTo(optionsOrUrl: string | UniApp.NavigateToOptions, complete?: () => void) {
        // DebugUtil.debug("navigateTo", optionsOrUrl);
        uni.redirectTo(UniUtil.convertToNavigateToOption(optionsOrUrl, complete));
    }

    /**
     * 向回走指定页面，然后重定向到给定的页面。
     * complete: 成功跳转 或者 失败跳转之后的回调;
     */
    public static backAndRedirectTo(backDelta: number, optionsOrUrl: string | UniApp.NavigateToOptions) {
        // DebugUtil.debug("backAndRedirectTo", optionsOrUrl);
        uni.navigateBack({
            delta: backDelta
        });
        UniUtil.redirectTo(optionsOrUrl);
    }

    
    /**
     * 向回走指定页面
     */
    public static navigateBack(backDelta: number = 1) {
        // DebugUtil.debug("navigateBack", backDelta);
        let options: UniApp.NavigateBackOptions = {
            delta: backDelta,
        };
        uni.navigateBack(options);
    }


    public static setNavigationBarTitle(optionsOrTitle: string | UniApp.SetNavigationBarTitleOptions) {
        if (typeof (optionsOrTitle) === "string") {
            uni.setNavigationBarTitle({
                title: optionsOrTitle
            });
        }
        else {
			let xoptionOrTitle: UniApp.SetNavigationBarTitleOptions = optionsOrTitle;
            uni.setNavigationBarTitle(xoptionOrTitle);
        }
    }


    /** 显示一个 toast 提示窗口,将自动隐藏 */
    public static showToast(msg: string) {
        uni.showToast({ title: msg, icon: "none" });
    }

    /** 上传素材 */
    public static uploadMedia(filepath: string, otherFormData: any, successCallback: (par: UniApp.UploadFileSuccessCallbackResult) => void, failCallback: (par: UniApp.GeneralCallbackResult) => void) {
        let option: UniApp.UploadFileOption = {
            url: UniUtil.UploadFileUrl,
            name: 'file',
            filePath: filepath,
            formData: otherFormData,
            success: successCallback,
            fail: failCallback
        };
        uni.uploadFile(option);
    }

}


