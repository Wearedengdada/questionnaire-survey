var typ,token;
		  document.addEventListener('plusready',function (){
//		  	plus.storage.clear()
			plus.navigator.setFullscreen(true);  //全屏
			document.getElementById('name').value=plus.storage.getItem('username');
			document.getElementById('password').value=plus.storage.getItem('pass');
			document.getElementById('sub').addEventListener('tap',function(){
				var name1=document.getElementById('name').value;
				var pas=document.getElementById('password').value;
				var dataO = {userName:name1,password:pas}; 
				//alert(dataO.userName)
				mui.ajax('http://139.196.196.64:8080/edsm/service/login',
				{
					type:'post',//请求方式。post /get
					data:dataO,  //如果使用post，向服务器传递参数，使用data属性，可以是一个json，可以是字符串
					contentLength:dataO.length,//如果使用post请求，传递参数的长度
					dataType:'json',//服务器返回给我们的参数的类型
					success:initData,//请求服务器成功之后的回调函数
					error:function(xhr,type,e){//请求服务器失败之后的回调函数 
						alert('请求失败'+xhr.status+"--"+type+"--"+e);
					}
				}) 
				
			});
			function initData(data){
					if(data.result==1){
						plus.nativeUI.toast('登录成功');
						token=data.user.token;
						var name1=document.getElementById('name').value;
						var pas=document.getElementById('password').value;
						plus.storage.setItem('username',name1);
						plus.storage.setItem('pass',pas);
						plus.storage.setItem('token',token);
						typ=data;
						 mui.openWindow({
							    url:'zhuye.html', 
							    id:'zhuye.html',
							    extras:{
							    	json_ty:typ
							    },
							    show:{
							    	autoshow:true,
							   },
							      waiting:{
     								 autoShow:true
     							}
							});
					}
					else {
						plus.nativeUI.toast(data.msg)
					}
			}
			var backButtonPress = 0;
			mui.back = function(event) { 
				backButtonPress++;
				if (backButtonPress > 1) {
					plus.runtime.quit();
				} else {
					plus.nativeUI.toast('再按一次退出应用');
				}
//				etTimeout(function() {
//					backButtonPress = 0;
//				}, 1000);
				return false;
			};
	 	},false);
		
		