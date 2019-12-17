$(document).ready(function() {
    // Datepicker
	$('input#closingDate').datepicker({
        format: "yyyy-mm-dd",
        clearBtn: true,
		autoclose: true,
		startDate: "+1d",
		endDate: "+5y"
	});
	$('input#birthdate').datepicker({
        format: "yyyy-mm-dd",
        clearBtn: true,
		autoclose: true,
		startDate: "-20y",
		endDate: "-5y"
	});
	//===========
})