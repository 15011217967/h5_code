

!(function(){
	var slidingDragStatus = true;
	$('[data-click=agreeAgreement]').on('click',function(){
		$(this).find('i').toggle();
		$('.verification_code,.signup_but').addClass('dis');
		$('[data-drag=testing]').css('color','#c3c4c7').attr('data-icon','¥').siblings('[data-drag=bg-color]').html('');
		$('[data-drag=testing]').css({'margin-left': '0px'}).siblings('[data-drag=bg-color]').width(0);
		slidingDragStatus = true;
	});

	/* 拖拽验证  */
	$('[data-drag=testing]').bind('touchstart',function(e){
		if(slidingDragStatus){
			e.preventDefault();
			var $this = $(this),
				boxContainer = $this.parent().width()-$this.width()-2,
				initalLeft  = $this.offset().left,
				initalMarginLeft = parseInt($this.css('margin-left'));
			$('body').bind('touchmove',function(e){
				var dragDistance = e.touches[0].clientX-initalLeft-25+initalMarginLeft;
				if(dragDistance>boxContainer){
					$this.css({'margin-left': boxContainer+'px'}).siblings('[data-drag=bg-color]').width(boxContainer+15);
				}else if(dragDistance<=0){
					$this.css({'margin-left': '0px'}).siblings('[data-drag=bg-color]').width(0);
				}else{
					$this.css({'margin-left': dragDistance+'px'}).siblings('[data-drag=bg-color]').width(dragDistance+15);
				}

			});
		}
	});

	$('[data-drag=testing]').on('touchend',function(e){
		var boxContainer = $(this).parent().width()-$(this).width()-2;
		if($(this).offset().left-$(this).parent().offset().left < boxContainer || !isMobile($("#mobile").val())){
			$('[data-drag=testing]').css('margin-left','0').siblings('[data-drag=bg-color]').width(0);
			if ($("#mobile").val() == ''){
				util.tip("请输入手机号");
			}else if(!isMobile($("#mobile").val())){
				util.tip("请输入正确的手机号");
			}
			$("#get_code").unbind();
			$('#get_code').removeClass("red");
		}else{
			$('[data-drag=testing]').css('color','#ff5c5c').attr('data-icon','A').siblings('[data-drag=bg-color]').html('通过验证');
			slidingDragStatus = false;
			passConfirm();
		};
		$('body').unbind('touchmove');
	});

	$("#mobile").keyup(function(){
		$('.verification_code,.signup_but').addClass('dis');
		$('[data-drag=testing]').css('color','#c3c4c7').attr('data-icon','¥').siblings('[data-drag=bg-color]').html('');
		$('[data-drag=testing]').css({'margin-left': '0px'}).siblings('[data-drag=bg-color]').width(0);
		slidingDragStatus = true;
		$("#sliderNc").val('');
		//$("#get_code").unbind();
		//$('#get_code').removeClass("red");
		
	});
	function isMobile(val){
		return /^1[3578][0-9]{9}$/.test(val); 
	}
	window.passConfirm = function(){
		if ($("#mobile").val() == ''){
			util.tip("请输入手机号");
		}else if(!isMobile($("#mobile").val())){
			util.tip("请输入正确的手机号");
		}
	}

})()
