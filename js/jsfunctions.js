// Wait for device API libraries to load

var host="http://axdigital.com.co/dps/app/capturalocal/";	
var cli_id="";
var cli_nombre="";
var listStores = {
    itemID : null
}
var currentTab;
var listElements = {
    itemID : null
}
var remoteFiles = [];
//var deferreds;
var deferredsCamp;
var watchId = "";
var currentVersionApp ="";
var pictureSource;   // picture source
var pictureName   // picture source
 var destinationType; // sets the format of returned value
var deviceModel = "";
var deviceVersion = "";
var site="";
var cates_id="";
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
var deferreds  = [];
var distanceText = "";
var durationText = "";
var markerText = "";
var localFileName = "";
var picToUpload = [];
var id_usuario='';
var outnumg = '';
var tipoPhoto='';
var lSync;
var fototomada1;
var fototomada2;
var fototomada3;
var fototomada4;
var fototomada5;
var fototomada6;
var fototomada7;
var fototomada8;
var estasync = 0;
var fotossync = 0;
var estatotal = 0;
var fotototal = 0; 

	 var date = new Date();
 
// GET YYYY, MM AND DD FROM THE DATE OBJECT
var yyyy = date.getFullYear().toString();
var mm = (date.getMonth()+1).toString();
var dd  = date.getDate().toString();
 
// CONVERT mm AND dd INTO chars
var mmChars = mm.split('');
var ddChars = dd.split('');
 
// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
var fecha = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);

//var deviceName = "";
//var secs=10;
//var interval;
 function onBodyLoad() {
	 console.log("onBodyLoad");
	document.addEventListener("deviceready", onDeviceReady, false);
 }
    

    
	
	
    //
    function onDeviceReady() {
		document.addEventListener("offline", onOffline, false);
		document.addEventListener("online", onOnline, false);
		
		
		// device APIs are available
	//	alert(cordova.file.externalRootDirectory + 'imgcapturalocal/');
	/*	
	var sftp        = new JJsftp("axdigital.co", "axdigita", "QsJ4guBQNkg8"),
    localPath   = cordova.file.externalRootDirectory + 'imgcapturalocal'
    filelist    = [{
          remote    : "/home/axdigita/public_html/dps/app/capturalocal/images/ftp/Diapositiva70.JPG"
        , local     : localPath+"Diapositiva70.JPG"
    },
	{
          remote    : "/home/axdigita/public_html/dps/app/capturalocal/images/ftp/Diapositiva69.JPG"
        , local     : localPath+"Diapositiva69.JPG"
    }
	];
 	
    sftp.downloadList(filelist, function(data){
        
		alert(data.success)
    }, function(error){
		alert(error.message)
        
    });*/

		
		try{
	queryLocalUsr();
	console.log('Entro al try');
	  }
	catch(err){
		conexion = false;
		$.mobile.changePage( "#pgProblemaConexion" );
		console.log("Error: " + err + ".");
	}
	
	//// base de datos 
	 var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
     db.transaction(populateDB, errorCB, successCB);
	
	// creacion de tables 
		function populateDB(tx) {
			//tx.executeSql('DROP TABLE IF EXISTS updatedate');
			tx.executeSql('CREATE TABLE IF NOT EXISTS updatedate (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha DATETIME NOT NULL, idremoto INTEGER NOT NULL,modulo TEXT)');
			
			//tx.executeSql('DROP TABLE IF EXISTS pdv_coke');
			tx.executeSql('CREATE TABLE IF NOT EXISTS pdv_coke (id INTEGER PRIMARY KEY AUTOINCREMENT , fecha TEXT NOT NULL, canal TEXT,outloc TEXT,desguc TEXT, outnum TEXT, negocio TEXT, cliente TEXT,direccion TEXT, barrio TEXT, telefono1 TEXT, nombre_contacto TEXT,  cedula TEXT, direcion_nueva TEXT, telefono1_nuevo TEXT, telefono2 TEXT, mail TEXT, frio_propio TEXT, rack_coke TEXT, punta_gondola TEXT, lineal TEXT, nevera_postobon TEXT, num_puerta_postobon TEXT, nevera_bavaria TEXT, num_puerta_bavaria TEXT, negocio_esquinero TEXT, domicio TEXT, sync TEXT, fecha_sync DATE, log_actual TEXT, lat_actual TEXT, lat_nueva TEXT, log_nueva TEXT, status TEXT, porqueno TEXT, instalo TEXT, interes TEXT, observacion TEXT)');
			
			
			//tx.executeSql('INSERT INTO pdv_coke (id, fecha, negocio) VALUES (1, "2016-02-17 06:51:03", "prueba")');
			
			//tx.executeSql('DROP TABLE IF EXISTS fotografia');
			tx.executeSql('CREATE TABLE IF NOT EXISTS fotografia (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha DATETIME NOT NULL, outnum TEXT ,tipo TEXT, foto_nombre TEXT , sync TEXT, fecha_sync DATE)');
			
			
		//	tx.executeSql('ALTER TABLE pdv_coke ADD COLUMN  observacion TEXT');
		/*	tx.executeSql('DROP TABLE IF EXISTS tipo_fotografia');
			tx.executeSql('CREATE TABLE IF NOT EXISTS tipo_fotografia (id_foto INTEGER PRIMARY KEY , fotografia TEXT)');
			tx.executeSql('INSERT INTO tipo_fotografia (id, fotografia) VALUES (1, "Fachada")');
			tx.executeSql('INSERT INTO tipo_fotografia (id, fotografia) VALUES (2, "Nevera KOF")');
			tx.executeSql('INSERT INTO tipo_fotografia (id, fotografia) VALUES (3, "Nevera PTBN")');
			tx.executeSql('INSERT INTO tipo_fotografia (id, fotografia) VALUES (4, "Nevera Bavaria")');
			tx.executeSql('INSERT INTO tipo_fotografia (id, fotografia) VALUES (5, "Nevera Propia")');
			tx.executeSql('INSERT INTO tipo_fotografia (id, fotografia) VALUES (6, "Mostrador / Punto de")');
			tx.executeSql('INSERT INTO tipo_fotografia (id, fotografia) VALUES (7, "Estanteria")');
			tx.executeSql('INSERT INTO tipo_fotografia (id, fotografia) VALUES (8, "Racks adicionales")');*/
			

		}
		

    // Transaction error callback
    //
    function errorCB(tx, err) {
  //      alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
       // alert("success!");
    }


	/// fin de base de datos 
		
		//alert(db);
		checkConnection();		
		deviceModel = device.model;
		deviceVersion = device.version;
		//initPushwoosh();
		
		pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
		
		//var db = window.sqlitePlugin.openDatabase({name: "elreplantigo.db", createFromLocation: 1});
		//alert("onDeviceReady");
		
		//deviceName = device.name;
		//alert(deviceModel);	
		//alert(deviceVersion);	
//		alert(deviceName);	
		document.addEventListener("offline", onOffline, false);
		document.addEventListener("online", onOnline, false);	
		queryLocalUsr();

		cordova.getAppVersion().then(function (versionNumber) {
			currentVersionApp = versionNumber;
			$("#version,#version2").text("Versión: " + versionNumber);
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
							   
								   navigator.app.backHistory()
						
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
		
		
		//window.plugins.toast.showLongBottom('Bienvenido ' + cli_nombre, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		new $.nd2Toast({ // The 'new' keyword is important, otherwise you would overwrite the current toast instance
				message : "Bienvenido " + cli_nombre, // Required
				ttl : 6000 // optional, time-to-live in ms (default: 3000)
			});
			
		console.log("success!");

}
function localStorageFcn(){
		try{
			localStorage.setItem("id", cli_id);
			localStorage.setItem("name", cli_nombre);
			localStorage.setItem("idUser", id_usuario);	
				
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
		}
		else{
			
			cli_id= localStorage.getItem("id");
			cli_nombre =localStorage.getItem("name");
			id_usuario = localStorage.getItem("idUser");
			//
			if (localStorage.getItem("lastSync")){
				$("#lastSync").html(localStorage.getItem("lastSync"));
			}
			//$("#lbDocumento").html(cli_id);
			//$("#lbNombre").html(cli_nombre);
			//$("#lbPuntos").html("0");
		
			console.log("LOCAL VARIABLES")
			console.log(cli_id);
			console.log(cli_nombre)

			

			$("#userWelcome").html(cli_nombre)
			$.mobile.changePage("#pgSyncStart");
			//$.mobile.changePage("#pgWelcome");
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
		//console.log("nombre"+cli_nombre);
		localStorageFcn();
		
		$("#userWelcome").html(cli_nombre)
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
		successLogOff()
		
	}
function successLogOff() {
	//	var db = window.sqlitePlugin.openDatabase("consumidor", "1.0", "Polapp Consumidor", 200000);
	//	db.transaction(queryUSR, errorCB);
	$("#txtDocLogin").val("");
	$("#txtClavelogin").val("");

		$.mobile.changePage("#pgStart");
//		window.plugins.toast.showLongBottom('Sesión cerrada correctamente ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    campLoaded = false;
	//new $.nd2Toast({ // The 'new' keyword is important, otherwise you would overwrite the current toast instance
	//	message : "Sesión cerrada correctamente", // Required
	//	ttl : 5000 // optional, time-to-live in ms (default: 3000)
	//});
	deleteUserData();
		console.log("successLogOff!");
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
 
function captureEjecPhoto() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	  clearCache();
      navigator.camera.getPicture(getImageURI, onPhotoFail, { 
	    quality: 70, 
		allowEdit: false,
        destinationType: destinationType.FILE_URI
		}
		);
	
 }
 function onPhotoFail(message) {
      console.log('Failed because: ' + message);
    }

function getImageURI(imageURI) {
        var gotFileEntry = function (fileEntry) {
//        alert("got image file entry: " + fileEntry.fullPath);
		var id1 = localStorage.getItem("IDphoto");
		var id2 = localStorage.getItem("localoutnum");
  
		localFileName = ""+id2+"-"+id1+".jpg";
		

		/* revisar el tipo de foto tipoPhoto */
		
		switch(id1){
		 	case 'tphoto-1':
		 		tipoPhoto = '1';
			break;	
			case 'tphoto-2':
		 		tipoPhoto = '2';
			break;	
			case 'tphoto-3':
		 		tipoPhoto = '3';
			break;	
			case 'tphoto-4':
		 		tipoPhoto = '4';
			break;	
			case 'tphoto-5':
		 		tipoPhoto = '5';
			break;
			case 'tphoto-6':
		 		tipoPhoto = '6';
			break;		
			case 'tphoto-7':
		 		tipoPhoto = '7';
			break;	
			case 'tphoto-8':
		 		tipoPhoto = '8';
			break;	
		}
		
		/* fin de la revision de foto */
         var gotFileSystem = function (fileSystem) {
         fileSystem.root.getDirectory('imgcapturalocal', {
                    create: true
                }, function (dataDir) {
                    fileName = localFileName;
                    fileEntry.moveTo(dataDir, fileName, fsSuccess, fsFail);
                }, dirFail);

            };
            // get file system to copy or move image file to
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fsFail);
        };
        // resolve file system for image
        window.resolveLocalFileSystemURI(imageURI, gotFileEntry, fsFail);
		

		 var fsSuccess = function (entry) {
            console.log("fsSuccess");
			 
			 //alert(cordova.file.externalRootDirectory + entry.fullPath)
			 
			$("#imgStoreContainer").css({"display": "block"});
			$("#smallImage").attr('src',cordova.file.externalRootDirectory + entry.fullPath);
			
			//alert(tipoPhoto);
			now = getTimeStamp(false)
			var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
			db.transaction(function(tx) {
					tx.executeSql("INSERT INTO fotografia (fecha,outnum,tipo, foto_nombre) VALUES (?,?,?,?) ",[now, localStorage.getItem("localoutnum"), localFileName,tipoPhoto ] , function(db, res) {
						
						/*{pictureName:pictureName,cli_id:cli_id,deviceVersion:deviceVersion,deviceModel:deviceModel,coord:coord,visi_id:lastVisitID,chk:$('#chkElement').val(),esta_id:listStores.itemID,elemID:listElements.itemID},	*/
						window.plugins.toast.showLongBottom('Foto Guardada correctamente ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
						$.mobile.changePage( "#pgViewPhotos" );	
						
						//$("#btnUploadEjec").removeClass("ui-state-disabled");
						//navigator.app.backHistory();
						
					});
				});
			//navigator.camera.cleanup();
			//alert($("#smallImage").attr( "src"))
 			//uploadPictureEjec();
			
        };
        // file system fail
        var fsFail = function (error) {
			popError("Error guardando foto","Ocurrió un error al intentar guardar la foto en su dispositivo.\n\nError: " + error.code);
         //   alert("failed with error code: " + error.code);

        };

        var dirFail = function (error) {
           // alert("Directory error code: " + error.code);
		   popError("Error creando directorio","Ocurrió un error al intentar crear el directorio en su dispositivo.\n\nError: " + error.code);

        };
    }
	
 function onPhotoStoreSuccess(imageData) {
	$("#smallImage").attr('src',"css/themes/images/ajax-loader.gif")
   	$("#smallImage").attr('src',"data:image/jpeg;base64," + imageData);
	
	
	
	//alert(imageData);
    uploadPictureEjec()
    }

function uploadPictureEjec() {
        var img = $("#smallImage");
        var imageURI = $("#smallImage").attr( "src");
		var style=$("#smallImage").css("display");


	//	alert(imageURI);
	//	alert(style);
		pageId = $('body').pagecontainer('getActivePage').attr("id");
		
		if (pageId!="pgViewPhotos"){
			$.mobile.changePage( "#pgViewPhotos" );	
		}
		else{
			$("#pgViewPhotos").trigger('pageshow');
		}

	
	      
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
            zoom: 17,
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
        popError("Notificación",title);                            
       // alert(title);
    });
 
    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_NUMBER", pw_appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
      pushNotification.onDeviceReady({ projectid: "529724072333", appid : "79EBE-8EF45" });
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

/////// function para la sync data

function updatesyncPdv(){
		try{
		$.ajax({
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
						
						/*IINIICAR SYNC establecimiento*/
						$.each(data, function (key, items) {
							console.log("key=" + key);
							
							$.each(items, function (index, data) {
								console.log("index=" + index + ' * data='+ data);
								stores.push(data);
							})
							if (stores[0]){
								//alert('stores' +stores);
								/// definicion de varibles
								
								SoccerPlayerList  += "<li data-icon='eye'><a class='btnLi' id='" + items.outnum + "' href='#'>";
								SoccerPlayerList  += "<h2>" + items.negocio +"</h2>";
								SoccerPlayerList  += "<p><strong>outnum: </strong> "  + items.outnum +" <strong>teléfono: </strong> "+ items.telefono1 +"</p>";
								SoccerPlayerList  += "<p><strong>Dirección: </strong> "  +items.direccion + "</p></a></li>";
								
								var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
								db.transaction(queryDB1, errorCB, successCB);
								
								function queryDB1(tx){
									tx.executeSql("INSERT INTO pdv_coke (fecha,canal,outloc,desguc,outnum,negocio,cliente,direccion,barrio,telefono1,log_actual, lat_actual) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[items.fecha, items.canal,items.outloc,items.desguc,items.outnum,items.negocio,items.cliente,items.direccion,items.barrio,items.telefono1,items.log_actual,items.lat_actual] , function(db, res) {
								//alert("insertId: " + res.insertId + " -- probably 1");
								//alert("rowsAffected: " + res.rowsAffected + " -- should be 1");
								
								/// crear el listview
								
								
								});
							//alert(SoccerPlayerList);
							$("#SoccerPlayerList").html(SoccerPlayerList);
							$("#SoccerPlayerList").listview("refresh");
							$("#SoccerPlayerList").show();
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
						//syncStatus = false;
						$("#BtonSyncSys").show();
						if(textStatus== 'timeout'){
						popError("Conexión Lenta","La conexión está tomando más tiempo de lo habitual para cargar los establecimientos. \n\nPor favor inténtelo nuevamente.");
						}
						else{
							popError('Sin datos','No pudimos cargar datos de establecimientos. \n\nAsegúrse de estar conectado a internet e inténtelo nuevamente.');
						}					
				  })
				  .always(function() {
					  $.mobile.loading( "hide" );
				  })
		}
	catch(err){
		alert('Error');
		}
}

////// end of function sync
function deleteUserData(){
	/*try{
		var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
	db.transaction(function(tx) {
		tx.executeSql("delete from pdv_coke", [], function(tx, res) {});
	});
	
	}
	catch(err){
		popError("Error al borrar las tablas","Ocurrió un error al vaciar la base de datos")
	}*/

	
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


function  uploadData(){
	
//// subir solo establecimiento 

	$.mobile.loading( "show", {
		text: "Leyendo datos del dispositivo",
		textVisible: true,
		theme: "a",
		textonly: false,
		html: ""
	});
	
	//// conexion a la base de datos 
	
	var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
	
	
	/// pdv
	db.transaction(function(tx) {
		var countSynced = 0
		var dataSynced = false;
		var sql = "";
	
		tx.executeSql("SELECT * FROM pdv_coke where status='1' and sync is null", [], function(tx2, res) {
			//alert(res.rows.item(0).observacion);
			
			estatotal = res.rows.length; 
			if(res.rows.length>0){
				for (var i = 0; i < res.rows.length; i++){
				var deferredsStores = GetStoresDeferred(res, i);
				
				$.when.apply(null, deferredsStores).done(function() {
			
				 $.when($.ajax({
					method: "GET",
					url: host + 'process/lite/uploadStores1.php' ,
					data: {"sqls": JSON.stringify(deferredsStores),"cli_id":id_usuario},
					dataType:"json",
					beforeSend: function( xhr ) {
						
						$.mobile.loading( "show", {
							text: "Subiendo información de establecimientos",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
					  }
				})
				.done(function(data) {
					if (data.result){
						if (data.count>0){
							db.transaction(function(tx3) {
								var now = getTimeStamp(false)
								tx3.executeSql("update pdv_coke set sync='1', fecha_sync = '" + now + "' where status='1' ", [], function(tx4, res3){
									estasync = i;
									$.mobile.loading( "show", {
										text: i + " establecimiento subido al servidor",
										textVisible: true,
										theme: "a",
										textonly: false,
										html: ""
									}); 
									
								})
							});
						}else{
							syncStatus = false
							popError('Proceso fotos','No hay Pdv Para sincronizar');
						
						}
					}
				})
				.fail(function(jqXHR, textStatus) {
					syncStatus = false
					popError('Sin datos','No pudimos subir la información de establcimientos. \n\nAsegúrse de estar conectado a internet e inténtelo nuevamente. --');
				})
				//// cerrrar el when 
				
				)
			
			});
			
			}
			}else{
				//$.mobile.loading( "hide");	
				$.mobile.loading( "show", {
					text: "No hay Pdv para Sincronizar",
					textVisible: true,
					theme: "a",
					textonly: false,
					html: ""
				}); 
			}
		});

//// fin de la subida que establecimiento 
	});
	
	
	/// fotografias
	db.transaction(function(tx) {
		var countSynced = 0
		var dataSynced = false;
		var sql = "";
	
		tx.executeSql("SELECT * FROM fotografia  where sync is null ", [], function(tx2, res2) {
			//alert(res.rows.item(0).observacion);
			$.mobile.loading( "show", {
				text: "Leyendo fotos tomadas",
				textVisible: true,
				theme: "a",
				textonly: false,
				html: ""
			}); 
			//alert(res2.rows.length);
			fotototal = res2.rows.length;
			$.mobile.loading( "hide");	
			if(res2.rows.length>0){
				for (var a = 0; a < res2.rows.length; a++){
				
				var deferredsVR = GetVRDeferred(res2, a);
				
				$.when.apply(null, deferredsVR).done(function() {
			
				 $.when($.ajax({
					method: "GET",
					url: host + 'process/lite/uploadVisitsF.php' ,
					data: { "sqls": deferredsVR,"cli_id":id_usuario},
					dataType:"json",
					beforeSend: function( xhr ) {
						
						$.mobile.loading( "show", {
							text: "Guardando datos de las fotografias",
							textVisible: true,
							theme: "a",
							textonly: false,
							html: ""
						}); 
					  }
				})
				.done(function(data) {
					if (data.result){
						if (data.count>0){
							db.transaction(function(tx3) {
								var now = getTimeStamp(false)
								tx3.executeSql("update fotografia set sync='1' where sync is null ", [], function(tx4, res3){
									fotossync = a;
									$.mobile.loading( "show", {
										text: a + " Datos de la fotografia subidos correctamente",
										textVisible: true,
										theme: "a",
										textonly: false,
										html: ""
									}); 
									
								})
							});
						}else{
							
							}
					}
				})
				.fail(function(jqXHR, textStatus) {
					syncStatus = false
					popError('Sin datos','No pudimos subir la información de establcimientos. \n\nAsegúrse de estar conectado a internet e inténtelo nuevamente. --');
				})
				//// cerrrar el when 
				
				)
				
				
			
			});
			
			}
			}
		});

//// fin de la subida que establecimiento 
	});
	
	/// subir archivo de fotos 


$.mobile.loading( "hide");
//popError('Proceso terminado','Establecimiento: '+estasync +' de '+ estatotal +' \n\nFotos: '+ fotossync +' de '+ fotototal);

}

function delete_file(){/*

//alert('borrandao');
var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
db.transaction(function(tx) {
	tx.executeSql("delete FROM fotografia  where sync is not null ", [], function(tx2, res2) {
		
	});
});
			
	window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "/imgcapturalocal/", onFileSystemSuccess, onError);
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
*/}

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
		
		//var trafficLayer = new google.maps.TrafficLayer();
		//trafficLayer.setMap(mapPoints);
		var bounds = new google.maps.LatLngBounds();
		
		//directionsService = new google.maps.DirectionsService();
		//directionsDisplay = new google.maps.DirectionsRenderer();
		//directionsDisplay.setMap(mapPoints);
      //  var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
		
		var refreshControlDiv = document.createElement('div');
		var refreshControl = new RefreshControl(refreshControlDiv, mapPoints);
		
		 refreshControlDiv.index = 1;
		 mapPoints.controls[google.maps.ControlPosition.TOP_RIGHT].push(refreshControlDiv);
		 
		
		markerEst = new google.maps.Marker({
            position: latlng,
            map: mapPoints,
			icon:/*"images/pinExtended.png"*/new google.maps.MarkerImage('images/mepin.png',
    null, null, null, new google.maps.Size(16,16)),
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

			var db = window.openDatabase("cargalocal", "1.0", "Cordova Demo", 2000000);
			db.transaction(function(tx) {
		//tx.executeSql("SELECT  establecimiento.esta_id, establecimiento.establecimientocol, establecimiento.establecimiento_direccion, propietario, telefono, estclasi_nombre, establecimiento_lat, establecimiento_long FROM  establecimiento order by establecimiento.establecimientocol asc", [], function(tx, res) {
			tx.executeSql("SELECT * FROM pdv_coke where status IS NULL ", [], function(tx, res) {
			
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
		
        
		
		
		var j = 0;
		 for (var i = 0; i < res.rows.length; i++) {
			esta_id = res.rows.item(i).outnum;
			nombre = res.rows.item(i).negocio;
			direccion = res.rows.item(i).direccion;
			clasificacion = res.rows.item(i).cliente;
			establecimiento_lat = res.rows.item(i).lat_actual;
			establecimiento_lat = establecimiento_lat.replace(',','.');
			establecimiento_long = res.rows.item(i).log_actual;
			establecimiento_long = establecimiento_long.replace(',','.');
			//alert(esta_id)
			//points.push({"esta_id":esta_id,"latitude":establecimiento_lat,"longitude":establecimiento_long, "title":"<h3 class='ui-title' >" + nombre + "<\/h3><p><b>Direcci&oacute;n: <\/b>" + direccion + "<\/p>"});
			
			
			
			//console.log("ROW= " + esta_id + " " + nombre + " " + direccion);
			//lvStores += "<li data-icon='eye'><a id='u-" + esta_id + "' href='#'>";
			//lvStores += "<h2>" +nombre +"</h2>";
			//lvStores += "<p><strong>ID: </strong> "  + esta_id + "</p>";
			//lvStores += "<p><strong>Dirección: </strong> "  + direccion + "<br><small style='color:" + color + "'>[" + clasificacion + "]</small></p></a></li>";
			
			
				//	alert(markers.length)
				//console.log(markers[i].esta_id);
				if (establecimiento_lat != null || establecimiento_long!=null){
					
					console.log("COORD: " + establecimiento_lat + " " + establecimiento_long);
					
				destinations  = [];
				var infowindow = null;

				latlng = new google.maps.LatLng( establecimiento_lat,establecimiento_long);			
				destinations.push(latlng);
				points[latlng] = latlng;
				
						
				
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
				//alert(esta_id)
				var info =" <h3 class='ui-title' >" + nombre + "<\/h3><p><b>Direcci&oacute;n: <\/b>" + direccion  +"<\/p>|" + esta_id
				//var infoArr = info.split("|");
				
				var markerSt = new google.maps.Marker({
					position: latlng,
					map: mapPoints,
					icon:new google.maps.MarkerImage("images/redpin.png",null, null, null, new google.maps.Size(16,16)),
					title: info,
					//label: "esta_id"
					//animation: google.maps.Animation.DROP,
					
				});
				//alert (markerSt.label);
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

//						openInfo(this.title, j)
						//alert(this.position);
						//latlng = new google.maps.LatLng( establecimiento_lat,establecimiento_long);
						//alert( this.label)
						getRoutDetail(originMe, this.position	, this.title, this.label)
						//alert(this.title + " - " +  j++)
						
						
					});
				
				console.log("INDICE J " + j)
			
				mapPoints.fitBounds(bounds);
				//j++;
				
				
				
				}
				
				var directionsService = new google.maps.DirectionsService();
				var colors = ["#0050EF","#00ABA9"];
				
				$.each(destinations, function( k, d ) {
					//alert(k)
					
					
						console.log( "Origen: " + origin + ",Index: " + k + ", Destino: " + d );
		
					//	if (d <> "0"){
							
						var request = {
							'origin': origin,
							destination: d,
							travelMode: google.maps.TravelMode.DRIVING
						};
						var rendererOptions = {
							preserveViewport: true,         
							suppressMarkers:true,
							polylineOptions:{strokeColor:"#0050EF"}
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
						
				//	}
			});//FIN FOREACH
			//JSONmarkers = [];
			//JSONmarkers = {"markers":points}
			//JSONmarkers = JSON.stringify(JSONmarkers)
			//console.log("stringify=" + JSONmarkers);
			
			//$.each(JSONmarkers, function(i, item) {});
				
				//markerSt.setMap(null);	
				
					 
					
	
				
					
					
					
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
			
					google.maps.event.trigger(mapPoints, 'resize');
				}//FIN PARA
			
		
			
			});	
		});	
			
		//console.log(host + 'process/storesGeoposition.php?lat='+local_lat+'&long=' + local_long + "&storeType=" + storeType);
		if(JSONmarkers.length==0){
	//		popError("No se cargaron puntos","No se encontraron puntos en el mapa \n\nPor favor intentalo nuevamente")
	//popError("No se cargaron puntos","No se encontraron puntos en el mapa, asegúrate de corregir el geoposicionamiento en cada establecimiento para sacar provecho de esta vista");*/
		}
		//else{}
		
}
		

		
		
		
		

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
function getRoutDetail(origin, destinationsP, title){
				var service = new google.maps.DistanceMatrixService();
				// alert(origin + " " + d)
				  service.getDistanceMatrix(
					{
					  origins: [origin],
					  destinations: [destinationsP],
					  travelMode: google.maps.TravelMode.DRIVING,
					  unitSystem: google.maps.UnitSystem.METRIC,
					  avoidHighways: false,
					  avoidTolls: false
					}, 
					function (response, status) {
						
						  
						  if (status != google.maps.DistanceMatrixStatus.OK) {
							console.log('Error was: ' + status);
							markerText = "Información de Ruta no disponible";
							$.mobile.loading( "hide" );
							//return markerText;
						  } else {
							var origins = response.originAddresses;
							var destinations = response.destinationAddresses;
		
							  var results = response.rows[0].elements;
		
								 distanceText = results[0].distance.text
								 durationText = results[0].duration.text
								  //console.log(distanceText + " " + durationText)
								 // alert(esta_id);
								  markerText = "<p><b>Distancia:</b> " + distanceText + "<br><b>Tiempo estimado:</b> " + durationText + "</p>";
								  
								  var infoArr = title.split("|");
								  listStores.itemID = infoArr[1];
								  var href =   '<a id="' + infoArr[1] + '" class="ui-btn ui-corner-all ui-shadow ui-btn-b  ui-btn-icon-left ui-icon-eye" href="#"   data-theme="a" >Ver establecimiento</a>'
							//alert($("#")	
							//alert(href);	
								//$(dvMapInfo).trigger("create");
								
								  $("#dvMapInfo").html(infoArr[0] + markerText + href).trigger("create")
								  //geo:37.786971,-122.399677;u=35"
			//					   
								$("#popPointInfo").popup({ transition: "pop" });
								$('#popPointInfo').popup("open");
								$('#popPointInfo').popup({ dismissible: true }) 
								 // alert(title + " "  + markerText);
								 // alert("distancia")
								  //alert($("#infoDistance").html());
								  //return markerText
								$.mobile.loading( "hide" );
						  }
						  // the basics of a callback function.
						}
					);
			
				return markerText;
			
			}
			
function openInfo(title, i){
	//console.log("originMe " + originMe)
	alert("destinations[i] " + destinations[i])
	//console.log("i " + i)
	//console.log("title " + title)
	getRoutDetail(originMe, destinations[i], title)
	
	
}

function check_ejecutado(campana_element_id, elemento_ejecucion_id, tx){
	//var ejecuf_fecha =  "";
	//console.log("Entro check_ejecutado");
	sql = "	SELECT campana.nombre    , ejecucion_foto.elemento_id    , ejecucion_foto.ejecuf_fecha	, conf_campana_estaclasi.*	, visitas.corte_id FROM    conf_campana_estaclasi    INNER JOIN campana ON (conf_campana_estaclasi.campana_id = campana.campana_id)  INNER JOIN ejecucion_foto  ON (ejecucion_foto.campana_id = campana.campana_id)	INNER JOIN visitas  ON (ejecucion_foto.visi_id = visitas.visi_id) WHERE (conf_campana_estaclasi.estclasi_id ='" + curStoreClasif + "' AND ejecucion_foto.elemento_id ='" + elemento_ejecucion_id + "'	and  ejecucion_foto.campana_id ='" + campana_element_id + "'	AND establecimiento_esta_id = '" + listStores.itemID + "'	and visitas.corte_id = '" + corte + "')	ORDER BY ejecuf_fecha DESC LIMIT 1 ";
	//console.log(sql);


		tx.executeSql(sql, [], function(tx3, res3) {	
		
		console.log("length "+ res3.rows.length)
			if (res3.rows.length != 0){
				return "<p>" +  res3.rows.item(0).ejecuf_fecha + "</p>"
				
				//deferreds.push("<p>" + res3.rows.item(0).ejecuf_fecha + "</p>");
				console.log("si lilvCampaigns" + lilvCampaigns)
				//return deferreds;
			} 
			else{
				//deferreds = [];	
				//return deferreds;
				return ""
				console.log("no lilvCampaigns" + lilvCampaigns)
			}
			
			return lilvCampaigns
		});	
	//});	
	
}

function GetStoresDeferred(res, i) {
    var deferreds = [];
	
			var esta_id = res.rows.item(i).outnum;
			var establecimiento_lat = res.rows.item(i).lat_nueva;
			var establecimiento_long = res.rows.item(i).log_nueva;
			var nombre_contacto = res.rows.item(i).nombre_contacto;	
		//	alert("length =" + res.rows.length+ " nombre_contacto= " + nombre_contacto);	
			var cedula = res.rows.item(i).cedula;
			var direcion_nueva = res.rows.item(i).direcion_nueva;
			var telefono1_nuevo = res.rows.item(i).telefono1_nuevo;
			var telefono2 = res.rows.item(i).telefono2;
			var mail = res.rows.item(i).mail;
			var frio_propio = res.rows.item(i).frio_propio;
			var rack_coke = res.rows.item(i).rack_coke;
			var punta_gondola = res.rows.item(i).punta_gondola;
			var lineal = res.rows.item(i).lineal;
			var nevera_postobon = res.rows.item(i).nevera_postobon;
			var num_puerta_postobon = res.rows.item(i).num_puerta_postobon;
			var nevera_bavaria = res.rows.item(i).nevera_bavaria;
			var num_puerta_bavaria = res.rows.item(i).num_puerta_bavaria;
			var negocio_esquinero = res.rows.item(i).negocio_esquinero;
			var domicio = res.rows.item(i).domicio;
			var porqueno =res.rows.item(i).porqueno;
			var instalo =res.rows.item(i).instalo;
			var interes =res.rows.item(i).interes;
			var observacion =res.rows.item(i).observacion;
			
			
					
			deferreds.push({
				"esta_id":esta_id, 
				"establecimiento_lat":establecimiento_lat,
				"establecimiento_long":establecimiento_long, 
				"nombre_contacto":nombre_contacto, 
				"cedula" : cedula,
				"direcion_nueva" : direcion_nueva,
				"telefono1_nuevo" : telefono1_nuevo,
				"telefono2" : telefono2,
				"mail" : mail,
				"frio_propio" : frio_propio,
				"rack_coke" : rack_coke,
				"punta_gondola" : punta_gondola,
				"lineal" : lineal,
				"nevera_postobon" : nevera_postobon,
				"num_puerta_postobon" : num_puerta_postobon,
				"nevera_bavaria" : nevera_bavaria,
				"num_puerta_bavaria" : num_puerta_bavaria,
				"negocio_esquinero" : negocio_esquinero,
				"porqueno" : porqueno,
				"instalo" : instalo,
				"interes" : interes,
				"observacion" : observacion
				
			}) ;
						
		
	return deferreds;

}


function GetVRDeferred(res2, a) {
	var deferreds =[];
	
	var fecha = res2.rows.item(a).fecha;
	var outnum = res2.rows.item(a).outnum;
	var tipo = res2.rows.item(a).tipo;
	
	deferreds.push({
		"fecha":fecha, 
		"outnum":outnum,
		"tipo":tipo, 
	}) ;
							
	return deferreds;
}

function SubirApp(res, i) {
	picToUpload = [];
    var deferreds = [];
	var server = host + "process/lite/upload.php";
	//var dfrd = $.Deferred();
	
		//visita
				var fecha = res.rows.item(i).fecha;
				var outnum = res.rows.item(i).outnum;
				var tipo = res.rows.item(i).tipo;
					
				
				deferreds.push({
						"fecha":fecha, 
						"outnum":outnum,
						"tipo":tipo, 
						
				}) ;
							
															
						 //picToUpload.push(ejecuf_recurso)	
    imageURI = cordova.file.externalRootDirectory + 'imgcapturalocal/' + tipo; 
	
	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=tipo;
	
	options.mimeType="image/jpeg";
	options.chunkedMode = false;
	
	var ft = new FileTransfer();
	ft.onprogress = function(result) {
		 var percent =  result.loaded / result.total * 100;
		 percent = Math.round(percent);
		 console.log('Uploaded:  ' + percent + '%');   
		  $.mobile.loading( "show", {
				text: "Subiendo archivos (" + percent + '% completados)',
				textVisible: true,
				theme: "a",
				textonly: false,
				html: ""
			}); 

};
	ft.upload(imageURI, server, uploadOkEjec, uploadFailEjec, options);												
	
	return deferreds;
}

function SubirFtos(imagen) {
	//alert('entro');
	picToUpload = [];
    var deferreds = [];
	var server = host + "process/lite/upload.php";
	//var dfrd = $.Deferred();
						 //picToUpload.push(ejecuf_recurso)	
    imageURI = cordova.file.externalRootDirectory + 'imgcapturalocal/' + imagen; 
	
	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=imagen;
	
	options.mimeType="image/jpeg";
	options.chunkedMode = false;
	options.headers = {
      Connection: "close"
    };
	
	var ft = new FileTransfer();
	ft.onprogress = function(result) {
		 var percent =  result.loaded / result.total * 100;
		 percent = Math.round(percent);
		 console.log('Uploaded:  ' + percent + '%');   
		  $.mobile.loading( "show", {
				text: "Subiendo archivos (" + percent + '% completados)',
				textVisible: true,
				theme: "a",
				textonly: false,
				html: ""
			}); 

};
	ft.upload(imageURI, server, uploadOkEjec, uploadFailEjec, options);												
	
}

var uploadOkEjec = function(r){
			
		 $.mobile.loading( "hide" );
		   var megas = (r.bytesSent/1024)/1024;
		   
		  
		   console.log(megas + " subidos")
			//$('#lblBytesSent').html(megas.toPrecision(3));
			//$('#PopEjecConfirmUpload').popup({ transition: "pop" });
			//$('#PopEjecConfirmUpload').popup("open");
			//$('#PopEjecConfirmUpload').popup({ dismissible: true }) ;
			


}
var uploadFailEjec = function(error) {
				$.mobile.loading( "hide" );
               // alert( "Upload failed: Code = "+error.code);  
				//alert("Error: subiendo: " + error.code);
			//	  
				
 }
 
function borrarfoto(idtipo){
	switch(idtipo){
		case 'tphoto-1':
			$("#foto1").remove();
		break;
		case 'tphoto-2':
			$("#foto2").remove();
		break;
		case 'tphoto-3':
			$("#foto3").remove();
		break;
		case 'tphoto-4':
			$("#foto4").remove();
		break;
		case 'tphoto-5':
			$("#foto5").remove();
		break;
		case 'tphoto-6':
			$("#foto6").remove();
		break;
		case 'tphoto-7':
			$("#foto7").remove();
		break;
		case 'tphoto-8':
			$("#foto8").remove();
		break;
		
		case 'rohoto-1':
			$("#foto1").remove();
		break;
		case 'rohoto-2':
			$("#foto2").remove();
		break;
		case 'rohoto-3':
			$("#foto3").remove();
		break;
		case 'rohoto-4':
			$("#foto4").remove();
		break;
		case 'rohoto-5':
			$("#foto5").remove();
		break;
		case 'rohoto-6':
			$("#foto6").remove();
		break;
		case 'rohoto-7':
			$("#foto7").remove();
		break;
		case 'rohoto-8':
			$("#foto8").remove();
		break;
	}
}