$.ajaxSetup({
    timeout: 20000 //15 segundos
});
$(document).ready(function() {
	
    $.mobile.defaultPageTransition = 'slide'; // JavaScript Document
    $.mobile.defaultDialogTransition = 'pop';

	 //$('#confirmExitW').popup({ transition: "pop" });
	 $( "#confirmExitW" ).enhanceWithin().popup();
	syncBtn=($(window).height());
	syncDvSync =  ($('#dvSyncStart').height());
	//alert("windows " + syncBtn)
	//alert("syncDvSync " + syncDvSync)
	$( '#dvSyncStart,#dvUploadStart'  ).css({
	"marginTop": (syncBtn/2) - (150),
	});
	
	panel=($(window).height()-200);
	
	wPop=($(window).width()-60);
	$( '#map-canvas-store'  ).width(wPop).css({
	width: wPop,
	});
	
	
	hMap=($(window).height()-80);
	$( '#map-canvas'  ).height(hMap).css({
		height: hMap,
	});
	
	
	$( '.pnlOptions .ui-body-h'  ).height( panel ).css({
	height: panel,
	});
	
	$('#chkElement').bind("change", function() {
				
				option = $('#chkElement option:selected');
				optSelected=$(option).val();
				if(optSelected=="no"){
					//alert("si");
				  //$("#txtAddessName").removeAttr('disabled');
				  $("#txtObservacion").show();
				  
				  $("#imgEjecContainer").css({"display": "none"});
			  $("#smallImageEjec").attr('src',"")
				  
				  
				  $("#btnPictureEjec").addClass("ui-state-disabled");
				   $("#txtObservacion").focus();
				}
				else{
					//alert("no");
				  //$("#txtObservacion").attr('disabled','disabled');
				  $("#btnPictureEjec").removeClass("ui-state-disabled");
				  $("#txtObservacion").hide();
				  $('#frmSaveEjecStore').valid()
				}
				

				
				
	});
	
	
	$('#chkVisit').bind("change", function() {
				
				option = $('#chkVisit option:selected');
				optSelected=$(option).val();
				if(optSelected=="no"){
					//alert("si");
				  //$("#txtAddessName").removeAttr('disabled');
				  $("#txtObservacionVisita").show();
				  
				 
				   $("#txtObservacionVisita").focus();
				   $("#btnStarVisit").css({"display": "none"});
				    $("#btnSaveVisitStatus").show();
				   
				}
				else{
					//alert("no");
				  //$("#txtObservacion").attr('disabled','disabled');
				 // $("#btnPictureEjec").removeClass("ui-state-disabled");
 				   $("#btnStarVisit").show();
				   $("#btnSaveVisitStatus").css({"display": "none"});
				  $("#txtObservacionVisita").hide();
				  $('#frmVisitStatus').valid()
				}
				

				
				
	});
	/*FORM LOGIN*/
	$('#frmValidateUser').submit(function(event){
	 	event.preventDefault();	
		
		
		
		if ($('#frmValidateUser').valid()){	 
				
			
			try { 
					var postData = $('#frmValidateUser').serialize();
					
					var jqxhr = $.ajax({
						type: "POST",
						url: host+"process/queryCustomer.php",
						data: postData,						  
						dataType: "json",
					
					beforeSend: function( xhr ) {
					//console.log("beforeSend addr");
						$.mobile.loading( "show", {
							text: "Validando Usuario",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
					}
					})
			//data
			
			//console.log(data)
				.done(function(data) {
					
					
					if (data.result){
						
						console.log("responseJson: " + data);
						cli_id=data.cli_id;
						cli_nombre=data.cli_nombre;
						successLocalUsr();
					}
					else{
						console.log( "Error de Autenticacion" );	
						$.mobile.loading( "hide" );
						$('#validateError').popup({ transition: "pop" });
						$('#validateError').popup("open");
						$('#validateError').popup({ dismissible: true }) 
						
						
					}				
					
					//$.mobile.changePage( "#pgRequestDetail" );	
						
					
					
				})
				.fail(function(jqXHR, textStatus) {
					if(textStatus== 'timeout'){
						popError("Conexión Lenta","La conexión está tomando más tiempo de lo habitual para iniciar sesión. \n\nPor favor inténtelo nuevamente.");
					}
					else{
						popError("Error iniciando sesión","Ocurrió un error al iniciar sesión, Asegúrese de tener una conexión a internet e inténtelo nuevamente.");
					}
					
					//alert("Ocurrió un Error al obtener la dirección");
					
				})
				.always(function() {
					$.mobile.loading( "hide" );
				  
			
				});
			}
			catch(err) {
				popError("Error al validar","Ocurrió un error al validar usuario: " + err);
				console.log("Error: " + err + ".");
			}

			
		}

 });
	/*FIN FORM LOGIN*/
	$("#linkDataUpload").click(function() {
	//points = 0;
	//$('#slPoint').val(points);	
	//$('#slPoint').selectmenu('refresh');
		uploadData();	
	}); 
	$("#tabUndone").click(function() {
	//points = 0;
	//$('#slPoint').val(points);	
	//$('#slPoint').selectmenu('refresh');
		//uploadData();	
		currentTab = this.id
	}); 
	$("#tabDone").click(function() {
	//points = 0;
	//$('#slPoint').val(points);	
	//$('#slPoint').selectmenu('refresh');
		//uploadData();	
		currentTab = this.id
	}); 
	
	
	$("#refreshPosition").click(function() {
	//points = 0;
	//$('#slPoint').val(points);	
	//$('#slPoint').selectmenu('refresh');
		$("#pgMap").trigger('pageshow');	
	}); 
$('#btnReloadStores').click(function(){
	$("#pgWelcome").trigger('pageshow');
});

$('#btnReloadDate').click(function(){
	$("#pgSyncStart").trigger('pageshow');
});

$('#btnStartSyncGet').click(function(){});



	
	/*FORM COMENTARIO*/
	 $('#frmContact').submit(function(event){
	 	event.preventDefault();	
		
		
		
		if ($('#frmContact').valid()){	 
				/*$.mobile.loading( "show", {
					text: "Enviando comentario",
					textVisible: true,
					theme: "a",
					textonly: false,
					html: ""
			});*/
			
			try { 
				var postData = $('#frmContact').serialize();
				postData = postData + "&cliID="+cli_id;
				var jqxhr = $.ajax({
				type: "POST",
				url: host+"process/newComment.php",
				data: postData,						  
				dataType: "json",
				
				beforeSend: function( xhr ) {
				//console.log("beforeSend addr");
					$.mobile.loading( "show", {
						text: "Enviando reporte",
						textVisible: true,
						theme: "a",
						textonly: false,
						html: ""
					}); 
				}
				})
			.done(function(data) {


					//console.log(data.result);
				if (data.result){
					$('#txtSubject').val("");
					$('#txtMessage').val("");
					$.mobile.loading( "hide" );
					window.plugins.toast.showLongBottom('Reporte enviado correctamente ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
					navigator.app.backHistory();
				}
				else{
					popError("Error enviando reporte","Ocurrió un error al enviar tu reporte, Asegúrese de tener una conexión a internet. ");
				}
		
	
	
			})
			.fail(function(jqXHR, textStatus) {
				if(textStatus== 'timeout'){
					popError("Conexión Lenta","La conexión está tomando más tiempo de lo habitual para guardar los productos. Por favor inténtelo nuevamente.");
				}
				else{
					popError("Error enviando reporte","Ocurrió un error al enviar tu reporte, Asegúrese de tener una conexión a internet. ");
				}
				
				
				
			})
			.always(function() {
				$.mobile.loading( "hide" );
			  
			
			});
				
			}
			catch(err) {
				popError("Error enviando reporte","Ocurrió un error al enviar tu reporte, Asegúrese de tener una conexión a internet. ");
				console.log("Error: " + err + ".");
			}

			
		}
	//	);
		//	event.preventDefault();
		//	return false;		
		/*
		if ($('#frmCreateUser').valid()){	
			$('#confirmReg').popup("open");
			$('#confirmReg').popup({ dismissible: false }) 
		}*/
 });
	
	
	$(".exitConfirm").click(function() {
			 console.log("exit");
		 	 exit();
		 }); 
		 
 
	$("#btnPicture").click(function() {
			captureStorePhoto()
		 }); 	
		$("#btnPictureEjec").click(function() {
			captureEjecPhoto()
		 });  
		 $("#btnUploadEjec").click(function() {
			 /*UBICAR*/
			 
			watchId = navigator.geolocation.watchPosition(success, fail, {maximumAge: 6000, enableHighAccuracy:true, timeout: 6000});
			
			 if ( navigator.geolocation ) {
				 $.mobile.loading( "show", {
								text: "Obteniendo Ubicación",
								textVisible: true,
								theme: "a",
								textonly: false,
								html: ""
							});
				function success(pos) {
					
					coord=pos.coords.latitude + " " + pos.coords.longitude;
					
					//$("#btnUploadEjec").removeClass("ui-state-disabled");					
					navigator.geolocation.clearWatch(watchId);
					$.mobile.loading( "hide" );
					if ($('#chkElement').val()=="si"){
						uploadPictureEjec()
					}
					else{
						
						if ($('#frmSaveEjecStore').valid()){
							db.transaction(function(tx) {
								
							var splitElmID = listElements.itemID
							var campElem = splitElmID.split("-");	
							var cID = campElem[0];
							var eID = campElem[1];
							
							
							now = getTimeStamp(false);
							var exifData = "Modelo: " + deviceModel + " - Android Version: " + deviceVersion
								
								$.mobile.loading( "show", {
									text: "Actualizando Datos de ejecución",
									textVisible: true,
									theme: "a",
									textonly: false,
									html: ""
								}); 
								//alert($("#txtObservacion").val());
								//alert("INSERT INTO ejecucion_foto (ejecuf_fecha,ejecuf_coordenada,usuario_user_cedula,ejecuf_extradata,ejecuf_comentario,ejecuf_estado,establecimiento_esta_id,visi_id,ejecuf_ejecutado,campana_id,elemento_id,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ",[now, coord, cli_id, exifData, $("#txtObservacion").val(),"ENVIADO",listStores.itemID,lastVisitID,"no",cID ,eID,0]);
								tx.executeSql("INSERT INTO ejecucion_foto (ejecuf_fecha,ejecuf_coordenada,usuario_user_cedula,ejecuf_extradata,ejecuf_comentario,ejecuf_estado,establecimiento_esta_id,visi_id,ejecuf_ejecutado,campana_id,elemento_id,sync_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ",[now, coord, cli_id, exifData, $("#txtObservacion").val(),"ENVIADO",listStores.itemID,lastVisitID,"no",cID ,eID,0] , function(db, res) {
									
									/*{pictureName:pictureName,cli_id:cli_id,deviceVersion:deviceVersion,deviceModel:deviceModel,coord:coord,visi_id:lastVisitID,chk:$('#chkElement').val(),esta_id:listStores.itemID,elemID:listElements.itemID},	*/
									window.plugins.toast.showLongBottom('Ejecución Guardada correctamente ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
									navigator.app.backHistory();
									$.mobile.loading( "hide" );
								});
							});
							
	
					}
				}
					
					
				}
				function fail(error) {
					navigator.geolocation.clearWatch(watchId);
					popError("Error obteniendo ubicación","Ocurrió un error al obtener su ubicación, \n\nPor favor asegúrese de encender su GPS e inténtelo nuevamente. ");
					$.mobile.loading( "hide" );
					
				}
				
			} else {
				popError("Error obteniendo ubicación","Ocurrió un error al obtener su ubicación, \n\nPor favor asegúrese de encender su GPS e inténtelo nuevamente. ");
				$.mobile.loading( "hide" );
				
			}			 
			 
			 /*FIN UBICAR*/
			 
			 
			
		 }); 
		 
		 
	 
$("#btnExit").click(function() {
	$('#confirmExitW').popup({ transition: "pop" });
	$('#confirmExitW').popup("open");
	$('#confirmExitW').popup({ dismissible: true }) 
});
	 
$('#btnLogoff').click(function(){
	$( "#confirmLogOff" ).popup({ transition: "none" });
	$('#confirmLogOff').popup("open");
	$('#confirmLogOff').popup({ dismissible: true }) 

});

$("#logOffConfirm").click(function(){
	logOff();
});

});

$( document ).on( "pagecreate", "#pgWelcome", function() {
	window.plugins.toast.showLongBottom('Bienvenido ' + cli_nombre, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
	 
	 setTimeout(function(){ 

			console.log("Cheking Updates");
			
			try { 
				postData = "currentVersionApp=" + currentVersionApp;
				console.log(postData);
				$.post(host+"process/update.php",postData,checkUpdate);
			}
			catch(err) {
				console.log("Error: " + err + ".");
			}
			

		}, 3000);  

});
