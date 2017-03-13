			var sername, diaocha_typ;   
			//预加载
			mui.init(function(){
				preloadPages:[
				    {
				      url:'zhuye.html',
				      id:'zhuye.html', 
				      styles:{},//窗口参数
				      extras:{},//自定义扩展参数
				      subpages:['yonghu.html', 'diaochaxuanxiang.html']//预加载页面的子页面
				    }
			    ]
			})
			mui.plusReady(function() {
				// 监听手机返回键
				var backButtonPress = 0;
				mui.back = function(event) {
					backButtonPress++;
					if(backButtonPress > 1) {
						plus.runtime.quit();
					} else {
						plus.nativeUI.toast('再按一次退出应用');
					}
					//				etTimeout(function() {
					//					backButtonPress = 0;
					//				}, 1000);
					return false;
				};

				//			窗口下拉刷新
				//		 	var ws=plus.webview.currentWebview();
				//			ws.setBounce({position:{top:"100px"},changeoffset:{top:"0px"}});
				//窗口全屏
				plus.navigator.setFullscreen(true);
				//关闭等待框
				plus.nativeUI.closeWaiting();
				//  显示当前页面
				mui.currentWebview.show();
				//得到登录界面的传值
				type = plus.webview.currentWebview().json_ty;
				document.getElementById('yonghu').addEventListener('tap', function() {
						mui.openWindow({
							url: 'yonghu.html',
							id: 'yonghu.html',
							extras: {
								json_ty: type
							},
							show: {
								autoshow: true,
								duration: 700
							}
						});
					}) //获取登录信息； 
				mui('#ul').on('tap', 'li', function() {
					var a = this.getAttribute('id');
					a = a.substring();
					sur = this.value;
//					alert(JSON.stringify(diaocha_typ))
					var da = diaocha_typ.surveyList[sur];
//					alert(diaocha_typ.page)
					var sure = da.surveyId
					var val = da.surveyDes
					mui.openWindow({
						url: 'diaochaxuanxiang.html',
						id: 'dc',
						extras: {
							json_ty: type,
							titl: a,
							survery: sure,
							tex_value: val
						},
						show: {
							autoshow: true,
							duration: 700
						}
					});
				})
			})
			mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
						callback: pulldownRefresh
					},
					up: {
						contentrefresh: '正在加载...',
						height:0,
						callback: pullupRefresh
					}
				}
			});
			/**
			 * 下拉刷新具体业务实现
			 */
			function pulldownRefresh() {
				setTimeout(function() {
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
				}, 1500);
			}
			var count = 1;
			/**
			 * 上拉加载具体业务实现
			 */
			function pullupRefresh() {
				setTimeout(function() {
					var foo = plus.storage.getItem('token');
					//					alert(foo)
					var url = "http://139.196.196.64:8080/edsm/service/getSurveyList?pageSize=10&page=" + count;
					mui.ajax(url, {
						type: "get",
						dataType: "json",
						headers: {
							token: foo
						},
						success: listCB,
						error: function() {
							alert("访问失败") 
						}
					
					});
					count++; 
				}, 1500);
			}
			if(mui.os.plus) {
				mui.plusReady(function() {
					setTimeout(function() {
						mui('#pullrefresh').pullRefresh().pullupLoading();
					}, 1000);

				});
			} else {
				mui.ready(function() {
					mui('#pullrefresh').pullRefresh().pullupLoading();
				});
			}
			var ul = document.getElementById("ul");

			function listCB(data) {
				if(data.result == 1) { 
//					alert(data.page)
					diaocha_typ = data;
//					count++;
					for(var i = 0; i < data.surveyList.length; i++) {
						var survey = data.surveyList[i]
						var startTime = survey.startTime;
						var endTime = survey.endTime;
						var surveyDes = survey.surveyDes;
						var imgUrl = survey.imgUrl;
						var surveyName = survey.surveyName;
						var li = document.createElement("li");
						li.value = i;
						li.id = surveyName
						li.className = "mui-table-view-cell";
						li.innerHTML = '<p style="font-size: 20px;color: black;margin-top:20px">' + surveyName + '</p><p style="color: #7f7f7f;">时间:' + startTime + '至' + endTime + '</p><img class=" mui-pull-left" src="' + imgUrl + '" width="40%"><div class="a-abc" style="padding-left: 10px;">' + surveyDes + '</div>';
						ul.appendChild(li)
					}
				} else {
					alert(data.msg)
				}
				var m=data.surveyList
				if(m.length < count) {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false)
				}

			}
			//调用注销
			function clos() {
				var webv = plus.webview.currentWebview();
				webv.close();
			}