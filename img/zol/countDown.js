 
(function (){

    var timestamp=(Date.parse(new Date()))/1000;

    $.extend({
        countdownClock:function(endTime, nowTime,idName){
            var endTime = endTime;
            var nowTime = nowTime;
            var leave   = endTime - nowTime;  

            if (leave <= 0) {
                 var lastTime = 'ʣ�ࣺ<em><span class="red-color">0</span>��<span class="red-color">0</span>Сʱ<span class="red-color">0</span>��<span class="red-color">0</span>��</em>';
            }else {
                var day    = Math.floor(leave / 86400);
                var hour   = Math.floor(leave / 3600) - (day * 24);
                var minute = Math.floor(leave / 60) - (day * 1440) - (hour * 60);
                var second = leave - (day * 86400) - (hour * 3600) - (minute * 60);
                

                var lastTime = 'ʣ�ࣺ<em><span class="red-color">'+day+'</span>��<span class="red-color">'+hour+'</span>Сʱ<span class="red-color">'+minute+'</span>��<span class="red-color">'+second+'</span>��</em>';	                
            }
            $(idName).html(lastTime);
            endTime-- ;  
            if(leave >0){
            setTimeout("$.countdownClock('"+endTime+"', '"+nowTime+"', '" + idName + "')", 1000);
            }
        }

    });  
    // �Ź�����ʱ
    window.onload=function (){
        $(".tuan-slide .tuan-pro-top .time").each(function(i){
            var idName  = ".tuan-slide .tuan-pro-top .time:eq(" + i + ")";
            var nowTime = timestamp;  // ����ʱ�� 
            var endTime = $(this).attr("endtime");   // ����ʱ��
            $.countdownClock(endTime, nowTime, idName);
        });
    };
    // �رմ���
    $.extend({
        closeWindowBox : function(eventId){
            $("#"+eventId).hide();
            //����ǻ�ӭ���٣�����Ҫ��¼cookie
            if(eventId == 'zp-welcome-store'){
                openDove();
                var url     = baseDetailUrl + "c=Ajax_DetailLeft&a=SetCookie&callback=?&t="+Math.random();
                $.getJSON(url);
            }
        }
    });

    
})(); 
    
    