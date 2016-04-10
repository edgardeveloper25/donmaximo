// Wait for device API libraries to load

var host="http://elreplantigo.com/app/co.axdigital.elreplan/";	
var cli_id="";
var cli_nombre="";
var listStores = {
    itemID : null
}
var listElements = {
    itemID : null
}
var remoteFiles = [];
var deferreds;
var deferredsCamp;
var watchId = "";
var currentVersionApp ="";
var pictureSource;   // picture source
var pictureName   // picture source
 var destinationType; // sets the format of returned value
var deviceModel = "";
var deviceVersion = "";
var site="";
var coord="";
var local_long="";
var local_lat="";
var local_long_visit="";
var local_lat_visit="";
var local_long_ejec="";
var local_lat_ejec="";
var curStoreClasif=0;
var coord_visit="";
var lastVisitID = "";
var newVisit=0;
var db;
var corte;
var lvCampaigns = "";
var lilvCampaigns = "";
var JSONmarkers = [];
var originMe = "";
var destinations  = [];
//var deviceName = "";
//var secs=10;
//var interval;
 function onBodyLoad() {
	 console.log("onBodyLoad");
	document.addEventListener("deviceready", onDeviceReady, false);
 }
    

    // device APIs are available
    //
    function onDeviceReady() {
		
		db = window.sqlitePlugin.openDatabase({ name: 'elreplantigo.db',createFromLocation: 1 });
		
		
		
		/*function iniDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS USER');
	   if(window.localStorage.getItem('runned')==null){ 
			console.log("RUNNED");
  			window.localStorage.setItem('runned','1') 
			tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, mail unique, name TEXT, phone TEXT)');
			
		}
		else{
			tx.executeSql('CREATE TABLE IF NOT EXISTS USER (mail unique, name TEXT, phone TEXT)');
			tx.executeSql('INSERT INTO USER VALUES(\'fburgos@mejia.com.co\',\'Flower Burgos\', \'3003315480\'');
		} 
       
   		}*/

  //   Transaction error callback
    
    function errorCB(err) {
        alert("Error processing SQL: "+err);
    }
	
	function successIni() {
		 var db = window.sqlitePlugin.openDatabase("consumidor", "1.0", "Polapp Consumidor", 200000);
       // db.transaction(queryUSR, errorCB);
        alert("success ini!");
    }
		 /*db = window.sqlitePlugin.openDatabase("elreplantigo.db", "1.0", "Demo", -1);

		  db.transaction(function(tx) {
			tx.executeSql('DROP TABLE IF EXISTS test_table');
			tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
		
			tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
			  console.log("insertId: " + res.insertId + " -- probably 1");
			  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
		
			  tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
				console.log("res.rows.length: " + res.rows.length + " -- should be 1");
				console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
			  });
		
			}, function(e) {
			  console.log("ERROR: " + e.message);
			});
		  });*/
		  
		  
		  
		
//		db = window.sqlitePlugin.openDatabase({name: "elreplantigo.db", createFromLocation: 1});
		
		//alert(db);
		checkConnection();		
		deviceModel = device.model;
		deviceVersion = device.version;
		initPushwoosh();		
		//inicializar estructura DB		
		

		/*MONITORES DE CONEXIÓN DESACTIVADOS
		document.addEventListener("offline", onOffline, false);
		document.addEventListener("online", onOnline, false);	*/
		
		queryLocalUsr();
		pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
		cordova.getAppVersion().then(function (versionNumber) {
			currentVersionApp = versionNumber;
			$("#version").text("Versión: " + versionNumber);
		});
		
		document.addEventListener("backbutton", function(e){
			console.log("back")
			if ($.mobile.activePage.is('#pgWelcome')){
				 e.preventDefault();
				   //navigator.app.exitApp();
				   console.log("back pgWelcome")
				   $('#confirmExitW').popup({ transition: "pop" });
					$('#confirmExitW').popup("open");
					$('#confirmExitW').popup({ dismissible: true }) 
					//pgOffline
			}
			else {
			   if ($.mobile.activePage.is('#pgOffline') || $.mobile.activePage.is('#pgOfflineStarting')){
				 e.preventDefault();
				   navigator.app.exitApp();
				   
				}
				else {
				   
					   if ($.mobile.activePage.is('#pgStart')){
						 	e.preventDefault();
						    navigator.app.exitApp();
						   
						}
						else {
							if ($.mobile.activePage.is('#pgStoreCampaign')){
						 		e.preventDefault();
						    	//navigator.app.exitApp();
								$('#popEndVisit').popup({ transition: "pop" });
								$('#popEndVisit').popup("open", {positionTo: "window"});
								//$('#validateError').popup({ 'data-position-to': "window" });			
								$('#popEndVisit').popup({ dismissible: true }) 
							   
							}
							else {
							   
								  if ($.mobile.activePage.is('#pgSyncStart')){
										e.preventDefault();
										//navigator.app.exitApp();
										$('#confirmExitW').popup({ transition: "pop" });
										$('#confirmExitW').popup("open", {positionTo: "window"});
										//$('#validateError').popup({ 'data-position-to': "window" });			
										$('#confirmExitW').popup({ dismissible: true }) 
									   
									}
									else {
									   
										   navigator.app.backHistory()
								
									}
						
							}
						   
							  
							   
					
						}
			
				}
			}
		}, false);
		
		
    }
	function onOffline(e) {
		console.log("Called",e.type);
		console.log("OffLine Function START");
		setTimeout(function(){ 
			if (!$.mobile.activePage.is('#pgOffline')){			
				console.log("OffLine Changed");
				$.mobile.changePage( "#pgOffline" );
			}

		}, 3000);
		console.log("OffLine Function END");
				
    }
function onOnline(e) {
	console.log("Called",e.type);
	console.log("OnLine Function START");
	setTimeout(function(){ 
		if ($.mobile.activePage.is('#pgOffline')){			
			console.log("OnLine changed");
			//$.mobile.changePage( "#pgWelcome" );
			navigator.app.backHistory();
		}
	}, 3000);
	console.log("OnLine Function END");
}
   

	
function checkConnection() {
    var networkState = navigator.connection.type;


    if ((networkState == Connection.UNKNOWN) || (networkState == Connection.NONE)){
		$.mobile.changePage( "#pgOfflineStarting" );

	}
	
}


function regUser(){
		//var landmarkID = $(this).parent().attr('data-landmark-id');
		$( "#confirmReg" ).popup( "close" );
		$.mobile.loading( "show", {
						text: "Cargando",
						textVisible: true,
						theme: "a",
						textonly: false,
						html: ""
				});
		try { 
		var postData = $('#frmRegUser').serialize();
		console.log("EVENTO: " + event);
		$.ajax({
			type:"POST",
			data: postData,
			url:host+"process/createCustomer.php",
			//cache:false, 
			//dataType:"text", 
			 //dataType: "Json",
			success: function(data){
				console.log("RESPUESTA PHP:" + data);
				if (data=="true"){
					
					

						$.mobile.loading( "hide" );
						createLocalUsr();
						
				}
				else{
					$.mobile.loading( "hide" );
					alert('Ocurrió un error, asegúrate de estar conectado a Internet y que no te hayas registrado anteriormente');
				}
			},
			error: function(){
				//console.log(data);
				$.mobile.loading( "hide" );
				alert('Error de Conexión');
			}
			});
			event.preventDefault();
			return false;
		}
		catch(err) {
			alert("Ocurrió un error al registrarte: " + err);
			console.log("Error: " + err + ".");
		}				
						
		
}
function updatesLastAccessSuccess(){
	console.log("Login Date Updated")	
}
function createLocalUsr(){
		cli_nombre=$('#txtNombre').val();
		cli_id=$('#txtCedula').val();
		
		$("#lbDocumento").html(cli_id);
		$("#lbNombre").html(cli_nombre);
		$("#lbPuntos").html("0");
		//cli_mail=$('#txtMail').val();
		//cli_ciudad =$('#slCiudad').val();
		
		$('#txtNombre').val("");
		$('#txtApellido').val("");
		$('#txtCedula').val("");
		//$('#slCiudad').val('0').selectmenu("refresh");
		$('#lstCiudad').val('').selectmenu("refresh");

		

		localStorageFcn();
		$.mobile.changePage("#pgWelcome");
		window.plugins.toast.showLongBottom('Bienvenido ' + cli_nombre, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		console.log("success!");

}
function localStorageFcn(){
		try{
			localStorage.setItem("id", cli_id);
			localStorage.setItem("name", cli_nombre);	
			
				
		}catch(err) {
			alert("Ocurrió un error al guardar los datos en su Dispositivo: " + err);
			console.log("Error: " + err + ".");
		}
	}
function queryLocalUsr() {
		console.log("queryLocalUsr");
        console.log("Returned id = " + localStorage.id);
		
		//if (!localStorage.id){
		if (typeof localStorage.id === "undefined"){
			console.log("NO HAY REGISTROS ");
			$.mobile.changePage( "#pgStart" );	
			
			//window.sqlitePlugin.deleteDatabase({name: "elreplantigo.db", location: 1}, successcb, errorcb);
			//delete from campana;
			
			deleteUserData();
			
		}
		else{
			
			cli_id= localStorage.getItem("id");
			cli_nombre =localStorage.getItem("name");
			//localStorage.setItem("lastSync",  data2.lastSync);
//			localStorage.setItem("lastSync",  lastSync);
			if (localStorage.getItem("lastSync")){
				$("#lastSync").html(localStorage.getItem("lastSync"));
			}
			//
			//$("#lbDocumento").html(cli_id);
			//$("#lbNombre").html(cli_nombre);
			//$("#lbPuntos").html("0");
		
			console.log("LOCAL VARIABLES")
			console.log(cli_id);
			console.log(cli_nombre)

			

			$("#userWelcome").html(cli_nombre);
			
			//$.mobile.changePage("#pgWelcome");
			$.mobile.changePage("#pgSyncStart");
			
			console.log("DIRECCIONANDO");
		}

    }
function exit(){
	//window.plugin.notification.local.cancelAll();
	console.log("exit fnc")
	navigator.app.exitApp();
}

function successLocalUsr() {


//		$("#lbDocumento").html(cli_id);
//		$("#lbNombre").html(cli_nombre);
		localStorageFcn();
		
		$("#userWelcome").html(cli_nombre)
		//$.mobile.changePage("#pgWelcome");
		$.mobile.changePage("#pgSyncStart");
		window.plugins.toast.showLongBottom('Bienvenido ' + cli_nombre, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		console.log("success!");
	}


function login(responseJson){
		$("#txtClavelogin").val("");
		
		var jsonResult = jQuery.parseJSON( responseJson );
		

		
		//console.log("responseJson: " + jsonResult.result);
		//console.log("responseJson: " +jsonResult.cli_id);
		//console.log("responseJson: " +jsonResult.cli_nombre)
		if (jsonResult.result){
			
	
			
			cli_id=jsonResult.cli_id;
			cli_nombre=jsonResult.cli_nombre;
			
			
					
			successLocalUsr();
		}
		else{
			console.log( "Error de Autenticacion" );	
			$.mobile.loading( "hide" );
			$('#validateError').popup({ transition: "pop" });
			$('#validateError').popup("open", {positionTo: "window"});
			//$('#validateError').popup({ 'data-position-to': "window" });			
			$('#validateError').popup({ dismissible: true }) 
			
			
		}
		//console.log( jsonResult.cli_nombre );
		//console.log( jsonResult.cli_telefono );
		
}

function logOff(){
		
		// var db = window.sqlitePlugin.openDatabase("consumidor", "1.0", "Polapp Consumidor", 200000);
		//db.transaction(logOffUser, errorCB, successLogOff);
		localStorage.removeItem("id");
		localStorage.removeItem("name");
		localStorage.removeItem("lastSync");
		localStorage.removeItem("corte");
		
		

		
		
		successLogOff()
		
	}
function successLogOff() {
	//	var db = window.sqlitePlugin.openDatabase("consumidor", "1.0", "Polapp Consumidor", 200000);
	//	db.transaction(queryUSR, errorCB);
	$("#txtDocLogin").val("");
	$("#txtClavelogin").val("");
	$("#lastSync").html("-");
	$("#btnStartSyncGet").removeClass("ui-state-disabled");
		$.mobile.changePage("#pgStart");
		window.plugins.toast.showLongBottom('Sesión cerrada correctamente ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		console.log("successLogOff!");
		
 	deleteUserData();
}
	
function checkUpdate(responseJson){

	var jsonResult = jQuery.parseJSON( responseJson );

	console.log("checkUpdate");
	if (jsonResult){
		console.log("update?");
		$("#appUpdate").popup({ transition: "pop" });
		$('#appUpdate').popup("open");


	}else{

			console.log("no update, show legal");
			/*if (noShowMsgSw!=1){
				$("#legalConditions").popup({ transition: "pop" });
				$('#legalConditions').popup("open");
			}*/
	}
}
function clearCache() {
    navigator.camera.cleanup();
}
 function captureStorePhoto() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	  
      navigator.camera.getPicture(onPhotoStoreSuccess, onPhotoFail, { 
	    quality: 80, 
		allowEdit: true,
        destinationType: destinationType.DATA_URL }
		);
	
 }
 
function captureEjecPhoto() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	  clearCache();
      navigator.camera.getPicture(onPhotoEjecSuccess, onPhotoFail, { 
	    quality: 80, 
		allowEdit: true,
       destinationType: destinationType.NATIVE_URI
	   	//destinationType: cordova.file.dataDirectory + "/ejemplos/"
	    }
	   
	   
		);
	
 }
 function onPhotoFail(message) {
      console.log('Failed because: ' + message);
    }
	/*
 function onPhotoStoreSuccess(imageData) {
	 $("#smallImage").attr('src',"css/themes/images/ajax-loader.gif")

	  $("#imgStoreContainer").css({"display": "block"});
	  $("#elReplanLogo").css({"display": "none"});
	  

	   $("#smallImage").attr('src',"data:image/jpeg;base64," + imageData)
     
    }*/
 function onPhotoEjecSuccess(imageData) {

/*	  $("#imgEjecContainer").css({"display": "block"});

	  
		
	   $("#smallImageEjec").attr('src', imageData);
	   alert($("#smallImageEjec").attr('src'));
	   $("#btnUploadEjec").removeClass("ui-state-disabled");*/
	   createFileEntry(imageData);
  

     
    }
function createFileEntry(imageURI) {
	//alert("imageURI==" + imageURI)
	//resolveLocalFileSystemURL 
    window.resolveLocalFileSystemURI(imageURI, copyPhoto, fail);    
	//window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "/ejemplos/", onFileEjecSuccess, onError);
}
function copyPhoto(fileEntry) {
	//alert("fileEntry==" + fileEntry)
	
	
	
   window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "/ejemplos/", function(fileSys) { 
	//alert("fileSys==" + fileSys)
       // fileSys.root.getDirectory("photos", {create: true, exclusive: false}, function(dir) { 
				//alert("dir==" + dir)
                fileEntry.copyTo(fileSys, "file.jpg", onCopySuccess, fail); 
         //   }, fail); 
    }, fail); 
}
function onCopySuccess(entry) {
   alert(entry.fullPath)
}

function fail(error) {
    alert(error.code);
}
function uploadPictureEjec() {
    	
    	// Get URI of picture to upload
		
		
        var img = $("#smallImageEjec");
        var imageURI = $("#smallImageEjec").attr( "src");
		var style=$("#smallImageEjec").css("display");
		
		
//		alert(img);
		//alert(imageURI);
		//style = $("#smallImageEjec").css("display");
        if (!imageURI || (style == "none")) {
            popError( "Tomar foto","Debes tomar una foto antes de guardar la ejecución.");
            return;
        }
		else{
			$("#btnUploadEjec").addClass("ui-state-disabled");
			//$("#btnPictureEjec").addClass("ui-state-disabled");	
		}
        
        // Verify server has been entered
        server = host + "process/upload.php";
        if (server) {
        	
            // Specify transfer options
			$.mobile.loading( "show", {
					text: "Subiendo Foto",
					textVisible: true,
					theme: "a",
					textonly: false,
					html: ""
			});
			
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			pictureName = options.fileName;
            options.mimeType="image/jpeg";
            options.chunkedMode = false;
            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, uploadOkEjec, uploadFailEjec, options);
        }
    }	
var uploadOkEjec = function(r){
			$.mobile.loading( "hide" );
		  // alert("Upload successful: "+r.bytesSent+" bytes uploaded.");  
		   var megas = (r.bytesSent/1024)/1024;
			$('#lblBytesSent').html(megas.toPrecision(3));
			$('#PopEjecConfirmUpload').popup({ transition: "pop" });
			$('#PopEjecConfirmUpload').popup("open");
			$('#PopEjecConfirmUpload').popup({ dismissible: true }) ;
			
			
			
			var jqxhr = $.ajax({
				type: "POST",
				url: host+"process/saveDataEjec.php",
				data: {pictureName:pictureName,cli_id:cli_id,deviceVersion:deviceVersion,deviceModel:deviceModel,coord:coord,visi_id:lastVisitID,chk:$('#chkElement').val(),esta_id:listStores.itemID,elemID:listElements.itemID},						  
				//dataType: "json",
				
				beforeSend: function( xhr ) {
				//console.log("beforeSend addr");
					$.mobile.loading( "show", {
						text: "Actualizando Datos de ejecución",
						textVisible: true,
						theme: "a",
						textonly: false,
						html: ""
					}); 
				}
				})
				.done(function(data) {
				
				
				
				
				})
				.fail(function(jqXHR, textStatus) {
						if(textStatus== 'timeout'){
							popError("Conexión Lenta","La conexión está tomando más tiempo de lo habitual para actualizar los datos de le ejecución. Por favor inténtelo nuevamente.");
						}
						else{
							popError("Error guardando ejecución","Ocurrió un error al guardar los datos de la ejecución, Asegúrese de tener una conexión a internet.");
						}
						
						
						
					})
					.always(function() {
						$.mobile.loading( "hide" );
					 // navigator.app.backHistory();
					
					});

}
var uploadFailEjec = function(error) {
				$.mobile.loading( "hide" );
               // alert( "Upload failed: Code = "+error.code);  
				$('#lblEjecErr').html(error.code);
				$('#popErrorEjecUpload').popup({ transition: "pop" });
				$('#popErrorEjecUpload').popup("open");
				$('#popErrorEjecUpload').popup({ dismissible: true }) 				
				$("#btnUploadEjec").removeClass("ui-state-disabled");
				$("#btnPictureEjec").removeClass("ui-state-disabled");     
				
 }


function saveDataEjecDone(responseJson)	{
	//$.post(host+"process/saveDataEjec.php",fileName,saveDataEjecDone);
	//var jsonResult = jQuery.parseJSON( responseJson );
	console.log("saveDataEjecDone" )
}
function sendCommentSuccess(responseJson){
	var jsonResult = jQuery.parseJSON( responseJson );
	console.log(jsonResult.result);
	if (jsonResult.result){
		$('#txtSubject').val("");
		$('#txtMessage').val("");
		$.mobile.loading( "hide" );
		window.plugins.toast.showLongBottom('Comentario enviado correctamente ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		navigator.app.backHistory();
	}
	else{

	}	
}
function alertDismissed() {
            // do something
		//$.mobile.changePage( "#pgOfflineStaring" );
}
function popError(titleMsg, errorMsg) {
//	$( document ).ready(function() {
     	
		console.log("ready to flow");
		//navigator.notification.alert(errorMsg);
		
		navigator.notification.alert(
            errorMsg,  // message
            alertDismissed,         // callback
            titleMsg,            // title
            'Aceptar'                  // buttonName
        );
		/*$('.ui-popup').popup('close');		
		$('#errorDesc').html(errorMsg);
		$('#popError').popup({ transition: "pop" });
		$('#popError').popup("open");
		$('#popError').popup({ dismissible: true }) ;*/
	//});
}

function drawMapStore(latlng) {
		//alert(latlng);
		//pos = markerEst.getPosition()
		local_long=latlng.lng();
		local_lat=latlng.lat();
		var myStyles =[
			{
				featureType: "poi",
				elementType: "labels",
				stylers: [
					  { visibility: "off" }
				]
			},
			{
				featureType: "landscape",
				elementType: "all",
				stylers: [
					  { visibility: "off" }
				]
			}
			
		];
		
       var myOptions = {
            zoom: 15,
            center: latlng,
			disableDefaultUI: true,
			panControl: false,
			scaleControl: false,
			styles: myStyles,
			zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
			
        };
		var mapEst = new google.maps.Map(document.getElementById("map-canvas-store"), myOptions);
		
		 $('<div/>').addClass('centerMarker').appendTo(mapEst.getDiv()).click(function(){
               var that=$(this);
			  // $("#smallTip").fadeTo(100, 0.1).fadeTo(200, 1.0);
               if(!that.data('win')){
                //that.data('win',new google.maps.InfoWindow({content:'Mueve el mapa para precisar tu dirección'}));
                //that.data('win').bindTo('position',map,'center');
               }
              // that.data('win').open(map);
            });
		
		
		markerEst = new google.maps.Marker({
            position: latlng,
            map: mapEst,
			icon:/*"images/pinExtended.png"*/new google.maps.MarkerImage('images/graypin.png',
    null, null, null, new google.maps.Size(40,54)),
			'draggable': true
/*			animation: google.maps.Animation.DROP,*/
           
        });
		google.maps.event.addListener(markerEst, 'dragend', function () {
			//marker = map.getCenter();
			//geocodePosition(markerEst.getPosition());
			//alert(map.getCenter());
			pos = markerEst.getPosition()
			local_long=pos.lng();
			local_lat=pos.lat();
			mapEst.panTo(markerEst.getPosition());
			markerEst.setAnimation(null);

		});
		google.maps.event.addListener(mapEst, 'dragend', function () {
			//marker = map.getCenter();
			//marker.setAnimation(null);
			markerEst.setPosition(mapEst.getCenter());
			pos = markerEst.getPosition()
			local_long=pos.lng();
			local_lat=pos.lat();
			//geocodePosition(markerEst.getPosition());
			
		});
		google.maps.event.addListener(markerEst, 'zoom_changed', function () {
	
				markerEst.setPosition(mapEst.getCenter());
				//geocodePosition(markerEst.getPosition());
	
		});
		console.log("NEW MARKER" + markerEst);
		google.maps.event.trigger(markerEst, 'resize');
}
function initPushwoosh()
{
	var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
 
    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;
                                 
        if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
                                     
        alert(title);
    });
 
    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_NUMBER", pw_appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
      pushNotification.onDeviceReady({ projectid: "529724072333", appid : "6949C-16F50" });
//    pushNotification.onDeviceReady({ projectid: "GOOGLE_PROJECT_NUMBER", pw_appid : "PUSHWOOSH_APP_ID" });
 
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
	
	
}
function deleteUserData(){
	try{
	db.transaction(function(tx) {
		tx.executeSql("delete from campana", [], function(tx, res) {});
	});
	db.transaction(function(tx) {
		tx.executeSql("delete from conf_campana_estaclasi", [], function(tx, res) {});
	});
	db.transaction(function(tx) {
		tx.executeSql("delete from conf_elemento_ejecucion", [], function(tx, res) {});
	});
	db.transaction(function(tx) {
		tx.executeSql("delete from ejecucion_foto", [], function(tx, res) {});
	});
	db.transaction(function(tx) {
		tx.executeSql("delete from establecimiento", [], function(tx, res) {});
	});
	db.transaction(function(tx) {
		tx.executeSql("delete from visitas", [], function(tx, res) {});
	});
	}
	catch(err){
		popError("Error al borrar las tablas","Ocurrió un error al vaciar la base de datos")
	}
	try{
		window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "/ejemplos/", onFileSystemSuccess, onError);
		
		function onFileSystemSuccess(fileSystem){
			var directoryReader = fileSystem.createReader();
			directoryReader.readEntries(readerSuccess,null);
		}		
		function readerSuccess(entries){
				for (i=0; i<entries.length; i++) {
					console.log("ARCHIVO=" + entries[i].name);		
					entries[i].remove(successDel, failDel);
				}
		}
		function onError(error){
			console.log("ERROR");
		}
		function successDel(){
			console.log(" ARCHIVO ELIMNADO");
		}
		function failDel(error){
			console.log(" ERROR ELIMNADO ARCHIVO " + error);
		}	
	}
	catch(err){
		popError("Error al borrar las imagenes","Ocurrió un error al eliminar las imágenes de ejemplos")
	}
	
}
function downloadFile(remoteFile) {
	var deferreds = [];
/*	if (remoteFiles.length == 0) {
        return;
    }*/
    
   // var remoteFile = remoteFiles.pop();
	var localFileName = cordova.file.dataDirectory + "/ejemplos/"+ remoteFile.substring(remoteFile.lastIndexOf('/')+1);
//	 deferreds.push(
	var fileTransfer = new FileTransfer();
		/*var uri = encodeURI(host + "images/sampleEjecPics/" + data);
		var localFileName;	*/	
		fileTransfer.download(
			remoteFile,
			localFileName,
			function(entry) {
				//downloadFile();
				deferreds.push(entry.fullPath)
				console.log("download complete: " + entry.fullPath);
			},
			function(error) {

				console.log("download error source " + error.source);
				console.log("download error target " + error.target);
				console.log("upload error code" + error.code);
			},
			false,
			{
				headers: {
					"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
				}
			}
		);
	//)
	return deferreds;
	
   /* if (remoteFiles.length == 0) {
        return;
    }
    
    var remoteFile = remoteFiles.pop();
    var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
            var localPath = fileEntry.fullPath;
            if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                localPath = localPath.substring(7);
            }
            var ft = new FileTransfer();
            ft.download(remoteFile, localPath, function(entry) {
                // Do what you want with successful file downloaded and then 
                // call the method again to get the next file
                downloadFile();
            }, fail);
        }, fail);
    }, fail); */
}
function getTimeStamp(solofecha){
	
var d = new Date();
var hour = d.getHours()
var minutes = d.getMinutes()
var second = d.getSeconds()
var month = d.getMonth()+1;
var day = d.getDate();
var time = ((''+hour).length<2 ? '0' : '')  +  hour + ":" + ((''+minutes).length<2 ? '0' : '')  + minutes +":" + ((''+second).length<2 ? '0' : '')+ second;
var date = d.getFullYear() + '-' +  ((''+month).length<2 ? '0' : '') + month + '-' +  ((''+day).length<2 ? '0' : '') + day;

if (!solofecha){
	return (date + " " + time);	
}
else{
	return (date);	
}
}


function drawMap(latlng) {
		//alert(latlng);
		//pos = markerEst.getPosition()
		
		
		var origin = latlng;
		originMe = origin
		//var 		destinations
		
		
		var myStyles =[
			{
				featureType: "poi",
				elementType: "labels",
				stylers: [
					  { visibility: "off" }
				]
			},
			{
				featureType: "landscape",
				elementType: "all",
				stylers: [
					  { visibility: "off" }
				]
			}
			
		];
		
       var myOptions = {
            zoom: 14,
            center: latlng,
			disableDefaultUI: true,
			panControl: false,
			scaleControl: false,
			styles: myStyles,
			zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
			
        };
		mapPoints = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
		var trafficLayer = new google.maps.TrafficLayer();
		trafficLayer.setMap(mapPoints);
		var bounds = new google.maps.LatLngBounds();
		
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(mapPoints);
      //  var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
		
		var refreshControlDiv = document.createElement('div');
		var refreshControl = new RefreshControl(refreshControlDiv, mapPoints);
		
		 refreshControlDiv.index = 1;
		 mapPoints.controls[google.maps.ControlPosition.TOP_RIGHT].push(refreshControlDiv);
		 
		
		markerEst = new google.maps.Marker({
            position: latlng,
            map: mapPoints,
			icon:/*"images/pinExtended.png"*/new google.maps.MarkerImage('images/mepin.png',
    null, null, null, new google.maps.Size(40,40)),
			'draggable': false
/*			animation: google.maps.Animation.DROP,*/           
        });
		
		var contentString = '<div id="contentmi"><b>Mi Ubucación</b></div>';
		var infowindow = new google.maps.InfoWindow({
				content: contentString
		});
		
		google.maps.event.addListener(markerEst, 'click', function() {
					  infowindow.open(mapPoints,markerEst);
		});
		bounds.extend(latlng); 
		local_long=latlng.lng();
		local_lat=latlng.lat();
		
		
		
//		points.push("Kiwi");

		db.transaction(function(tx) {
		tx.executeSql("SELECT  establecimiento.esta_id, establecimiento.establecimientocol, establecimiento.establecimiento_direccion, propietario, telefono, estclasi_nombre, establecimiento_lat, establecimiento_long FROM  establecimiento order by establecimiento.establecimientocol asc", [], function(tx, res) {
			var points = [];
		 var esta_id
		 var nombre
		 var direccion
		 var clasificacion
		 var lvStores = "";
		 //var ultimaVisita;
		 var color
		 var establecimiento_lat
		var establecimiento_long
		
        
		
		
			
		 for (var i = 0; i < res.rows.length; i++) {
			esta_id = res.rows.item(i).esta_id;
			nombre = res.rows.item(i).establecimientocol;
			direccion = res.rows.item(i).establecimiento_direccion;
			clasificacion = res.rows.item(i).estclasi_nombre;
			establecimiento_lat = res.rows.item(i).establecimiento_lat;
			establecimiento_long = res.rows.item(i).establecimiento_long;
			
			switch (clasificacion.toLowerCase()){
			case "duro": color="red";
						 break;
			case "teso": color="orange";
					 break;
			case "reteso": color="yellow";
					 break;
			}
			
			points.push({"esta_id":esta_id,"latitude":establecimiento_lat,"longitude":establecimiento_long, "title":"<h3 class='ui-title' >" + nombre + "<\/h3><p><b>Direcci&oacute;n: <\/b>" + direccion + "<\/p>"});
			//console.log("ROW= " + esta_id + " " + nombre + " " + direccion);
			//lvStores += "<li data-icon='eye'><a id='u-" + esta_id + "' href='#'>";
			//lvStores += "<h2>" +nombre +"</h2>";
			//lvStores += "<p><strong>ID: </strong> "  + esta_id + "</p>";
			//lvStores += "<p><strong>Dirección: </strong> "  + direccion + "<br><small style='color:" + color + "'>[" + clasificacion + "]</small></p></a></li>";
			
//			console.log("lvStores= " + lvStores);
			}
			//JSONmarkers = [];
			JSONmarkers = {"markers":points}
			//JSONmarkers = JSON.stringify(JSONmarkers)
			console.log("stringify=" + JSONmarkers);
			
			});	
		});	
			
		//console.log(host + 'process/storesGeoposition.php?lat='+local_lat+'&long=' + local_long + "&storeType=" + storeType);
		if(JSONmarkers.length==0){
			popError("No se cargaron puntos","No se encontraron puntos en el mapa \n\nPor favor intentalo nuevamente")
		}
		else{
			$.each(JSONmarkers, function(i, item) {
				//	alert(markers.length)
				//console.log(markers[i].esta_id);
				destinations  = [];
				var infowindow = null;
				latlng = new google.maps.LatLng( JSONmarkers[i].latitude,JSONmarkers[i].longitude);			
				destinations.push(latlng);
							
				bounds.extend(latlng);
				
				
				
				//markerText = getRoutDetail(origin,latlng)
				//alert($("#infoDistance").html());
				//alert("ciclo")
				/*
				var imgPin;
				if (marker.label=="0"){
					imgPin  = 'images/redpin.png';
					 
				}
				if (marker.label=="1"){
					imgPin  = 'images/cxpin.png';
				}*/
				
				var markerSt = new google.maps.Marker({
					position: latlng,
					map: mapPoints,
					icon:new google.maps.MarkerImage("images/redpin.png",null, null, null, new google.maps.Size(40,40)),
					title: JSONmarkers[i].title ,
					// label: marker.label,
					//animation: google.maps.Animation.DROP,
					
				});
				
				 infowindow = new google.maps.InfoWindow({
							content: "holding..."
	
				  });
				
				
				google.maps.event.addListener(markerSt, 'click', function() {
						//showLoading("Calculando ruta")
						$.mobile.loading( "show", {
							text: "Calculando ruta",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
						//openInfo(this.title, i)
						
						
					});
					
				
			
				mapPoints.fitBounds(bounds);
				
				});
				
				//markerSt.setMap(null);	
				
					 
					
	
				
				
				var directionsService = new google.maps.DirectionsService();
				var colors = ["#D80073","#0050EF","#00ABA9"];
				$.each(destinations, function( k, d ) {
					//alert(k)
					console.log( "Origen: " + origin + ",Index: " + k + ", Destino: " + d );
	
					
					var request = {
						'origin': origin,
						destination: d,
						travelMode: google.maps.TravelMode.DRIVING
					};
					var rendererOptions = {
						preserveViewport: true,         
						suppressMarkers:true,
						polylineOptions:{strokeColor:colors[k]}
					};
					var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
					
				
					directionsService.route(request, function(result, status) {
						console.log(result);
			
						if (status == google.maps.DirectionsStatus.OK) {
							directionsDisplay.setMap(mapPoints);
							directionsDisplay.setDirections(result);
							//alert(result.distance.text)
							//showSteps(result);
						}
						
					});
					
					
					
					//stepDisplay = new google.maps.InfoWindow();
					/*
					function showSteps(directionResult) {

				  var myRoute = directionResult.routes[0].legs[0];
				
				  for (var i = 0; i < myRoute.steps.length; i++) {
					var marker = new google.maps.Marker({
					  position: myRoute.steps[i].start_location,
					  map: mapPoints,
					  icon:new google.maps.MarkerImage('images/indication.png',
		null, null, null, new google.maps.Size(13,12))
					});
					attachInstructionText(marker, myRoute.steps[i].instructions);
					markerArray[i] = marker;
				  }
				}
				
				function attachInstructionText(marker, text) {
				  google.maps.event.addListener(marker, 'click', function() {
					// Open an info window when the marker is clicked on,
					// containing the text of the step.
					stepDisplay.setContent(text);
					stepDisplay.open(mapPoints, marker);
				  });
				}*/
			
					
				});
			
		}
			google.maps.event.trigger(mapPoints, 'resize');
}
		
		
		

		/*
		$.getJSON( host + 'process/pointsGeoposition.php?lat='+local_lat+'&long=' + local_long + "&city=" + city + "&pointId=" + pointId, function(data) {
		
		
		if(data.markers.length==0)
			msgPop("No se cargaron puntos","No se encontraron puntos en el mapa \n\nPor favor intentalo nuevamente","Aceptar")
		destinations  = [];
		$.each( data.markers, function(i, marker) {
			//alert(i)
			//alert(marker.title)
			//alert(marker.label);
			var infowindow = null;
			latlng = new google.maps.LatLng( marker.latitude,marker.longitude);			
			destinations.push(latlng);
						
			bounds.extend(latlng);
			
			
			
			//markerText = getRoutDetail(origin,latlng)
			//alert($("#infoDistance").html());
			//alert("ciclo")
			var imgPin;
			if (marker.label=="0"){
				imgPin  = 'images/redpin.png';
				 
			}
			if (marker.label=="1"){
				imgPin  = 'images/cxpin.png';
			}
			
			var markerSt = new google.maps.Marker({
				position: latlng,
				map: mapPoints,
				icon:new google.maps.MarkerImage(imgPin,null, null, null, new google.maps.Size(40,40)),
				title: marker.title ,
				// label: marker.label,
				//animation: google.maps.Animation.DROP,
				
			});
			
			 infowindow = new google.maps.InfoWindow({
						content: "holding..."

			  });
			
			
			google.maps.event.addListener(markerSt, 'click', function() {
	 				showLoading("Calculando ruta")
					openInfo(this.title, i)
					//	infowindow.setContent(this.title);
					//	infowindow.open(mapPoints, this);

					
				});
				
			
		
			mapPoints.fitBounds(bounds);
			
			});
			
			//markerSt.setMap(null);	
			
				 
				

			
			
			var directionsService = new google.maps.DirectionsService();
			var colors = ["#D80073","#0050EF","#00ABA9"];
			$.each(destinations, function( k, d ) {
				//alert(k)
 			 	console.log( "Origen: " + origin + ",Index: " + k + ", Destino: " + d );

				
				var request = {
					'origin': origin,
					destination: d,
					travelMode: google.maps.TravelMode.DRIVING
				};
				var rendererOptions = {
					preserveViewport: true,         
					suppressMarkers:true,
					polylineOptions:{strokeColor:colors[k]}
				};
				var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
				
			
				directionsService.route(request, function(result, status) {
					console.log(result);
		
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setMap(mapPoints);
						directionsDisplay.setDirections(result);
						//alert(result.distance.text)
						//showSteps(result);
					}
					
				});
				
				
				
				//stepDisplay = new google.maps.InfoWindow();
				
				function showSteps(directionResult) {
			  // For each step, place a marker, and add the text to the marker's
			  // info window. Also attach the marker to an array so we
			  // can keep track of it and remove it when calculating new
			  // routes.
			  var myRoute = directionResult.routes[0].legs[0];
			
			  for (var i = 0; i < myRoute.steps.length; i++) {
				var marker = new google.maps.Marker({
				  position: myRoute.steps[i].start_location,
				  map: mapPoints,
				  icon:new google.maps.MarkerImage('images/indication.png',
    null, null, null, new google.maps.Size(13,12))
				});
				attachInstructionText(marker, myRoute.steps[i].instructions);
				markerArray[i] = marker;
			  }
			}
			
			function attachInstructionText(marker, text) {
			  google.maps.event.addListener(marker, 'click', function() {
				// Open an info window when the marker is clicked on,
				// containing the text of the step.
				stepDisplay.setContent(text);
				stepDisplay.open(mapPoints, marker);
			  });
			}
		
				
			});
		
	});
		*/
		
		
		
		

function RefreshControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  //controlUI.id = "refreshPosition";
  controlUI.style.backgroundColor = '#002E6E';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderRadius = '5px';
  controlUI.style.borderWidth = '1px';
    controlUI.style.width = '100%';
  controlUI.style.borderColor = '#0000CC';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to set the map to Home';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '14px';
  controlText.style.color = '#000000';
  controlText.style.textShadow = '1px 1px 0px #FFFFFF';
   // controlText.style.fontColor = '#000000';
  controlText.style.paddingLeft = '8px';
  controlText.style.paddingRight = '8px';
  controlText.style.paddingTop = '7px';
  controlText.style.paddingBottom = '8px';
  controlText.innerHTML = '<img src="css/themes/images/icons-png/refresh-white.png" >';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    $( "#refreshPosition" ).click();
  });

}