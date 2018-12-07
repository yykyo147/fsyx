(function ($){
	
	// ����
	window.layerTuan = (function (){

		// ʵ������
		var instance;
		var layerTem = '<span class="layerbox-tuan_closebtn">��</span>\
						<div class="layerbox-tuan_item layerbox-tuan_itemmap">\
							<div class="layerbox-tuan_header">\
								<span class="layerbox-tuan_header_line"></span>\
								<h3>ѡ���ŵ�</h3>\
							</div>\
							<div class="layerbox-tuan_filter clearfix">\
								<div class="layerbox-tuan_selectbox">\
									<input type="text" value="������" class="layerbox-tuan_selectbox_label" readonly="readonly" autocomplete="off" disabled="disabled">\
								</div>\
								<div class="layerbox-tuan_selectbox">\
									<input data-id="" type="text" value="������" readonly="readonly" autocomplete="off" class="layerbox-tuan_selectbox_label">\
									<ul class="layerbox-tuan_selectbox_pop" style="display: none"></ul>\
								</div>\
							</div>\
							<div class="layerbox-tuan_shopbox">\
								<ul class="layerbox-tuan_shoplist"></ul>\
								<div class="layerbox-tuan_page"></div>\
							</div>\
							<div class="layerbox-tuan_shopmap" id="layerboxTuanShopmap">\
							</div>\
						</div>';

		var layerBuy = '<div class="layerbox-tuan_item layerbox-tuan_itembuy">\
							<div class="layerbox-tuan_header">\
								<span class="layerbox-tuan_header_line"></span>\
								<h3>ԤԼ����</h3>\
							</div>\
							<div class="layerbox_bespoke_header"><h3></h3><span class="layerbox_bespoke_elseshopbtn">ѡ�������ŵ� &gt;</span></div>\
							<div class="layerbox_bespoke">\
					            <form name="to-store-form" id="to-store-form" onsubmit="return false;">\
					                <div class="clearfix">\
					                    <div class="order-left">\
					                        <dl class="list-item linkman">\
					                            <dt><i>*</i>���ĳƺ�:</dt>\
					                            <dd>\
					                                <input class="text" type="text" name="linkName" value="" maxlength="10">\
					                                <label class="radio" for=""><input name="dsex" value="1" type="radio">Ůʿ</label>\
					                                <label class="radio" for=""><input name="dsex" value="2" type="radio" checked="">��ʿ</label>\
					                                <div class="wrond-tip" id="linkman-wrond-tip">����д���ĳƺ�</div>\
					                            </dd>\
					                        </dl>\
					                        <dl class="list-item phone">\
					                            <dt><i>*</i>�ֻ���:</dt>\
					                            <dd>\
					                                <input class="text" type="text" name="mobile" value="" maxlength="11">\
					                                <span class="send-code" id="store-send-code">������֤��</span>\
					                                <div class="wrond-tip" id="mobile-wrond-tip">����д�����ֻ���</div>\
					                            </dd>\
					                        </dl>\
					                        <dl class="list-item">\
					                            <dt><i>*</i>��֤��:</dt>\
					                            <dd>\
					                                <input class="text" type="text" name="verifyCode" value="" maxlength="6">\
					                                <div class="wrond-tip" id="code-wrond-tip">��֤�����</div>\
					                            </dd>\
					                        </dl>\
					                        <dl class="list-item">\
					                            <dt>����:</dt>\
					                            <dd>\
					                                <textarea placeholder="�������Ը��̼�" name="storeOrderNotice" maxlength="20" fn="limit" limit="20" tipsid="to-store-notice-tips"></textarea>\
					                                <span class="num"><em id="to-store-notice-tips">0</em>/20</span>\
					                            </dd>\
					                        </dl>\
					                    </div>\
					                    <div class="order-right wStore-business-contain">\
					                        <dl class="clearfix address">\
					                            <dt>���ڵ���:</dt>\
					                            <dd><span class="address-area"></span></dd>\
					                        </dl>\
					                        <dl class="clearfix address">\
					                            <dt>�̼ҵ�ַ:</dt>\
					                            <dd>\
					                                <span class="address-text"></span>\
					                            </dd>\
					                        </dl>\
					                        <dl>\
					                            <dt>ԤԼ��ʽ:</dt>\
					                            <dd>\
					                                <label><input class="radio" type="radio" checked="">��ѻ�ȡԤԼ��<span class="gray-color" style="font-size: 12px;">(ƾ�빺��񵽵��Ż�)</span></label>\
					                            </dd>\
					                        </dl>\
					                    </div>\
					                </div>\
					                <div class="layerbox_bespoke-button">\
					                    <button type="submit" id="submit-store-buy-order">�ύԤԼ</button>\
					                    <button class="cancle submit-store-buy-order-cancle">ȡ��</button>\
					                </div>\
					            </form>\
					        </div>\
						</div>';

		// �������㣨ʵ����
		function SingLeton(args){
                    this.options = {};

                    this.layer = $('<div class="layerbox-tuan">').appendTo(document.body);
                    this.layer.html(layerTem);
                    this.layer.append(layerBuy);
                    this.options = $.extend(this.options, args);
                    this.init();

                }; 

		SingLeton.prototype = {
                    show: function (arg){				
                        this.layer.show();				
                    },
			// ��ȡ��������
			_getCity:function(){
				var _this = this;
				$.ajax({
					type : "GET",
					url : _this.options.addressUrl,
					dataType:'json',
					data:{
                                            provinceId: _this.options.provinceId		
					}, 
					error : function(){},
					success : function(data){
                                            if (data.status){
                                                var dataCity = data.info,
                                                        str = '';
                                                var key = 0;
                                                for (var i in dataCity){
                                                    if(!key) {
                                                        var key = i;
                                                    }
                                                    str += '<li data-city="'+ dataCity[i].cityId +'" data-province="'+ dataCity[i].provinceId +'">'+ dataCity[i].name +'</li>';
                                                }

                                                $('.layerbox-tuan_selectbox_pop').html(str);	// ��
                                                _this.options.cityId = $('.layerbox-tuan_selectbox_pop li').eq(0).attr('data-city');
                                                $('.layerbox-tuan_selectbox_label').eq(0).val(dataCity[key].provinceName);
                                                $('.layerbox-tuan_selectbox_label').eq(1).val(dataCity[key].name);
                                                if(_this.options.provinceId != 1) {
                                                    console.log(_this.options.provinceId);
                                                    $('.layerbox-tuan_selectbox_label').eq(1).attr("readonly","readonly");
                                                    $('.layerbox-tuan_selectbox_label').eq(1).attr("disabled","disabled");
                                                }
                                                $.SelectShow();
                                                _this._getWareData();
                                            }
					}
				});		

			},
			// ��ȡ�ŵ��Ʒ����
			_getWareData:function(pageNum){
				var _this = this;
				var pageCur = pageNum || 1;
                               
				$.ajax({
					type : "GET",
					url : _this.options.gainUrl,
					dataType:'json',
					data:{
						merchantId: _this.options.storeId,		// �ŵ�ID
						goodsId: _this.options.goodsId,		// ��ƷID 
						provinceId: _this.options.provinceId,		// ʡID
						cityId: _this.options.cityId,		// ��ID 
						page: pageCur			// ��ǰҳ��
					}, 
					error : function(){},
					success : function(data){
                                                
						// ���÷�ҳ
						_this._setPage(data.page);
						// ���ò�Ʒ
						_this._setWare(data.data);
						// ���õ�ͼ
						_this._setMap(data.data);
						
					}
				});
			},
			// ���÷�ҳ
			_setPage:function (pageData){

				var pageCur = pageData.cur || 1,
					pageSum = pageData.sum;
				var str=''; 
				if (1 == pageSum){
					str += '<span class="no-prev">��һҳ</span><span class="current">1</span><span class="no-next">��һҳ</span>';
				}else {
					if (pageCur > 1){
						var prevPage = (pageCur - 1);                 
							str += '<a href="javascript:void(0)" class="prev" dataPageCur = '+ prevPage +'>��һҳ</a>';
					}
					else{
						str += '<span class="no-prev">��һҳ</span>';
					}

					if (pageSum <= 3){
						for (var i = 1; i<= pageSum; i++){
							if (pageCur == i){
								str += '<span class="current">'+i+'</span>';
							}else{                                
								str += '<a href="javascript:void(0)" dataPageCur = '+ i +'>'+i+'</a>';
							}                            
						}
					}else{
						if (pageCur <= 3){
							for (var i = 1; i<= 3; i++){
								if (pageCur == i){
									str += '<span class="current">'+i+'</span>';
								}else{                                    
									str += '<a href="javascript:void(0)" dataPageCur = '+ i +'>'+i+'</a>';
								}                            
							}                            
							str += '...';                            
						}else{
							str += '...';
							var start = pageCur - 1;
							var end   = pageCur + 1;
							if (end >= pageSum){
								end = pageSum;
							}
							for (var i = start; i <= end; i++){
								if (pageCur == i){
									str += '<span class="current">'+i+'</span>';
								}else{                                    
									str += '<a href="javascript:void(0)" dataPageCur = '+ i +'>'+i+'</a>';
								}                              
							}
							if(pageCur != pageSum){
								str += '...';
							}
						}
					}

					if (pageCur == pageSum){
						str += '<span class="no-prev">��һҳ</span>';
					}else{
						var nextPage = (pageCur + 1);
						str += '<a href="javascript:void(0)" class="next" dataPageCur = '+ nextPage +'>��һҳ</a>';
					}                    
				};
				$('.layerbox-tuan_page').html(str);		// ��ҳ
			},
			// ���ò�Ʒ
			_setWare: function (goodsData){

				var str = '';
				for (var i = 0; i < goodsData.length; i++){
					str += '<li>\
								<span class="layerbox-tuan_shoplist_num">'+ (i+1) +'</span>\
								<h4>'+ goodsData[i].title +'</h4>\
								<p>'+ goodsData[i].address +'</p>\
								<div data-merid="'+ goodsData[i].sid +'" data-merids="'+ goodsData[i].id +'" class="layerbox-tuan_shoplist_gobtn">����ȥ</div>\
							</li>'
				};

				$('.layerbox-tuan_shoplist').html(str);		// ��Ʒ

			},
			// ���¼�			
			_bindEvent:function (){
				var _this = this;

				// ��ҳ
				$('.layerbox-tuan_page').on('click','a',function (){
					var dataPageNum = $(this).attr('dataPageCur');
					_this._getWareData(dataPageNum);
				});

				// ����ԤԼ
				$('.layerbox-tuan_shoplist').on('click','.layerbox-tuan_shoplist_gobtn',function (){
					var merid  = $(this).data('merid');
                                        var merids = $(this).data('merids');
					_this.createBespoke(merid,merids,_this.options.goodsId,_this.options.skuId);
				});

				// �ر�
				$('.layerbox-tuan_closebtn').on('click',function (){
					$('.layerbox-tuan').remove();
				});
                                // �ر�
				$('.submit-store-buy-order-cancle').on('click',function (){
					$('.layerbox-tuan_itembuy').css('top','540px');
				});

				// ȥѡ������
				$('.layerbox-tuan_selectbox_pop').on('click','li',function (){
					_this.options.cityId = $(this).attr('data-city');
					_this._getWareData();
				});


			},

			// �ٶȵ�ͼ
			_setMap: function (goodsData){
                                var x = goodsData[0]['x']
                                var y = goodsData[0]['y']
				var map = new BMap.Map(layerboxTuanShopmap) // �����ٶȵ�ͼʵ��
				map.enableScrollWheelZoom(true);
				map.centerAndZoom(new BMap.Point(x, y), 11);  // ��ʼ����ͼ,�������ĵ�����͵�ͼ����

				// �Զ��庯�� ��ӵ�ͼ��ʶ
				function addMarker(point,icon){
					var marker = new BMap.Marker(point,icon);
					map.addOverlay(marker);		// ����ע��ӵ���ͼ��
				}

				for (var i = 0; i < goodsData.length; i++){
					
					var pt = new BMap.Point(goodsData[i]['x'], goodsData[i]['y']);
					var myIcon = new BMap.Icon('http://icon.zol-img.com.cn/newshop/shop/index/icon'+ (i + 1) +'.png', new BMap.Size(21,31));
					addMarker(pt, {icon: myIcon});           
				}


			},

			createBespoke:function(merchantId,merchantIds,goodsId,skuId){
				var _this = this;
				if(!merchantId && !goodsId) return;
				$.ajax({
					type: "get",
					url: "/index.php?c=IndexNew&a=AjaxGetMerchantInfo",// /index.php?goosd_id=XXX&mer_id=XXX
					data: {'merchantId':merchantId,'merchantIds':merchantIds,'goodsId':goodsId},
					dataType: "json",
					success:function(data){
						$('.layerbox-tuan_itembuy .layerbox_bespoke_header h3').html(data[merchantId]['name']);
						$('.layerbox-tuan_itembuy .address-area').html(data[merchantId]['area']);
						$('.layerbox-tuan_itembuy .address-text').html(data[merchantId]['address']);
						$('.layerbox-tuan_itembuy').css('top','0');
						
						//ԤԼ�������
						toStoreBuyParams    = {
						    overNode:$(".layer-overlay-tuan"),
						    inputNode:$(".to-store-layer"),
						    submitNode:$("#to-store-form"),
						    nameNode:$("input[name=linkName]"),
						    mobileNode:$("input[name=mobile]"),
						    codeNode:$("input[name=verifyCode]"),
						    codeTimeNode:$("#store-send-code"),
						    noticeNode:$(":input[name=storeOrderNotice]"),
						    sendCodeUrl:"/index.php?c=IndexNew&a=AjaxSendVerifyCode",
						    submitOrderUrl:"/index.php?c=IndexNew&a=AjaxSaveReachStoreOrder",
						    linkWrondNode:$("#linkman-wrond-tip"),
						    mobileWrondNode:$("#mobile-wrond-tip"),
						    codeWrondNode:$("#code-wrond-tip"),
						    maxTime:60 //����ʱ����
						};
						var goodsToStoreBuy = new ToStoreBuy(merchantId,goodsId,skuId);

					},
					error:function(){
						// alert(data.msg);
					}
				});
			},

                    init: function (){
                        this._getCity();
                        this._bindEvent();
                    }
		};


		//ԤԼ�������
		var toStoreBuyParams    = {};
                // ԤԼ�����������
		function ToStoreBuy(merchantId,goodsId,skuId){
		    this.merchantId = merchantId,
		    this.goodsId    = goodsId;
                    this.skuId      = skuId;
		    this.init();
		};
		ToStoreBuy.prototype    = {
		    init:function(){
		        //������֤�����
		        this.bindSendCode();
		        //�ύ��
		        this.bindSubmit();
		        //�رհ�
		        this.bindBack();
		        //���ַ���ͳ��
		        this.bindLimitFont();
		    },
		    stopPropagation:function(e) {
		        if (e.stopPropagation){ 
		            e.stopPropagation();
		        }else{ 
		            e.cancelBubble = true;
		        }  
		    },
		    //�󶨷�����֤����� 
		    bindSendCode:function(){
		        var _self   = this;
		        $("#store-send-code").click(function(e){
		            var mobile  = toStoreBuyParams.mobileNode.val(),
		                flag    = _self.checkMobile(mobile);
		            if($(this).hasClass("dafault-code")){
		                return false;
		            }
		            if(flag){
		                _self.sendCode(mobile);
		            }
		            _self.stopPropagation(e);
		        });
		    },
		    //���ύ
		    bindSubmit:function(){
		        var _self       = this;
		        $("#submit-store-buy-order").click(function(e){
		            var linkName    = toStoreBuyParams.nameNode.val(),
		                linkFlag    = _self.checkName(linkName),
		                mobile      = toStoreBuyParams.mobileNode.val(),
		                mobileFlag  = _self.checkMobile(mobile),
		                code        = toStoreBuyParams.codeNode.val(),
		                codeFlag    = _self.checkCode(code),
		                sex         = $("input[name=dsex]:checked").val(),
		                buyerNotice = toStoreBuyParams.noticeNode.val();
		                
		            if(sex != '1' && sex != '2'){
		                alert("��ѡ���Ա�");
		                return false;
		            }
		            if(!linkFlag || !mobileFlag || !codeFlag){
		                return false;
		            }
		            
		            //�ύ����
		            submitData      = {
		                linkName:linkName,
		                mobile:mobile,
		                code:code,
		                sex:sex,
		                buyerNotice:buyerNotice,
		                merchantId:_self.merchantId,
		                goodsId:_self.goodsId,
                                skuId:_self.skuId,
		                suitId:_self.suitId
		            };
		            
		            $.getJSON(toStoreBuyParams.submitOrderUrl, submitData, function(backdata){
		                if(backdata.flag){
                                    alert(backdata.msg);
                                    $('.layerbox-tuan').remove();
		                }else{
		                    alert(backdata.msg);
		                }
		            });
		            
		            _self.stopPropagation(e);
		            
		            return false;
		        })
		    },
		    //�󶨹رղ���
		    bindBack:function(){
		        $(".layerbox_bespoke_elseshopbtn").click(function(){		            
					$('.layerbox-tuan_itembuy').css('top','540px');
		        });
		    },
		    //�ַ�����
		    bindLimitFont:function(){
		        var _self   = this;
		        //�������㣨��Ʒ���� ��װ�����ȣ�
		        $("[fn='limit']").keyup(function(){
		            var limit       = $(this).attr('limit');
		            var limitTips   = $(this).attr('tipsId');
		            var value       = $(this).val();
		            var valueLength = value.length;
		            if(valueLength > limit){
		                $("#"+limitTips).css("color","#ff0000");
		            }else{
		                $("#"+limitTips).css("color","");
		            }
		            //����
		            $("#"+limitTips).text(valueLength);
		        });
		    },
		    //���ֳ����ж�[������2���ַ���Ӣ����1���ַ�]
		    getCharLength:function(str){
		        var cnLength    = 0;
		        for(var i=0; i<str.length; i++){
		            var words   = str.substring(i,i+1);
		            if(escape(words).indexOf("%u") == -1){
		                cnLength    =  cnLength+1;
		            }else{
		                cnLength    =  cnLength+2;
		            }
		        }
		        
		        return Math.ceil(cnLength/2);
		    },
		    //����ֻ���
		    checkMobile:function(mobile){
		        if(typeof mobile == 'undefined'){
		            mobile  = toStoreBuyParams.mobileNode.val();
		        }
		        if(!mobile.length){
		            toStoreBuyParams.mobileWrondNode.html("�ֻ��Ų���Ϊ��").show();
		            return false;
		        }
		        if(!/^1[3|4|5|7|8]{1}[0-9]{9}$/.test(mobile)){
		            toStoreBuyParams.mobileWrondNode.html("�ֻ��Ÿ�ʽ����ȷ").show();
		            return false;
		        }
		        toStoreBuyParams.mobileWrondNode.hide();
		        return true;
		    },
		    //����У����
		    sendCode:function(mobile){
		        var _self   = this;
		        if(typeof mobile == 'undefined'){
		            mobile  = toStoreBuyParams.mobileNode.val();
		        }
		        
		        $.getJSON(toStoreBuyParams.sendCodeUrl, {mobile:mobile}, function(backdata){
		            //����ʱ��ʼ
		            if(backdata.flag){
		                _self.countDown();
		            }else{
		                alert(backdata.msg);
		                return false;
		            }
		        });
		    },
		    //����ʱ 
		    countDown:function(){
		        var codeTimeNode    = toStoreBuyParams.codeTimeNode, 
		            oldTips         = codeTimeNode.html(),
		            maxTime         = toStoreBuyParams.maxTime;
		        //���ɵ��
		        codeTimeNode.addClass("dafault-code");
		        var codeTimeCount   = setInterval(function(){
		            maxTime--;
		            codeTimeNode.html('<em id="store-count-down">'+maxTime+'</em>s�����»�ȡ');
		            if(!maxTime){
		                //���õ���ʱ
		                clearTimeout(codeTimeCount);
		                codeTimeNode.removeClass("dafault-code");
		                codeTimeNode.html(oldTips);
		            }
		        },1000);
		    },
		    //�������
		    checkName:function(linkName){
		        if(typeof linkName == 'undefined'){
		            linkName    = toStoreBuyParams.nameNode.val();
		        }
		        if(!linkName.length){
		            toStoreBuyParams.linkWrondNode.html("����д���ĳƺ�").show();
		            return false;
		        }
		        if(linkName.length > 10){
		            toStoreBuyParams.linkWrondNode.html("�ƺ����ܳ���10���ַ�").show();
		            return false;
		        }
		        toStoreBuyParams.linkWrondNode.hide();
		        return true;
		    },
		    //�����֤��
		    checkCode:function(code){
		        if(typeof code == 'undefined'){
		            code    = toStoreBuyParams.codeNode;
		        }
		        if(!code.length){
		            toStoreBuyParams.codeWrondNode.html("��֤�벻��Ϊ��").show();
		            return false;
		        }
		        if(!/^[0-9]{6}$/.test(code)){
		            toStoreBuyParams.codeWrondNode.html("��֤�����").show();
		            return false;
		        }
		        toStoreBuyParams.codeWrondNode.hide();
		        return true;
		    }
		};

            var _static = {
                name: 'ԤԼ����',

                // ��������
                create: function (args){
                    instance = new SingLeton(args);
                    return instance;
                }
            };

        return _static;


	})();
})(window.$ || window.jQuery);
