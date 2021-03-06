
(function Component (id) {// @lock
//TODO

//make WOBS.changedDatasource an array


// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Customers';
	// @endregion// @endlock
	this.name = 'Contacts';
	this.load = function (data) {// @lock
    
	// @region namespaceDeclaration// @startlock
	var contactLastNameTextField = {};	// @textField
	var createContactButton = {};	// @button
	var contactCountryCombobox = {};	// @combobox
	var contactIsCompanyCheckbox = {};	// @checkbox
	var contactSalutationCombobox = {};	// @combobox
	var searchContactTextfield = {};	// @textField
	var button8 = {};	// @button
	var button7 = {};	// @button
	var button6 = {};	// @button
	var nextContactbutton = {};	// @button
	var deleteContactButton2 = {};	// @button
	var saveContactButton = {};	// @button
	// @endregion// @endlock
	$$(getHtmlId("saveContactButton")).disable();
	$$(getHtmlId('contactMessage')).setValue('');
	WOBS.changedDatasource = null;
	
	
	$(getHtmlObj('container3')).bind({
  	  		change: function(event) { enableSaveContactButton(); }
	});
	
	toggleNoCompanyContainer();
	function enableSaveContactButton(){
		$$(getHtmlId("saveContactButton")).enable();
		WOBS.changedDatasource = sources.contact;
	}
    
    //When a contact is a single person, i.e. no company, we show the container
    // with input fields for name and mobile
    function toggleNoCompanyContainer(){
    	var isCompany = $$(getHtmlId('contactIsCompanyCheckbox')).getValue();
		var container = getHtmlId('noCompanyContainer');
		var company = getHtmlId('companyName');
		if(isCompany){
			$$(container).hide();
			$$(company).enable();
		}else{
			$$(container).show();
			$$(company).disable();
		}
    }

	// eventHandlers// @lock

    //the last name is inserted in the contact name 
	contactLastNameTextField.keyup = function contactLastNameTextField_keyup (event)// @startlock
	{// @endlock
		var company = getHtmlId('companyName');
		var lastName = getHtmlId('contactLastNameTextField');
		$$(company).setValue($$(lastName).getValue());
		
	};// @lock

	createContactButton.click = function createContactButton_click (event)// @startlock
	{// @endlock
		sources.contact.addNewElement();
		sources.contact.serverRefresh();
	};// @lock
	
	sources.contact.addListener("onCurrentElementChange", function(event){
		toggleNoCompanyContainer();
	}); 

	contactCountryCombobox.click = function contactCountryCombobox_click (event)// @startlock
	{// @endlock
		enableSaveContactButton();
	};// @lock

	contactIsCompanyCheckbox.click = function contactIsCompanyCheckbox_click (event)// @startlock
	{// @endlock
		toggleNoCompanyContainer();
		
	};// @lock

	contactSalutationCombobox.click = function contactSalutationCombobox_click (event)// @startlock
	{// @endlock
		enableSaveContactButton();
	};// @lock

	searchContactTextfield.keyup = function searchContactTextfield_keyup (event)// @startlock
	{// @endlock
		
		var theName = $$(getHtmlId('searchContactTextfield')).getValue();;
		
		sources.contact.query('name = :1',	{
			
			onSuccess : function(event){},
			onError: function(error) {
				alert(error['error'][0]);
			},
			params: [theName + WAF.wildchar]
			,orderBy: 'name'	
		});


	};// @lock
	
	//don't save 
	button8.click = function button8_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('dialog1')).closeDialog(); 
		if(WOBS.action == 'selectNext'){
			WOBS.changedDatasource.selectNext();
			if(WOBS.changedDatasource.getClassTitle() == 'Contact'){
				$$(getHtmlId("saveContactButton")).disable();
			}
			WOBS.changedDatasource = null;
		}
	};// @lock
	
	
	
	function showConfirmationDialog (action){
		
		//$$(getHtmlId('saveConfirmationText')).setValue('Save changes ?');
		WOBS.action = action;
		$$(getHtmlId('dialog1')).displayDialog();
		
		
	}

	//cancel button
	button7.click = function button7_click (event)// @startlock
	{// @endlock

		$$(getHtmlId('dialog1')).closeDialog(); 
		
	};// @lock

	//ok button
	button6.click = function button6_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('dialog1')).closeDialog(); 
		
		WOBS.changedDatasource.save({
			'onSuccess' : function(event){
				if(WOBS.changedDatasource.getClassTitle() == 'Contact'){
					$$(getHtmlId("saveContactButton")).disable();
					$$(getHtmlId('contactMessage')).setValue('Contact Saved');
				}
				WOBS.changedDatasource = null;
			},
			onError: function(error) {
				alert(error['error'][0].message);
			}	
		});
		
		if(WOBS.action == 'selectNext'){
			WOBS.changedDatasource.selectNext();
		}
		
	};// @lock

	nextContactbutton.click = function nextContactbutton_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('contactMessage')).setValue('');
		if (WOBS.changedDatasource == null){
			sources.contact.selectNext();
		}else {
		showConfirmationDialog('selectNext');
		}
	};// @lock

	deleteContactButton2.click = function deleteContactButton2_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('contactMessage')).setValue('');
		var name = sources.contact.name;
		
		
		if (confirm('Really delete ' + name + ' ?' )){
			sources.contact.removeCurrent({
				'onSuccess' : function(event){
					$$(getHtmlId('contactMessage')).setValue('Contact was deleted');
					WOBS.changedDatasource = null;
				},
				onError: function(error) {
					$$(getHtmlId('contactMessage')).setValue(error['error'][0].message);
				}	
			});
		}
		
	};// @lock

	saveContactButton.click = function saveContactButton_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('contactMessage')).setValue('');
		sources.contact.save({
		'onSuccess' : function(event){
			WOBS.changedDatasource = null;
			$$(getHtmlId("saveContactButton")).disable();
			
			$$(getHtmlId('contactMessage')).setValue('Contact Saved');
		},
		onError: function(error) {
				$$(getHtmlId('contactMessage')).setValue(error['error'][0].message);
			}	
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_contactLastNameTextField", "keyup", contactLastNameTextField.keyup, "WAF");
	WAF.addListener(this.id + "_createContactButton", "click", createContactButton.click, "WAF");
	WAF.addListener(this.id + "_contactCountryCombobox", "click", contactCountryCombobox.click, "WAF");
	WAF.addListener(this.id + "_contactIsCompanyCheckbox", "click", contactIsCompanyCheckbox.click, "WAF");
	WAF.addListener(this.id + "_contactSalutationCombobox", "click", contactSalutationCombobox.click, "WAF");
	WAF.addListener(this.id + "_searchContactTextfield", "keyup", searchContactTextfield.keyup, "WAF");
	WAF.addListener(this.id + "_button8", "click", button8.click, "WAF");
	WAF.addListener(this.id + "_button7", "click", button7.click, "WAF");
	WAF.addListener(this.id + "_button6", "click", button6.click, "WAF");
	WAF.addListener(this.id + "_nextContactbutton", "click", nextContactbutton.click, "WAF");
	WAF.addListener(this.id + "_deleteContactButton2", "click", deleteContactButton2.click, "WAF");
	WAF.addListener(this.id + "_saveContactButton", "click", saveContactButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
