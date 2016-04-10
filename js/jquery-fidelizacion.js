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
	
	
	$("#BtnSyncFotos").click(function(){
		try { 				
				var jqxhr = $.ajax({
					method: "GET",
					dataType: "json",
					url: host + 'process/listarFotos_nueva.php?id_user='+id_usuario ,
					beforeSend: function( xhr ) {
						 $.mobile.loading( "show", {
							text: "subiendo fotos ",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
					  }
				})			
				  .done(function(data) {
					//alert(data[0].cantidad);
					if(data.length>0){
						$.each( data, function( key, value ) {
						  SubirFtos(value.fotografia_Actual);
						});
					}else{
						 $.mobile.loading( "show", {
							text: "No hay fotos para sincronizar ",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
					}
					//$("#CantFotos").html('cantidad de fotos sin sincronizar '+data[0].cantidad);
								
				  })
				  .fail(function(jqXHR, textStatus) {
						
						if(textStatus== 'timeout'){
						popError("Conexión Lenta","La conexión está tomando más tiempo de lo habitual para cargar la fecha actual del servidor. \n\nPor favor inténtelo nuevamente.");
						}
						else{
							popError("Error de conexión","Ocurrió un error al intentar obtener la fecha actual del servidor. \n\nPor favor inténtelo nuevamente.");
						}					
						
				  })
				  .always(function() {
					 
					//  $("#lvStores").show();
					  $.mobile.loading( "hide" );
					  
//					alert( "complete" );
				  });				
			}
			catch(err) {
				console.log("Error: " + err + ".");
			}
		
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
	
	/*  form de la encuesta */
	
	$('#FormEncuesta').submit(function(event){
		event.preventDefault();
		//alert('entro');
		if($('#FormEncuesta').valid()){
				//alert('try');
				/// variables
				var VInputoutnum = $("#Inputoutnum").val();
				var VInputnameContact = $("#InputnameContact").val();
				var VInputcedula = $("#Inputcedula").val();
				var VinputDir = $("#inputDir1").val() +' ' + $("#inputDir2").val() + ' #' +$("#inputDir3").val() +'-'+ $("#inputDir4").val();
				var VInputphone1 = $("#Inputphone1").val();
				var VInputphone2 = $("#Inputphone2").val();
				var VInputmail = $("#Inputmail").val();
				var VInputfrioPropio = $("#InputfrioPropio").val(); 
				var VInputrackcoke = $("#Inputrackcoke").val(); 
				var VInputpuntogondola = $("#Inputpuntogondola").val(); 
				var VInputlineal = $("#Inputlineal").val(); 
				var VInputneverap = $("#Inputneverap").val(); 
				var VInputnumpuertaneverap = $("#Inputnumpuertaneverap").val(); 
				var VInputneverabavaria = $("#Inputneverabavaria").val(); 
				var VInputnumpuertaneverabavaria = $("#Inputnumpuertaneverabavaria").val(); 
				var VInputnegociodeesquina = $("#Inputnegociodeesquina").val(); 
				var VInputdomicilio = $("#Inputdomicilio").val(); 
				var Lat_nueva ='';
				var log_nueva = '';		
				var VInputnointeres = $("#Inputnointeres").val();
				var VInputdonmaximo = $("#Inputdonmaximo").val();
				var VInputporque = $("#Inputporque").val();
				var VInputObservaiones = $("#InputObservaiones").val();
				
				
				
				watchId = navigator.geolocation.watchPosition(success, fail, {maximumAge: 6000, enableHighAccuracy:true, timeout: 6000});
					
					$.mobile.loading( "show", {
						text: "Obteniendo Coordenadas",
						textVisible: true,
						theme: "a",
						textonly: false,
						html: ""
					}); 
				function success(pos) {
					//alert(pos.coords.latitude);
					//defaultLatLngStore = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
					Lat_nueva = pos.coords.latitude;
					log_nueva =	pos.coords.longitude;	
					
					var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
				db.transaction(queryDB2, errorCB, successCB);
				
				 			
				function queryDB2(tx){
					tx.executeSql("UPDATE pdv_coke set nombre_contacto='"+ VInputnameContact +"' ,  cedula ='"+ VInputcedula +"', direcion_nueva ='"+ VinputDir +"', telefono1_nuevo ='"+ VInputphone1 +"', telefono2 ='"+ VInputphone2 +"', mail ='"+ VInputmail +"', frio_propio ='"+ VInputfrioPropio +"', rack_coke ='"+ VInputrackcoke +"', punta_gondola ='"+ VInputpuntogondola +"', lineal ='"+ VInputlineal +"', nevera_postobon ='"+ VInputneverap +"', num_puerta_postobon ='"+ VInputnumpuertaneverap +"', nevera_bavaria ='"+ VInputneverabavaria +"', num_puerta_bavaria ='"+ VInputnumpuertaneverabavaria +"', negocio_esquinero ='"+ VInputnegociodeesquina +"', domicio ='"+VInputdomicilio +"',  lat_nueva ='"+ Lat_nueva +"', log_nueva ='"+ log_nueva +"', status ='1', interes ='"+ VInputnointeres +"', instalo = '"+ VInputdonmaximo +"', porqueno = '"+ VInputporque +"',observacion =  '"+ VInputObservaiones +"' where outnum ='"+ VInputoutnum + "'",[] , function(db, res) {
					
				//	$("#Inputoutnum").val(VInputoutnum);
					
					//alert(VInputdonmaximo);
					
					});
					
				};
				
				 function errorCB(tx, err) {
					alert("Error processing SQL: "+err);
				}
							
				function successCB() {
					//alert('successCB');
					$.mobile.loading( "hide" );
					$.mobile.changePage("#pgPhotos");
				}
			
					
					navigator.geolocation.clearWatch(watchId);
				}
			function fail(error) {
				$.mobile.loading( "hide" );
				navigator.geolocation.clearWatch(watchId);
				popError("No pudimos obtener tu posición", "Ocurrió un error al obtener tu posición a través del GPS, por favor intentalo nuevamente ")
				
			}
				

								 
				
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
						id_usuario = data.id_usuario;
						successLocalUsr();
					}
					else{
						console.log( "Error de Autenticacion" );	
						$.mobile.loading( "hide" );
						$('#validateError').popup({ transition: "pop" });
						$('#validateError').popup("open");
						$('#validateError').popup({ dismissible: true }) 
					}				
										
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
				console.log("Error1: " + err + ".");
			}

			
		}

 });
	/*FIN FORM LOGIN*/
$("#BtonRecargar").click(function(){
//	alert('click');
	$("#pgWelcome").trigger('pageshow');	
});


$(".btonPdvEncuestado").click(function(){
	$.mobile.changePage('#pgPdvEncuestado');
});

$(".Btonwelcome").click(function(){
	$.mobile.changePage('#pgWelcome');
	});
	
$(".btonPdvEncuestadoConFoto").click(function(){
	$.mobile.changePage('#pgPdvEncuestadoConFoto');
	});	

$("#BtnSync").click(function() {
	//points = 0;Inputporque
	//$('#slPoint').val(points);	
	//$('#slPoint').selectmenu('refresh');
	//alert("BtnSync clicked");
		uploadData();	
	}); 

	$("#BtonSyncSys").click(function() {
		$("#BtonSyncSys").hide();
		updatesyncPdv();	
	});
	
	
	
$('#btnStartSyncGet').click(function(){
	//$("#pgWelcome").trigger('pageshow');
	delete_file();
	var syncStatus = true;
	
	$("#btnStartSyncGet").addClass("ui-state-disabled");
	 $.mobile.loading( "show", {
			text: "Preparando dispositivo",
			textVisible: true,
			theme: "a",
			textonly: false,
			html: ""
		 }); 
	deleteUserData();
	//agregar  antes de eliminar la funcion subir datos con sync_status = 0		
	setTimeout(function(){ 
			$.mobile.loading( "hide" );
	
			try{
				console.log("SYNC INICIO");
				console.log("SYNC ESTABLEICMIENTO INICIO 1");
				$.when($.ajax({
					method: "GET",
					url: host + 'process/lite/uploadPdv.php' ,
					data: { cli_id: id_usuario},
					dataType:"json",
					beforeSend: function( xhr ) {
						//alert('iduser:' + id_usuario);
						 $.mobile.loading( "show", {
							text: "Sincronizando Pdv Asignada",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
					  }
				})	
				  .done(function(data) {
					  var stores = [];
					var SoccerPlayerList = '';
					var Dtaoutnum = '';
					var Dtanegocio = '';
					var Dtadireccion = '';
					var Dtatelefono1 = '';
					
					console.log( "success" );
					 
					if(data.result){
						//lSync = data.lastSync
						//alert(data.lastSync)
						/*IINIICAR SYNC establecimiento*/
						$.each(data, function (key, items) {
							console.log("key=" + key);
							
							//
							//alert(lSync)
							$.each(items, function (index, data) {
								console.log("index=" + index + ' * data='+ data);
								stores.push(data);
							})
							if (stores[0]){
								//alert('stores' +stores);
								/// definicion de varibles
								
							//	SoccerPlayerList  += "<li data-icon='eye'><a class='btnLi' id='" + items.outnum + "' href='#'>";
							//	SoccerPlayerList  += "<h2>" + items.negocio +"</h2>";
							//	SoccerPlayerList  += "<p><strong>outnum: </strong> "  + items.outnum +" <strong>teléfono: </strong> "+ items.telefono1 +"</p>";
								//SoccerPlayerList  += "<p><strong>Dirección: </strong> "  +items.direccion + "</p></a></li>";
								
								var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
								db.transaction(queryDB1, errorCB, successCB);
								
								function queryDB1(tx){
									tx.executeSql("INSERT INTO pdv_coke (fecha,canal,outloc,desguc,outnum,negocio,cliente,direccion,barrio,telefono1,log_actual, lat_actual) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[items.fecha, items.canal,items.outloc,items.desguc,items.outnum,items.negocio,items.cliente,items.direccion,items.barrio,items.telefono1,items.log_actual,items.lat_actual] , function(db, res) {
								//alert("insertId: " + res.insertId + " -- probably 1");
								//alert("rowsAffected: " + res.rowsAffected + " -- should be 1");
								
								/// crear el listview
								
								
								});
							//alert(SoccerPlayerList);
							//$("#SoccerPlayerList").html(SoccerPlayerList);
						//	$("#SoccerPlayerList").listview("refresh");
							//$("#SoccerPlayerList").show();
								console.log('1');
								console.log('2');
								
							}
							
								 function errorCB(tx, err) {
								//	alert("Error processing SQL: "+err);
								}
							
								// Transaction success callback
								//
								function successCB() {
							
								}
							}
							stores = [];
							
						})
						
						/*FIN SYNC establecimiento*/												
						
					}else{
						popError('Sin datos','No tiene establecimientos programados');
						
					}
						
						
								
				  })
				  .fail(function(jqXHR, textStatus) {
						syncStatus = false;
						if(textStatus== 'timeout'){
						popError("Conexión Lenta","La conexión está tomando más tiempo de lo habitual para cargar los establecimientos. \n\nPor favor inténtelo nuevamente.");
						}
						else{
							popError('Sin datos','No pudimos cargar datos de establecimientos. \n\nAsegúrse de estar conectado a internet e inténtelo nuevamente.');
						}					
						
				  })
				  .always(function() {
					 
					  
					  $.mobile.loading( "hide" );
					  
				  })).then(
					  function(){ 
									$("#btnStartSyncGet").addClass("ui-state-disabled");
									//alert(lSync);
									localStorage.setItem("lastSync",  lSync);
								   $("#lastSync").html(lSync);								
									//window.plugins.toast.showLongBottom('Datos sincronizados correctamente ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
									$.mobile.changePage("#pgWelcome");
					  },
								function(){
								popError('Sin datos','No pudimos cargar datos. \n\nAsegúrse de estar conectado a internet e inténtelo nuevamente.');	
								}
				  
				  )	;				
			}
			catch(err) {
				syncStatus = false;
				popError('Sin datos','No pudimos cargar datos. \n\nAsegúrse de estar conectado a internet e inténtelo nuevamente.');
			}
		}, 2000);
		

	if (syncStatus){
		
		
	}
	else{
		$("#btnStartSyncGet").removeClass("ui-state-disabled");
	}
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
	
	
	$(".removephoto").click(function(){
		
		/**/
		var IDphoto = $(this).attr('id');
		switch(idtipo){
			case 'rohoto-1':
				tipoPhoto = '1';
			break;
			case 'rohoto-2':
				tipoPhoto = '2';
			break;
			case 'rohoto-3':
				tipoPhoto = '3';
			break;
			case 'rohoto-4':
				tipoPhoto ='4';
			break;
			case 'rohoto-5':
				tipoPhoto = '5';
			break;
			case 'rohoto-6':
				tipoPhoto = '6';
			break;
			case 'rohoto-7':
				tipoPhoto = '7';
			break;
			case 'rohoto-8':
				tipoPhoto = '8';
			break;
	}
	
		now = getTimeStamp(false);
		var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
			db.transaction(function(tx) {
				alert(localStorage.getItem("localoutnum"));
					tx.executeSql("INSERT INTO fotografia (fecha,outnum,tipo, foto_nombre) VALUES (?,?,?,?) ",[now, localStorage.getItem("localoutnum"), 'No aplica',tipoPhoto ] , function(db, res) {
						
						/*{pictureName:pictureName,cli_id:cli_id,deviceVersion:deviceVersion,deviceModel:deviceModel,coord:coord,visi_id:lastVisitID,chk:$('#chkElement').val(),esta_id:listStores.itemID,elemID:listElements.itemID},	*/
						window.plugins.toast.showLongBottom('Foto Borrada correctamente ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
					});
			});
		
		
	 
	//borrarfoto(IDphoto);
		/**/
	});
	
	$("#refreshPosition").click(function() {
		$("#pgMap").trigger('pageshow');	
	}); 
	
$('#btnReloadStores').click(function(){
	//$("#pgWelcome").trigger('pageshow');
});

$('#btnReloadDate').click(function(){
	$("#pgSyncStart").trigger('pageshow');
});

	$(".exitConfirm").click(function() {
			 console.log("exit");
		 	 exit();
		 }); 
		 
	

//** toma de fotos y rechazo de la **///

$(".capturaPhoto").click(function(){
	var IDphoto = $(this).attr('id'); 
	//borrarfoto(IDphoto);
	localStorage.setItem("IDphoto", IDphoto);
	captureEjecPhoto();
});


$("#btnPictureEjec").click(function() {
	captureEjecPhoto();
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

$("#BtonCreatePdV").click(function(){
	local_long_visit=local_long;
	local_lat_visit=local_lat;
		$.mobile.loading( "show", {
		text: "Cargando formulario",
		textVisible: true,
		theme: "a",
		textonly: false,
		html: ""
	});
	$.mobile.changePage("#pgFormPdV");
	$.mobile.loading( "hiden");
});


});


$( document ).on( "pagecreate", "#pgWelcome", function() {
	window.plugins.toast.showLongBottom('Bienvenido ' + cli_nombre, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
	
	//alert('tus nalgas');
	 
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
	
	$("#pgWelcome").bind('pageshow', function() {
	
		
			
/// query en la base de datos demo
	var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 20000000);
	db.transaction(queryDB, errorCB, successCB);
		$.mobile.loading( "show", {
			text: "Cargando Establecimientos",
			textVisible: true,
			theme: "a",
			textonly: false,
			html: ""
		});	
function queryDB(tx){
	//alert('executeSql');
        tx.executeSql('SELECT * FROM pdv_coke where status IS NULL',[],querySuccess,errorCB);
		
    }
 
    function querySuccess(tx,result){
        $('#SoccerPlayerList').empty();
		
	
		if(result.rows.length>0){
			//$("#BtonSyncSys").hide();
			var SoccerPlayerList = '';
			var Dtaoutnum = '';
			var Dtanegocio = '';
			var Dtadireccion = '';
			var Dtatelefono1 = '';

        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);

			 Dtaoutnum = row['outnum'];
			 Dtanegocio = row['negocio'];
			 Dtadireccion = row['direccion'] ;
			 Dtatelefono1 = row['telefono1'];

			SoccerPlayerList  += "<li data-icon='eye'><a id='" + Dtaoutnum + "' href='#'>";
			SoccerPlayerList  += "<h2>" + Dtanegocio +"</h2>";
			SoccerPlayerList  += "<p><strong>outnum: </strong> "  + Dtaoutnum +" <strong>teléfono: </strong> "+ Dtatelefono1 +"</p>";
			SoccerPlayerList  += "<p><strong>Dirección: </strong> "  +Dtadireccion + "</p></a></li>";
			
		
        }
		
			$("#SoccerPlayerList").html(SoccerPlayerList);
			$("#SoccerPlayerList").listview("refresh");
			$("#SoccerPlayerList").show();
		
		
			///// click de listview
			
			 $('#SoccerPlayerList li a').each(function(){
						var elementID = $(this).attr('id');      
						console.log("elementID" + elementID);
						$(document).on('click', '#'+elementID, function(event){  
						
						if(event.handled !== true)
							{
								console.log("SoccerPlayerList li : " + elementID);
								 $.mobile.loading( "show", {
										text: "Cargando Información de Pdv",
										textVisible: true,
										theme: "a",
										textonly: false,
										html: ""
									});
									localStorage.setItem("localoutnum", elementID);
									var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 20000000);
									//alert('entro1');
									db.transaction(DtaPdvDetail, errorCB, successCB);
									//alert(db);
									function DtaPdvDetail(tx1) {
									//	alert('entro');
										tx1.executeSql("SELECT  * from pdv_coke where outnum='" + elementID  + "'", [], QueryDetail,errorCB);
									};
										function QueryDetail(tx1,result1){
											//alert('Negocio: '+result1.negocio);
											$("#Inputnegocio").html(result1.rows.item(0).negocio);
											$("#InputCliente").html(result1.rows.item(0).cliente);
											$("#Inputoutnum").val(result1.rows.item(0).outnum);
											$("#InputCanal").html(result1.rows.item(0).canal);
											$("#InputDireccion").html(result1.rows.item(0).direccion);
											
											//*****************///
											$("#InputnameContact").val('');
											$("#Inputcedula").val('');
											$("#inputDir2").val('');
											$("#inputDir3").val('');
											$("#inputDir4").val('');
											$("#Inputphone1").val('');
											$("#Inputphone2").val('');
											$("#Inputmail").val('');
											$("#InputfrioPropio").val('SI').slider("refresh");
											$("#Inputrackcoke").val('SI').slider("refresh");
											$("#Inputpuntogondola").val('SI').slider("refresh");
											$("#Inputlineal").val('SI').slider("refresh");
											$("#Inputneverap").val('SI').slider("refresh");
											$("#Inputnumpuertaneverap").val(0);
											$("#Inputneverabavaria").val('SI').slider("refresh");
											$("#Inputnumpuertaneverabavaria").val(0);
											$("#Inputnegociodeesquina").val('SI').slider("refresh");
											$("#Inputdomicilio").val('SI').slider("refresh");
											$("#Inputnointeres").val('SI').slider("refresh");
											$("#Inputdonmaximo").val('SI').slider("refresh");
											$("#Inputporque").val('');
											$("#InputObservaiones").val('');
											
											//alert('dddd');
												
										};
										
									//$("#DetailPdvul").listview("refresh");
									$.mobile.loading( "hide" );
									$.mobile.changePage("#pgPdvDetail");	
									
									event.handled = true;
						}
								
								});
								
					});	
					
			
			
				
			/// fin del click
		
		}
		//$.mobile.loading( "hiden");
		$.mobile.loading( "hide" );	
        $('#SoccerPlayerList').listview();
    }

    function errorCB(tx, err) {
      //  alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
      //  alert("success!");
    }
	
// fin 
			
/// click boton 
		});
	});
	
	
$( document ).on( "pagecreate", "#pgPdvEncuestado", function() {
	
	//alert('tus nalgas');
	 
	$("#pgPdvEncuestado").bind('pageshow', function() {
		
	$('#PdvEncuesta').html('');		
/// query en la base de datos demo
	var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 20000000);
	db.transaction(queryDB, errorCB, successCB);
		$.mobile.loading( "show", {
			text: "Cargando Establecimientos",
			textVisible: true,
			theme: "a",
			textonly: false,
			html: ""
		});	
function queryDB(tx){
	//alert('executeSql');
        tx.executeSql('SELECT * FROM pdv_coke where status="1" and sync is null ',[],querySuccess,errorCB);
		
    }
 
    function querySuccess(tx,result){
        $('#PdvEncuesta').empty();
		
		if(result.rows.length>0){
			//$("#BtonSyncSys").hide();
			var SoccerPlayerList1 = '';
			var Dtaoutnum = '';
			var Dtanegocio = '';
			var Dtadireccion = '';
			var Dtatelefono1 = '';

        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);

			 Dtaoutnum = row['outnum'];
			 Dtanegocio = row['negocio'];
			 Dtadireccion = row['direccion'] ;
			 Dtatelefono1 = row['telefono1'];

			SoccerPlayerList1  += "<li data-icon='eye'><a id='b-" + Dtaoutnum + "' href='#'>";
			SoccerPlayerList1  += "<h2>" + Dtanegocio +"</h2>";
			SoccerPlayerList1  += "<p><strong>outnum: </strong> "  + Dtaoutnum +" <strong>teléfono: </strong> "+ Dtatelefono1 +"</p>";
			SoccerPlayerList1  += "<p><strong>Dirección: </strong> "  +Dtadireccion + "</p></a></li>";
			
		
        }
		
			$("#PdvEncuesta").html(SoccerPlayerList1);
			$("#PdvEncuesta").listview("refresh");
			$("#PdvEncuesta").show();
		
		
			///// click de listview
			
			 $('#PdvEncuesta li a').each(function(){
						var elementID1 = $(this).attr('id');      
						console.log("elementIDFlower" + elementID1);
						$(document).on('click', '#'+elementID1, function(event){  
						 
						if(event.handler !== true)
							{
							//	alert('sss');
								console.log("PdvEncuesta li : " + elementID1);
								 $.mobile.loading( "show", {
										text: "Cargando Información de Pdv",
										textVisible: true,
										theme: "a",
										textonly: false,
										html: "" 
									});
									var outElent = elementID1.split('-');
									localStorage.setItem("localoutnum", outElent[1]);
										
									//$("#DetailPdvul").listview("refresh");
									$.mobile.loading( "hide" );
									$.mobile.changePage("#pgPhotos");	
									
									event.handler = true;
						}
								
								});
								
					});	
					
			
			
				
			/// fin del click
		
		}
		//$.mobile.loading( "hiden");
		$.mobile.loading( "hide" );	
		$("#PdvEncuesta").listview("refresh");
        $('#PdvEncuesta').listview();
    }

    function errorCB(tx, err) {
      //  alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
      //  alert("success!");
    }
	
// fin 
			
/// click boton 
		});
	});

$( document ).on( "pagecreate", "#pgPdvEncuestadoConFoto", function() {
	$("#pgPdvEncuestadoConFoto").bind('pageshow', function() {
		
	$('#PdvEncuestaConFoto').html('');		
/// query en la base de datos demo
	var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 20000000);
	db.transaction(queryDB, errorCB, successCB);
		$.mobile.loading( "show", {
			text: "Cargando Establecimientos",
			textVisible: true,
			theme: "a",
			textonly: false,
			html: ""
		});	
function queryDB(tx){
	//alert('executeSql');
        tx.executeSql('SELECT * FROM pdv_coke INNER JOIN fotografia ON pdv_coke.outnum = fotografia.outnum group by pdv_coke.outnum',[],querySuccess,errorCB);
		
    }
 
    function querySuccess(tx,result){
        $('#PdvEncuestaConFoto').empty();
		
		if(result.rows.length>0){
			//$("#BtonSyncSys").hide();
			var SoccerPlayerList1 = '';
			var Dtaoutnum = '';
			var Dtanegocio = '';
			var Dtadireccion = '';
			var Dtatelefono1 = '';
			var contar =0;
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
				contar = contar +1;	
			 Dtaoutnum = row['outnum'];
			 Dtanegocio = row['negocio'];
			 Dtadireccion = row['direccion'] ;
			 Dtatelefono1 = row['telefono1'];

			SoccerPlayerList1  += "<li data-icon='eye'><a id='b-" + Dtaoutnum + "' href='#'>";
			SoccerPlayerList1  += "<h2>" + contar +' '+ Dtanegocio +"</h2>";
			SoccerPlayerList1  += "<p><strong>outnum: </strong> "  + Dtaoutnum +" <strong>teléfono: </strong> "+ Dtatelefono1 +"</p>";
			SoccerPlayerList1  += "<p><strong>Dirección: </strong> "  +Dtadireccion + "</p></a></li>";
			
		
        }
		
			$("#PdvEncuestaConFoto").html(SoccerPlayerList1);
			$("#PdvEncuestaConFoto").listview("refresh");
			$("#PdvEncuestaConFoto").show();
		
		
			///// click de listview
			
			 $('#PdvEncuestaConFoto li a').each(function(){
						var elementID2 = $(this).attr('id');      
						console.log("elementIDFlower" + elementID2);
						$(document).on('click', '#'+elementID2, function(event){  
						 
						if(event.handler !== true)
							{
							//	alert('sss');
								console.log("PdvEncuesta li : " + elementID2);
								 $.mobile.loading( "show", {
										text: "Cargando Información de Pdv",
										textVisible: true,
										theme: "a",
										textonly: false,
										html: "" 
									});
									var outElent = elementID2.split('-');
									localStorage.setItem("localoutnum", outElent[1]);
										
									//$("#DetailPdvul").listview("refresh");
									$.mobile.loading( "hide" );
									$.mobile.changePage("#pgdatacompleta");	
									
									event.handler = true;
						}
								
								});
								
					});	
					
			
			
				
			/// fin del click
		
		}
		//$.mobile.loading( "hiden");
		$.mobile.loading( "hide" );	
		$("#PdvEncuestaConFoto").listview("refresh");
        $('#PdvEncuestaConFoto').listview();
    }

    function errorCB(tx, err) {
      //  alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
      //  alert("success!");
    }
	
// fin 
			
/// click boton 
		});
	});
	
$( document ).on( "pagecreate", "#pgdatacompleta", function() {
	$("#pgdatacompleta").bind('pageshow', function() {
		
	$('#listviewDataComplet').html('');		
/// query en la base de datos demo
	var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 20000000);
	db.transaction(queryDB, errorCB, successCB);
		$.mobile.loading( "show", {
			text: "Cargando Establecimientos",
			textVisible: true,
			theme: "a",
			textonly: false,
			html: ""
		});	
function queryDB(tx){
	//alert('executeSql');
	//alert(localStorage.getItem("localoutnum"));
       tx.executeSql("SELECT * FROM pdv_coke where outnum = '"+ localStorage.getItem("localoutnum") +"'",[],querySuccess,errorCB);
		
    }
 
    function querySuccess(tx,result){
        $('#listviewDataComplet').empty();
		
		if(result.rows.length>0){
			//$("#BtonSyncSys").hide();
			var SoccerPlayerList1 = '';
			var Dtaoutnum = '';
			var Dtanegocio = '';
			var Dtadireccion = '';
			var Dtatelefono1 = '';
			var contar =0;
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
				contar = contar +1;	
			 Dtaoutnum = row['outnum'];
			 Dtanegocio = row['negocio'];
			 Dtadireccion = row['direccion'] ;
			 Dtatelefono1 = row['telefono1'];

			SoccerPlayerList1  += "<li data-role='list-divider'>";
			SoccerPlayerList1  += "<h2>" + contar +' '+ Dtanegocio +"</h2></li>";
			SoccerPlayerList1  += "<li><p><strong>outnum: </strong> "  + Dtaoutnum +" <strong>teléfono: </strong> "+ Dtatelefono1 +"</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Dirección: </strong> "  +Dtadireccion + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Dirección: </strong> "  +Dtadireccion + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Nombre contacto: </strong> "  +row['nombre_contacto'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Cedula: </strong> "  +row['cedula'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Dirección nueva: </strong> "  +row['direcion_nueva'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Teléfono 1 : </strong> "  +row['telefono1_nuevo'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Teléfono 2 : </strong> "  +row['telefono2'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Mail : </strong> "  +row['mail'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>frio propio : </strong> "  +row['frio_propio'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Rack coke : </strong> "  +row['rack_coke'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Punta gondola : </strong> "  +row['punta_gondola'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Lineal : </strong> "  +row['lineal'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Nevera postobon: </strong> "  +row['nevera_postobon'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Número de puerta: </strong> "  +row['num_puerta_postobon'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Nevera Bavaria: </strong> "  +row['nevera_bavaria'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Número de puerta: </strong> "  +row['num_puerta_bavaria'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Negocio de esquina: </strong> "  +row['negocio_esquinero'] + "</p></li>";
			SoccerPlayerList1  += "<li><p><strong>Domicilio: </strong> "  +row['domicio'] + "</p></li>";
        }
		
			$("#listviewDataComplet").html(SoccerPlayerList1);
			$("#listviewDataComplet").listview("refresh");
			$("#listviewDataComplet").show();
		
			
			/// fin del click
		
		}
		//$.mobile.loading( "hiden");
		$.mobile.loading( "hide" );	
		$("#listviewDataComplet").listview("refresh");
        $('#listviewDataComplet').listview();
    }

    function errorCB(tx, err) {
      //  alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
      //  alert("success!");
    }
	
// fin 
			
/// click boton 
		});
	});	

$( document ).on( "pagecreate", "#pgAgredarpdV", function() {
	$("#pgAgredarpdV").bind('pageshow', function() {
		
		/// cargar mapa en la creacion de pdv

		watchId = navigator.geolocation.watchPosition(success, fail, {maximumAge: 6000, enableHighAccuracy:true, timeout: 6000});
		if ( navigator.geolocation ) {
			$.mobile.loading( "show", {
				text: "Obteniendo Coordenadas",
				textVisible: true,
				theme: "a",
				textonly: false,
				html: ""
			}); 
			function success(pos) {
				defaultLatLngStore = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
				navigator.geolocation.clearWatch(watchId);
				alert(defaultLatLngStore);
				drawMapStore(defaultLatLngStore);
				$.mobile.loading( "hide" );
			
			}
			function fail(error) {
				navigator.geolocation.clearWatch(watchId);
				popError("No pudimos obtener tu posición", "Ocurrió un error al obtener tu posición a través del GPS, el sistema te arrojará la ubicación por defecto")
			$.mobile.loading( "hide" );
				
				
				defaultLatLngStore = new google.maps.LatLng(4.598056, -74.075833); 
				drawMapStore(defaultLatLngStore);
			}
		}
	
	
		/// fin del mapa 
	});		
});


$( document ).on( "pagecreate", "#pgSyncFoto", function() {
	$("#pgSyncFoto").bind('pageshow', function() {
		try { 				
				/*LOAD ASSIGNED STORES*/
				var jqxhr = $.ajax({
					method: "GET",
					dataType: "json",
					url: host + 'process/cantidadfotos.php?id_user='+id_usuario ,
					beforeSend: function( xhr ) {
						 $.mobile.loading( "show", {
							text: "Obteniendo cantidad de fotos sin sincronizar",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
					  }
				})			
				  .done(function(data) {
					//alert(data[0].cantidad);
					$("#CantFotos").html('cantidad de fotos sin sincronizar '+data[0].cantidad);
								
				  })
				  .fail(function(jqXHR, textStatus) {
						
						if(textStatus== 'timeout'){
						popError("Conexión Lenta","La conexión está tomando más tiempo de lo habitual para cargar la fecha actual del servidor. \n\nPor favor inténtelo nuevamente.");
						}
						else{
							popError("Error de conexión","Ocurrió un error al intentar obtener la fecha actual del servidor. \n\nPor favor inténtelo nuevamente.");
						}					
						
				  })
				  .always(function() {
					 
					//  $("#lvStores").show();
					  $.mobile.loading( "hide" );
					  
//					alert( "complete" );
				  });				
			}
			catch(err) {
				console.log("Error: " + err + ".");
			}
	});
});


$(document).on('click', '.btnLi' ,function(){
 //alert("document click btnOperation")
//$(".btnOperation").on("click", function() {

var elementID = $(this).attr("id");
  
//  alert($button.attr("id"))

console.log("SoccerPlayerList li : " + elementID);
								 $.mobile.loading( "show", {
										text: "Cargando Información de Pdv",
										textVisible: true,
										theme: "a",
										textonly: false,
										html: ""
									});
									var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 20000000);
									//alert('entro1');
									db.transaction(DtaPdvDetail, errorCB, successCB);
									//alert(db);
									function DtaPdvDetail(tx1) {
									//	alert('entro');
										tx1.executeSql("SELECT  * from pdv_coke where outnum='" + elementID  + "'", [], QueryDetail,errorCB);
									};
										function QueryDetail(tx1,result1){
											//alert('Negocio: '+result1.negocio);
											$("#Inputnegocio").html(result1.rows.item(0).negocio);
											$("#InputCliente").html(result1.rows.item(0).cliente);
											$("#Inputoutnum").html(result1.rows.item(0).outnum);
											$("#InputCanal").html(result1.rows.item(0).canal);
											$("#InputDireccion").html(result1.rows.item(0).direccion);
												//$("#DetailPdvul").listview("refresh");
									$.mobile.loading( "hide" );
									$.mobile.changePage("#pgPdvDetail");
												
										};
										
									

								function errorCB(tx, err) {
								//	alert("Error processing SQL: "+err);
								}
							
								// Transaction success callback
								//
								function successCB() {
							
								}								

 });
 
 $( document ).on( "pagecreate", "#pgPhotos", function() {
	$("#pgPhotos").bind('pageshow', function() {
		//alert('44');
		
		$.mobile.loading( "show", {
				text: "Procesando fotos",
				textVisible: true,
				theme: "a",
				textonly: false,
				html: ""
			}); 
		
		//$("#listwiewPhoto").listview("refresh");
		$("#listwiewPhoto").show();
		//alert(localStorage.getItem("localoutnum"));
		$("#foto1").show();
		$("#foto2").show();
		$("#foto3").show();
		$("#foto4").show();
		$("#foto5").show();
		$("#foto6").show();
		$("#foto7").show();
		$("#foto8").show();
		
		var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
		db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM fotografia where outnum = '"+ localStorage.getItem("localoutnum") +"'", [], function(tx2, res) {
			
			if(res.rows.length>0){
				 for (var i = 0; i < res.rows.length; i++) {
						if(res.rows.item(i).foto_nombre==1){
							$("#foto1").hide();
						}else if(res.rows.item(i).foto_nombre==2){
							$("#foto2").hide();
						}else if(res.rows.item(i).foto_nombre==3){
							$("#foto3").hide();
						} else if(res.rows.item(i).foto_nombre==4){
							$("#foto4").hide();
						}else if(res.rows.item(i).foto_nombre==5){
							$("#foto5").hide();
						}else if(res.rows.item(i).foto_nombre==6){
							$("#foto6").hide();
						} else if(res.rows.item(i).foto_nombre==7){
							$("#foto7").hide();
						} else if(res.rows.item(i).foto_nombre==8){
							$("#foto8").hide();
						}
				 }
			}else{
			$("#foto1").show();
			$("#foto2").show();
			$("#foto3").show();
			$("#foto4").show();
			$("#foto5").show();
			$("#foto6").show();
			$("#foto7").show();
			$("#foto8").show();
			//	alert('12');
			}
		})
		
		$.mobile.loading( "hide" );
		})

		
	});
});	

$( document ).on( "pagecreate", "#pgMap", function() {
	console.log("pagecreate");
	$("#pgMap").bind('pageshow', function() {

		$('#refreshPosition').addClass("elemHide");
	watchId = navigator.geolocation.watchPosition(success, fail, {maximumAge: 6000, enableHighAccuracy:true, timeout: 6000});
	if ( navigator.geolocation ) {
//		showLoading("Obteniendo posición")
		$.mobile.loading( "show", {
			text: "Obteniendo posición",
			textVisible: true,
			theme: "a",
			textonly: false,
			html: ""
		}); 
		function success(pos) {
	
		//	$("#fixPosition").removeClass("ui-state-disabled");
		//	$("#chkVisit").removeClass("ui-state-disabled");
			
			defaultLatLngStore = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
	
			navigator.geolocation.clearWatch(watchId);
			drawMap(defaultLatLngStore);
			$.mobile.loading( "hide" );
		}
		function fail(error) {
			popError("No pudimos obtener tu posición","Ocurrió un error al obtener tu posición a través del GPS, el sistema te arrojará la ubicación por defecto");
			//popError("No pudimos obtener tu posición", "Ocurrió un error al obtener tu posición a través del GPS, el sistema te arrojará la ubicación por defecto")
			defaultLatLngStore = new google.maps.LatLng(4.598056, -74.075833);
			navigator.geolocation.clearWatch(watchId);
			drawMap(defaultLatLngStore);
			//$("#fixPosition").addClass("ui-state-disabled");
			//$("#chkVisit").addClass("ui-state-disabled");
			$('#refreshPosition').removeClass("elemHide");
			$.mobile.loading( "hide" );
		}
	}
	});
});


$( document ).on( "pagecreate", "#pgSyncStart", function() {
$("#pgSyncStart").bind('pageshow', function() {
	$("#dvSyncStart").addClass("elemHide");
	$("#btnReloadDate").addClass("elemHide");
	
	
	try { 				
				/*LOAD ASSIGNED STORES*/
				var jqxhr = $.ajax({
					method: "GET",
					dataType: "json",
					url: host + 'process/lite/getDate.php' ,
					beforeSend: function( xhr ) {
						 $.mobile.loading( "show", {
							text: "Obteniendo fecha actual del servidor",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
					  }
				})			
				  .done(function(data) {
					  //console.log(data.today + "!=" + localStorage.getItem("lastSync"));
					  localStorage.setItem("corte",  data.corte);
					  corte = localStorage.getItem("corte")
					  lSync = data.today
					 if (data.today==localStorage.getItem("lastSync")){
						 $.mobile.changePage( "#pgWelcome" );
					 }
					 else{
						 $("#dvSyncStart").removeClass("elemHide");	
						 ///////STARTSYNC
						 //var hasDatatoSync = false
/*
							db.transaction(function(tx) {
								tx.executeSql("SELECT * FROM `establecimiento` where syncStatus='0'", [], function(tx2, res) {
									if (res.rows.length>0){
										//hasDatatoSync = true
										popError('Tiene Datos sin sincronizar','Por favor asegárate subir estos datos para no perder el trabajo realizado')
										$.mobile.changePage( "#pgUploadData" );
									}
									else{
											tx.executeSql("SELECT * FROM visitas left join ejecucion_foto on (visitas.visi_id = ejecucion_foto.visi_id) where  visitas.sync_status='0' order by visitas.visi_id asc", [], function(tx5, res2) {
											if (res2.rows.length>0){
												
												popError('Tiene Datos sin sincronizar','Por favor asegárate subir estos datos para no perder el trabajo realizado')
												$.mobile.changePage( "#pgUploadData" );
											}
											else{
												 $("#dvSyncStart").removeClass("elemHide");	
											}
										});
									}
								});
							});
					*/
						
					 }
					console.log("CORTE==" + localStorage.getItem("corte"));
								
				  })
				  .fail(function(jqXHR, textStatus) {
						$("#btnReloadDate").removeClass("elemHide");
						
						if(textStatus== 'timeout'){
						popError("Conexión Lenta","La conexión está tomando más tiempo de lo habitual para cargar la fecha actual del servidor. \n\nPor favor inténtelo nuevamente.");
						}
						else{
							popError("Error de conexión","Ocurrió un error al intentar obtener la fecha actual del servidor. \n\nPor favor inténtelo nuevamente.");
						}					
						
				  })
				  .always(function() {
					 
					//  $("#lvStores").show();
					  $.mobile.loading( "hide" );
					  
//					alert( "complete" );
				  });				
			}
			catch(err) {
				$("#btnReloadDate").removeClass("elemHide");
				console.log("Error: " + err + ".");
			}
	
	
});
});