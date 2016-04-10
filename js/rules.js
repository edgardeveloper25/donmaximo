$('#frmValidateUser').validate({
	rules: {
		'txtDocLogin':{
			required: true,
			
			
		}
	},

	messages: {
		 'txtDocLogin':{
			required: "Especifique su cédula",
			number: "Especifique una cédula correcta"
		}
	},
		
});

$('#frmContact').validate({
	rules: {
		'txtSubject':{
			required: true,
			minlength: 5
			
		},
		'txtMessage':{
			required: true,
			minlength: 5
			
		},
	},
	

	messages: {
		 'txtSubject':{
			required: "Especifique un título",
			minlength: "Especifique un asunto más largo"
		},
		'txtMessage':{
			required: "Especifique texto que describa la falla",
			minlength: "Especifique un asunto más largo"
		}
	},
		
});

$('#frmSaveEjecStore').validate({
		rules: {			
			'txtObservacion': {
           		required:function(element){
		                  return $("#chkElement option:selected").val() == "no";
                            },
        	}
			//txtAddressInfo
		},
		messages: {
			 'txtObservacion':{
				required: "Motivo por el cual no cuenta con este elemento",
			}
		}
	
	});
	
$('#frmVisitStatus').validate({
		rules: {			
			'txtObservacionVisita': {
           		required:function(element){
		                  return $("#chkVisit option:selected").val() == "no";
                            },
        	}
			//txtAddressInfo
		},
		messages: {
			 'txtObservacionVisita':{
				required: "Motivo por el cual no puede realizar la visita",
			}
		}
	
	});	