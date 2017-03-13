		var sur,posi,time,newtime,jishi,t=0,dat,foo,m;
		//定义两个变量用来获取录音和照片路径；
		var zpwj='',lywj='',jss;
		var ybid,yp,answer,dat;
		var kg='false';
		var n=0;
		var mm;
	mui.plusReady(function(){ 
		var a=plus.storage.getItem('m');
		var ne=plus.storage.getItem('neir')
		ne=eval("("+ne+")");  
//		alert(a)
		if(a==null||a==''){
			m=0;
			 
		}else{
			a=parseInt(a)
			m=a;
		}
		alert(m+'-'+ne)
//		ybid=plus.storage.getItem('dqybid');
		yp=plus.audio.getRecorder();  //获取录音设备监听	
		var luy_=document.getElementById('luy');	
		sur=plus.webview.currentWebview().sure;
		foo=plus.storage.getItem('token');   //获取表头
//		alert(sur)
		
		document.getElementById('shaoma').addEventListener('tap',function(){  //二维码
			mui.openWindow({
					url:'shaoma.html', 
					id:'shaoma',
					show:{ 
						autoshow:true,
						duration:700
					} 
				});
		})
		document.getElementById('pz').addEventListener('tap',function(){  //拍照
			mui.openWindow({
					url:'paizhao.html', 
					id:'paizhao',
					show:{ 
						autoshow:true,
						duration:700
					} 
				});
		})
		document.getElementById('xuanz').addEventListener('tap',function(){    //选择样本
			mui.openWindow({
					url:'xuanze.html', 
					id:'xz',
					extras: {
						sure:sur
					},
					show:{ 
						autoshow:true,
						duration:600
					} 
				});
		})
		document.getElementById('kais').addEventListener('tap',function(){
			var inp=document.getElementsByTagName('input');
			var zp=plus.storage.getItem('zp');
			var retu=''
			for(var i=0;i<3;i++){
				if(inp[i].value==''||inp[i].value==null){
					plus.nativeUI.toast(inp[i].placeholder);
					retu='';
					break;
				}else{
					retu='ture'
				}
			}
			if(zpwj==''){
				retu='false';
				plus.nativeUI.toast('还未拍照合影')
			}
			else{
			if(retu='ture'){
				var nam=inp[0].value;
				var numb=inp[1].value;
				var yangb=inp[2].value;
				var wjid=sur; 
				var ks=document.getElementById('kais')
//				alert(ybid+''+yangb)
				plus.geolocation.getCurrentPosition(function(dz){
					var lat=dz.coords.latitude;   //纬度
					var lon=dz.coords.longitude;  //经度
					var alt=dz.coords.altitude;	  //海拔
					posi=dz.address.city+dz.address.district+dz.address.poiName;
//					alert(lat+'<br>'+lon+posi);
//					dw(lat,lon);
				}, function(e){
					plus.nativeUI.toast(e.message)
				})
				if(ks.innerHTML=='开始答题'){
						ks.innerHTML='暂停答题';
						time=new Date();
						time=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'  '+time.toLocaleTimeString()
//						alert(time)
						js();
						ly();
					}
					else if(ks.innerHTML='暂停答题'){
						ks.innerHTML='开始答题';
						clearTimeout(jishi);
						jieshu();
						newtime=new Date();
						newtime=newtime.getFullYear()+'-'+newtime.getMonth()+'-'+newtime.getDate()+'  '+newtime.toLocaleTimeString()
//						alert(newtime)
					}
			}}
			
		})
		function ly(){
			plus.nativeUI.toast('开始')
				yp.record(
				{
//					filename: ,//(DOMString 类型 )保存录音文件的路径
//					samplerate: ,//(DOMString 类型 )录音文件的采样率
//					format: ,//(DOMString 类型 )录音文件的格式
				},function(path){
					plus.io.resolveLocalFileSystemURL(path,function(eve){		//获取回调函数的完整路径
						var fil=eve.fullPath;
//						luy_.src=fil;	
//						alert(fil)
						plus.nativeUI.toast(fil);
						lywj=fil;
					})
//					alert(path);
				},function(e){
					plus.nativeUI.toast(e.message)
				});
		}
		function jieshu(){
			t=0;
			plus.nativeUI.toast('暂停');
			yp.stop();
			kg='true'
		}
		document.getElementById('jies').addEventListener('tap',function(){
			if(kg=='true'){
				if(confirm('是否要提交？')){
					var yb=document.getElementById('yangben').value;
					//alert(n+mm+'---'+dat)
					if(n>0&&mm==dat){
						alert('当前问卷已经提交过了')
					}else{
						tj();
						mm=document.getElementById('yangben').value ;
						document.getElementById('jies').disabled='disabled'
					}
				}else{
					
				}
			}else{
				if(confirm('问卷还未完成，是否要退出')){
					var wv=plus.webview.currentWebview();
					wv.close()
				}
			}
		})
	})	
		document.getElementById('fanh').addEventListener('tap',function(){
				var wv=plus.webview.currentWebview();
				var wv1=wv.opener();
				wv1.evalJS('sx()');
				mui.back();
			})
		function js(){
//			alert(t)
//			alert(time)
			document.getElementById('h5').innerHTML='正在答题,已经进行'+t+'秒';
			t++;
			jishi= setTimeout('js()',1000);
		}
//		function dw(w,j){
////			alert(w+'/'+j)
//				mui.ajax('http://lbs.juhe.cn/api/getaddressbylngb?lngx='+j+'&lngy='+w,
//				{  
//					type:"get",
//					dataType:"json",
//				success:function(data){ 
//					dz=data.row.result.formatted_address;
////					alert(dz)
//				}, 
//				error:function(){
//					alert("访问失败")
//				}
//			})
//		}
//		
		function tx(){
			dat=plus.storage.getItem('ybbh');
			ybid=plus.storage.getItem('dqybid');
			document.getElementById('yangben').value=dat;
//			alert('你成功了'+'0'+dat)
		}
		function dd(){
			zpwj=plus.storage.getItem('zp');
		}
		function tj(){
			var name_tex=document.getElementById('name').value;
			var phone=document.getElementById('number').value;
			var yb=document.getElementById('yangben').value;
			phone=parseInt(phone);
			ybid=parseInt(ybid); 
			datao={	surveyId:sur,
					realName:name_tex,
					phoneNum:phone,
					residentCode:yb,
					sampleId:ybid,
					startTime:time,
					endTime:newtime,
					phoneLocation:posi
				}
			alert(JSON.stringify(datao))
			mui.ajax('http://139.196.196.64:8080/edsm/service/submitSurveyUser',
			{
					type:'post',//请求方式。post /get
					data:datao,  //如果使用post，向服务器传递参数，使用data属性，可以是一个json，可以是字符串
					headers:{
							token:foo
						},
					contentLength:datao.length,//如果使用post请求，传递参数的长度
					dataType:'json',//服务器返回给我们的参数的类型
					success:function(data){
//						alert(JSON.stringify(data))
						if(data.result==1){
							plus.nativeUI.toast('数据提交成功正在上传文件')
							answ=data.answerId;
							answer=answ;  //这句话没用
							sc(answ)
						}
					},//请求服务器成功之后的回调函数
					error:function(xhr,type,e){//请求服务器失败之后的回调函数 
						plus.nativeUI.toast('请求失败'+xhr.status+"--"+type+"--"+e);
					}
			})
		}
		function sc(answ) {
//			alert(answ)
			var task = plus.uploader.createUpload("http://139.196.196.64:8080/edsm/service/uploadAnswerFile", 
				{
					method: "POST",
					blocksize: 204800,
					priority: 100
				},
				function(t, status) {
					// 上传完成;
					plus.nativeUI.toast(t.uploadedSize+'/'+t.totalSize)
					if(status == 200) {
						plus.nativeUI.toast("照片上传成功: " + t.url+t.responseText);
						jx(answ)
					} else { 
						plus.nativeUI.toast("上传失败: " + status);
					}
				}
			);
//			alert(sur+''+answ+''+zpwj)
			task.addFile(zpwj, {key: "answerFile"});
			task.addData("surveyId",sur+'');
			task.addData("answerId",answ+'');
			task.addData("type",'0'); 
			task.setRequestHeader("token",foo);//添加请求头---这4个参数只是文档需求，自己看情况是否需要添加上传参数
			task.start();
		
	}
		function jx(answ){
			var task = plus.uploader.createUpload("http://139.196.196.64:8080/edsm/service/uploadAnswerFile", 
				{
					method: "POST",
					blocksize: 204800,
					priority: 100
				},
				function(t, status) {
					// 上传完成;
					plus.nativeUI.toast(t.uploadedSize+'/'+t.totalSize)
					if(status == 200) {
						plus.nativeUI.toast("录音上传成功: " + t.url+t.responseText);
						cz(answ)
					} else {
						plus.nativeUI.toast("上传失败: " + status);
					}
				}
			);
//			alert(sur+''+answ+''+lywj)
			task.addFile(lywj, {key: "answerFile"});
			task.addData("surveyId",sur+'');
			task.addData("answerId",answ+'');
			task.addData("type",'2');
			task.setRequestHeader("token",foo);//添加请求头---这4个参数只是文档需求，自己看情况是否需要添加上传参数
			task.start();
		}
		function cz(answ){
			var username=plus.storage.getItem('username');
			var ne=plus.storage.getItem('neir')  //进行判断如果得到为空说明还未开始，则JSS对jss数组传值
			ne=eval("("+ne+")");
			if(ne==null){ 
				jss=[]
			}
			else{
				jss=ne;
//				alert(JSON.stringify(jss)) 
			}
			document.getElementById('jies').disabled=false
			var name_tex=document.getElementById('name').value;
			var phone=document.getElementById('number').value;
			var yb=document.getElementById('yangben').value;
			phone=parseInt(phone);
			ybid=parseInt(ybid); 
//			alert(posi)
			var jso={surveyId:sur,
					userName:username,
					realName:name_tex,
					phoneNum:phone,
					residentCode:yb,
					sampleId:ybid,
					startTime:time,
					endTime:newtime,
					phoneLocation:posi,
					answ:answ}
//			alert('m='+m);
//			alert(jso.answ)
			jss[m]=jso;
			var gg=JSON.stringify(jss)     //将数组保存为字符串
			plus.storage.setItem('neir',gg)
			var nei=plus.storage.getItem('neir')
			alert(nei)
			m++;
			var a=m+''    //每次上传成功m+然后转换为字符串保存
			plus.storage.setItem('m',a);
			n++;		//每次上传成功n+1 从而得到当前页面上传次数，以进行是否重复的判断
		}
		
