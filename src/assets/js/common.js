var Tools = {
  show(el, type) {
    el.style.display = type || "block";
  },
  hide(el, type) {
    if(el) {
      el.style.display = type || "none";
    }
  },
  $(elStr) {
    return document.querySelector(elStr);
  },
  /**
     * 获取url地址参数
     * clearLocalStorage param    获取某一个参数    可填(默认返回所有参数)
     * @return {[type]} [description]
     */
  getUrlParmas: function(param) {
    var url = window.location.href;
    if(url.indexOf("?") > 0) {
      var arrParams = url.split("?")[1].split("&"),
        json = {};
      for(var i = 0, len = arrParams.length; i < len; i++) {
        var arr = arrParams[i].split("=");
        json[arr[0]] = arr[1];
      }
      if(param) {
        return json[param];
      } else {
        return json;
      }
    } else {
      return null;
    }
      
  },
  /**
	 * 加载框
	 * @return {[type]} [description]
  */
  openLoading: function() {
    var loadingWrap = document.querySelector("#loading-wrap");
    if(loadingWrap) {
	    this.show(loadingWrap);
    } else {
	    var html = document.createElement("div");
	    html.id = "loading-wrap";
	    html.className = "full-fixed";
	    html.innerHTML = "<div class=\"loading-icon\">" + 
	      "<span>" + 
	        "<div class=\"loading loading-animated\"></div>" + 
	        "</span>" + 
	      "</div>";
	    // $('body').append(html);
	    document.body.appendChild(html);
    }
  },
  closeLoading: function() {
    var loadingWrap = document.querySelector("#loading-wrap");
    this.hide(loadingWrap);
  },
  /**
  * api中post请求
  * @param  {[type]} url  [description]
  * @param  {[type]} data [description]
  * @param  {[type]} options [description]
  * @return {[type]}      [description]
  */
  apiPost: function(url, data, options) {
    options["method"] = "POST";
    this.get(url, data, options);
  },
  apiGet: function(url, data, options) {
    this.get(url, data, options);
  },
  /*
  默认get请求
  */
  get: function(url, data, options) {
    var self = this;

    url = apiServer["apiUrl"] + url;

    $.ajax({
	  //url地址
	  url: url,
	  //参数  				
	  data: data,
	  // 默认get请求
	  type: options.method || "GET",
	  //默认异步请求
	  async: options.async == "false" ? false : true,
	  //超时时间
	  timeout: options.timeout || 15000,
	  //请求之前
	  beforeSend: function(requrest) {
	    // data["zx_token"] = "oV3Y2s_Wi_GMbZnEN7x0rRFuKov8";
        if(!options.hideLoading) {
          self.openLoading();
        }
	    
	  },
	  //成功回调				
	  success: function(res) {
	    self.closeLoading();
	    if(res.code == 0) {
		    options.successFn(res);
	    } else {
		    self.toast(res.msg);

		    if(options.errorFn) {
            options.errorFn(res);
          }
	    }
		
	  },
	  //失败回调
	  error: function(res) {
	    self.closeLoading();

	    if(options.errorFn) {
		    options.errorFn(res);
	    }
	  },
	  //失败或者成功的回调
	  complete: function(requrest, status) {
	    if(requrest == "timeout") {
		  self.closeLoading();
		  self.toast("请求超时,请手动刷新");
	    }
	  }
    });
  },
  /**
  * [toast description]
  * @return {[type]} [description]
  */
  toast: function(value, time) {
    time = time || 3000;
    var html = document.createElement("div");
    html.id = "toast";
    html.className = "toast-tips p-ten color-f font-15 text-center";
    html.innerHTML = "<span>" + value + "</span>";

    document.body.appendChild(html);
    setTimeout(function() {
	  var toast = document.querySelector("#toast");
	  document.body.removeChild(toast);
    }, time);
  },

};

window.Tools = Tools;