jQuery(document).ready(function($) {

		$("#search-form").submit(function(event) {

			// Disble the search button
			enableSearchButton(false);

			// Prevent the form from submitting via the browser.
			event.preventDefault();

			searchViaAjax();

		});
		
		
		//chat4.html textbox enter
		$('input').on('keypress', function(e) {
		    var code = e.keyCode || e.which;
		    if(code==13){
		    	//alert('keypress triggered');
		    	var search = {};
				var chatMsg = $("#submit_message").val();
				search["userinput"] = chatMsg;
				
				//Do AJAX call 
				
		    	insertChat("me", chatMsg , 0);
				insertChat("agent", chatMsg , 0);
				
				$("#submit_message").val('');
		    }
		});
		
		$('#live-chat header').on('click', function() {

			$('.chat').slideToggle(300, 'swing');
			$('.chat-message-counter').fadeToggle(300, 'swing');

		});

		$('.chat-close').on('click', function(e) {

			e.preventDefault();
			$('#live-chat').fadeOut(300);

		});

		
		
		$("#btn-chat").click(function(event){
			var search = {}
			var chatMsg = $("#chat-box-area").val();
			search["userinput"] = chatMsg;
			
			insertChat("me", chatMsg , 0);
			insertChat("agent", chatMsg , 0);
			
			 /*$.ajax({
					type : "POST",
					contentType : "application/json",
					url : "api/login",
					data : JSON.stringify(search),
					dataType : 'json',
					timeout : 100000,
					success : function(data) {
						console.log("SUCCESS: ", data);
						insertChat("Agent", data.msg , 0);
					},
					error : function(e) {
						console.log("ERROR: ", e);
						//display(e);
					},
					done : function(e) {
						console.log("DONE");
						//enableSearchButton(true);
					}
				});*/
		});
		
		
		$("#login-bt").click(function(event){
			var search = {}
			search["username"] = $("#username").val();
			search["password"] = $("#password").val();
			
			 //alert("Login Submitted");
			 //window.location.replace("login.html");
			 //window.location.href = 'login.html';
			 $.ajax({
					type : "POST",
					contentType : "application/json",
					url : "api/login",
					data : JSON.stringify(search),
					dataType : 'json',
					timeout : 100000,
					success : function(data) {
						console.log("SUCCESS: ", data);
						//display(data);
					},
					error : function(e) {
						console.log("ERROR: ", e);
						//display(e);
					},
					done : function(e) {
						console.log("DONE");
						//enableSearchButton(true);
					}
				});
		});
		
		$("#addClass").click(function () {
			  $('#sidebar_secondary').addClass('popup-box-on');
			    });
			  
			    $("#removeClass").click(function () {
			  $('#sidebar_secondary').removeClass('popup-box-on');
			    });

	});//ready

	function searchViaAjax() {

		var search = {}
		search["username"] = $("#username").val();
		search["email"] = $("#email").val();

		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "${home}search/api/getSearchResult",
			data : JSON.stringify(search),
			dataType : 'json',
			timeout : 100000,
			success : function(data) {
				console.log("SUCCESS: ", data);
				display(data);
			},
			error : function(e) {
				console.log("ERROR: ", e);
				display(e);
			},
			done : function(e) {
				console.log("DONE");
				enableSearchButton(true);
			}
		});

	}

	function enableSearchButton(flag) {
		$("#btn-search").prop("disabled", flag);
	}

	function display(data) {
		var json = "<h4>Ajax Response</h4><pre>"
				+ JSON.stringify(data, null, 4) + "</pre>";
		$('#feedback').html(json);
	}
	
	
	
	var me = {};
	me.avatar = "img/ME.png";

	var you = {};
	you.avatar = "img/BOT.png";

	function formatAMPM(date) {
	    var hours = date.getHours();
	    var minutes = date.getMinutes();
	    var ampm = hours >= 12 ? 'PM' : 'AM';
	    hours = hours % 12;
	    hours = hours ? hours : 12; // the hour '0' should be '12'
	    minutes = minutes < 10 ? '0'+minutes : minutes;
	    var strTime = hours + ':' + minutes + ' ' + ampm;
	    return strTime;
	}            

	//-- No use time. It is a javaScript effect.
	function insertChat(who, text, time ){
	    var meControl 
	    var date = formatAMPM(new Date());
	    if (who == "me"){
	    	 meControl = '<li class="left clearfix"><span class="chat-img pull-left">'+
	            '<img src="img/ME.png" alt="User Avatar" class="img-circle" />'+
			       '</span>'+
			            '<div class="chat-body clearfix">'+
			                '<div class="header">'+
			                    //' <small class="pull-right text-muted">'+
			                    ' <small class="pull-right text-muted">'+
			                       // '<span class="glyphicon glyphicon-time"></span>'+date+'</small>'+
			                      '<span class="glyphicon glyphicon-time"></span>'+date+'</small>'+
			                '</div>'+
			                '<p style="width: 100%; overflow: hidden; text-overflow: ellipsis;">'+
			                	text
			                '</p>'+
			            '</div>'+
			        '</li>';
	    }else{
	        meControl = '<li class="right clearfix"><span class="chat-img pull-right">'+
            '<img src="img/BOT.png" alt="User Avatar" class="img-circle" />'+
		       '</span>'+
		            '<div class="chat-body clearfix">'+
		                '<div class="header">'+
		                    //'<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>'+date+'</small>'+
		                    '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>'+date+'</small>'+
		                    
		                '</div>'+
		                '<p style="width: 100%; overflow: hidden; text-overflow: ellipsis;">'+
		                	text
		                '</p>'+
		            '</div>'+
		        '</li>';
	    }
	    
	    
	    setTimeout(
	        function(){                        
	            $("ul").append(meControl);
	            $("#chat-div").scrollTop($("#chat-div")[0].scrollHeight);
	        }, time);
	    
	}

	function resetChat(){
	    $("ul").empty();
	}