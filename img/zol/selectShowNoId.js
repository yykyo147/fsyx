/*
 * selectShowNoId.js
 *
 * LICENSE:
 * @author yhx
 * @version 1.0
 * @copyright  zol shop
 * @todo
 * 2012-10-16 add by yhx
 */

//select ���
$.SelectShow = function(option) {
    var defaults = {
        'searchClass': 'layerbox-tuan_selectbox', // ������Χ����
        'clickHtml': 'input', // �����ǩ��
        'showHtml': 'ul', // ��ʾ��ǩ��
        'listHtml': 'li', // ������ǩ��
        'hoverClass': 'hover', // hoverЧ������
        'hiddenName': 'Hidden', // �������׺
        'hiddenTab': 'data-id'    // ���������ݱ��
    };
    var options = $.extend(defaults, option);
    $('.' + options.searchClass).each(function() {
        var searchClass = this;
        var clickHtml = $(searchClass).find(options.clickHtml);
        
        // �ر��Զ���ʾ
        $(clickHtml).attr('autocomplete', 'off');
        
        // ��ʼ��������
        var hiddenName = $(clickHtml).attr("name") + options.hiddenName;
        var hiddenInfo = $(clickHtml).attr(options.hiddenTab);
        if (hiddenInfo) {
            $(clickHtml).after("<input type='hidden' id='" + hiddenName + "' name='" + hiddenName + "' value='" + hiddenInfo + "'>");
        }
        $(clickHtml).on({
            'click': function(event) {
                event.stopPropagation();
                // ����������ʾ��ǩ
                var showHtml = $(this).parent().find(options.showHtml);
                // ����������߶�
                var listHeight = $(showHtml).find(options.listHtml).height();
                var listNum = $(showHtml).find(options.listHtml).size();
                var showHeight = listNum * listHeight;
                if(showHeight >= 200){
                    showHeight = 200;
                }
                $(showHtml).height(showHeight);
                // ��������������
                $('.' + options.searchClass).children(options.showHtml).fadeOut("fast");
                // ��ʾ������
                $(showHtml).show();
                // ����������
                var clickHiddenName = $(clickHtml).attr("name") + options.hiddenName;
                $(showHtml).find(options.listHtml).each(function() {
                    $(this).hover(
                            function() {
                                $(this).addClass(options.hoverClass);
                            },
                            function() {
                                $(this).removeClass(options.hoverClass);
                            }
                    );
                    $(this).click(function() {
                        // ɾ��������
                        $('#' + hiddenName).remove();
                        $(clickHtml).val($(this).text());
                        var hiddenHtml = "<input type='hidden' id='" + clickHiddenName + "' name='" + clickHiddenName + "' value='" + $(this).attr('value') + "'>";
                        $(searchClass).append(hiddenHtml);
                        $(showHtml).fadeOut("fast");
                    });

                });
            }
        });
    });
    $(document).on('click', function() {
        $('.' + options.searchClass).find(options.showHtml).fadeOut("fast");
    });
}
