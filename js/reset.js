const preFixx = 'https://api.scrum66.cyou'
/**
 * 通用AJAX POST请求封装
 * @param {Object} config - 配置对象
 * @param {string} config.url - 请求地址
 * @param {Object} [config.data={}] - 请求数据（可选）
 * @param {Function} [config.successCallback] - 成功回调（可选）
 * @param {Function} [config.errorCallback] - 失败回调（可选）
 * @param {string} [config.dataType='json'] - 返回数据类型（可选）
 * @param {Object} [config.headers] - 自定义请求头（可选）
 */
function sendPostRequest(config) {
    // 默认参数合并
    const options = Object.assign({
        type: 'POST',
        dataType: 'json',
        data: {},
        headers: {}
    }, config);
    let loading = config.loading == false ? false : true
    // 添加语言参数到数据中
    const requestData = {
        ...options.data
    };
    const requestHeader = {
        ...options.headers,
        token: sessionStorage.getItem('token') || 'null',
        Thinklang: sessionStorage.getItem('userLang') || 'zh-cn' ,
    }
    const loadingText = currLangList["loading"]
    if(loading) {
        layer.load(2, { 
            shade: [0.4, '#fff'],
            success: function (layero) {
                layero.find('.layui-layer-content').after(`<div class="layer-load">${loadingText}</div>`);
              	layero.find('.layer-load').css({
               	 transform: 'translateX(-50%) translateY(10px)',
               	 position: 'absolute',
              	 width: 'max-content',
              	 left: '50%'
             	})
            }
        }); 
    }
    
    // 发起请求
    $.ajax({
        url: options.url,
        type: options.type,
        dataType: options.dataType,
        data: requestData,
        headers: requestHeader,
        success: function(result) {
            if(loading) {
                 layer.closeAll()
            }
           
            if(result.code == '5001') {
                window.location.href = '../index.html'
            } else {
                options.successCallback(result);
            }
            
        },
        error: function(xhr, status, error) {
            // 请求失败处理
           layer.closeAll()
            if (typeof options.errorCallback === 'function') {
                options.errorCallback(xhr, status, error);
            }
        }
    });
}


function getUrlParam(key) {
    const queryString = window.location.search.substring(1); // 去掉开头的 '?'
    const params = new URLSearchParams(queryString);
    
    // 或手动解析：
    // const params = {};
    // queryString.split('&').forEach(pair => {
    //   const [k, v] = pair.split('=');
    //   params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    // });
    
    return params.get(key);
  }


  const systemInfo = sessionStorage.getItem("systemInfo") ? JSON.parse(sessionStorage.getItem("systemInfo")) : {};
  
function goBack() {
    history.back();
}
function validateForm(formData) {
    for (const rule of rules) {
        const value = formData[rule.field];
        console.log(99, rule)
        // 必填项检查
        if (rule.required && !value) {
            layer.msg(`${rule.message}`);
            return false;
        }
        
        // 自定义验证器
        if (rule.validator && !rule.validator(value, formData)) {
            layer.msg(`${rule.message}`);
            return false;
        }
    }
    return true;
}



