	const mas  = init();
	let person = document.querySelectorAll('.person');
	let forward = 0;
	// console.log(mas);
	
    function init() {
		
		let arr = [0];
		for ( let i = 1; i < 82; i++) {
		  arr[i] = arr[i - 1] + 25;
		}
				
		return arr;
    }

    function forwardRight( arg, len ) { 
		forward = 1;
		let i = 0;
		let timer = setInterval(function() {
		
			ship.style.left = mas[i] / 5 + 'px';
			arg.style.left = len + mas[i] / 5 + 'px';

			i++;

			if (i > mas.length) {
				clearInterval(timer);
				ship.setAttribute('alt', 'rightPosition');
				forward = 0;
			}

		}, 20);
		xhrExportData(arg.id, 'rightPosition');
    }

    function forwardLeft( arg, len ) {
		forward = 1;
		let j = mas.length;
		let timer = setInterval(function() {

			ship.style.left = mas[j] / 5 + 'px';
			arg.style.left = len + mas[j] / 5 + 'px';
			
			j--;
			
			if (j < 0) {
				clearInterval(timer);
				ship.setAttribute('alt', 'leftPosition');
				forward = 0;
			}

		}, 20);
		xhrExportData(arg.id, 'leftPosition');
    }

	document.addEventListener("click", function(el) {
		if ( forward != 1 ) {
			if ( el.target == kapusta || el.target == human || el.target == volk || el.target == koza ) {
				if (el.target.attributes.alt.value == "leftPosition" && ship.attributes.alt.value == "leftPosition" ) {
					
					if ( el.target == human ) {
						jump(el.target, 128, 6);
					} 
					else if ( el.target == koza ) {
						jump(el.target, 215, 10);
					}		
					else if ( el.target == kapusta ) {
						jump(el.target, 140, 10);
					}
					else if ( el.target == volk ) {
						jump(el.target, 275, 10);
					}					
					el.target.attributes.alt.value = 'shipPosition';	

				} else if ( el.target.attributes.alt.value == "rightPosition" && ship.attributes.alt.value == "rightPosition" ) {
					if ( el.target == human ) {
						jump(el.target, 128 + 405, 6);
					} 
					else if ( el.target == koza ) {
						jump(el.target, 215 + 405, 10);
					}		
					else if ( el.target == kapusta ) {
						jump(el.target, 140 + 405, 10);
					}
					else if ( el.target == volk ) {
						jump(el.target, 275 + 405, 10);
					}					
					el.target.attributes.alt.value = 'shipPosition';
					
				} else if ( el.target.attributes.alt.value == "shipPosition" && ship.attributes.alt.value == "rightPosition" ) {
					if ( el.target == human ) {
						el.target.attributes.alt.value = "rightPosition";
						jump(el.target, 835, 0);
					} 
					else if ( el.target == koza ) {
						el.target.attributes.alt.value = "rightPosition";
						jump(el.target, 750, 0);
					}		
					else if ( el.target == kapusta ) {
						el.target.attributes.alt.value = "rightPosition";
						jump(el.target, 750, 0);
					}
					else if ( el.target == volk ) {
						el.target.attributes.alt.value = "rightPosition";
						jump(el.target, 970, 0);
					}
				}
				else if ( el.target.attributes.alt.value == "shipPosition" && ship.attributes.alt.value == "leftPosition" ) {
						jump(el.target); 
						el.target.attributes.alt.value = 'leftPosition';				
				}	
				missionComplete();
			}
		}		
	});	
	
	ship.addEventListener("click", function(el) {
	
		if ( ship.attributes.alt.value == "leftPosition" ) 
		{
			if ( person[3].attributes.alt.value != 'shipPosition' ) 
			{
				infoBoxMessage( "<center>Лодкой может управлять только человек!</center>", "info border-radius-8" );
			} 
			else {
				if ( shipValidation() ) 
				{
					for ( let i = 0; i < person.length; i++ ) {
						if (person[i].attributes.alt.value == 'shipPosition' ) 
						{
							forwardRight( person[i], Number( person[i].style.left.match('[0-9.]+')[0] ) );
						}
					}
					personValidation( "leftPosition" );
				}
			}
		}
		
		if ( ship.attributes.alt.value == "rightPosition" ) 
		{
			if ( person[3].attributes.alt.value != 'shipPosition' ) 
			{
				infoBoxMessage( "<center>Лодкой может управлять только человек!</center>", "info border-radius-8" );
			} 
			else {
				if ( shipValidation() ) 
				{
					for ( let i = 0; i < person.length; i++ ) {
						if (person[i].attributes.alt.value == 'shipPosition' ) 
						{
							forwardLeft( person[i], Number( person[i].style.left.match('[0-9.]+')[0] ) - 405 );
						}
					}
					personValidation( "rightPosition" );
				}
			}			
		}
	});
	
	function jump(member, left = 0, top = 0) 
	{
		member.style.left = left + "px";
		member.style.top  = top  + "px"		
	}
	
	
	// function toastMessages( str ) 
	// {
		// Metro.toast.create(str, null, null, "secondary");
		// Metro.infobox.create(str);
	// }
	
	function infoBoxMessage( str, alert ) {
		let el = Metro.infobox.create(
			str,
			alert,
			{
				closeButton: false,
				onOpen: function(){
					let ib = $(this).data("infobox");
					setTimeout(function(){
						ib.close();
					}, 2000)
				}
			}
		);
	}
	
	function shipValidation() 
	{
		let count = 0;
		for ( let i = 0; i < person.length - 1; i++ )
		{
			if (person[i].attributes.alt.value == 'shipPosition' ) 
			{
				count++;			
			}
		}
		// console.log(count);
		if (count > 1) 
		{
			infoBoxMessage("<center>Допустимо брать на борт только одного персонажа!</center>", "warning border-radius-8");
			return false;
		} else {
			return true;
		}
	}
	
	function missionComplete() 
	{
		let count = 0;
		for ( let i = 0; i < person.length; i++ )
		{
			if (person[i].attributes.alt.value == 'rightPosition' ) 
			{
				count++;			
			}
		}
		// console.log(count);
		if (count == 4) 
		{
			infoBoxMessage("<center>Mission completed!</center>", "success border-radius-8");
		}
	}
	
	function personValidation( str ) 
	{
		
		if ( person[0].attributes.alt.value == str && person[1].attributes.alt.value == str ) 
		{
			if ( person[1].attributes.alt.value == str && person[2].attributes.alt.value == str ) // 1 Козёл 2 Капуста
			{
				person[1].style.visibility = 'hidden';
				person[2].style.visibility = 'hidden';
				openDialogEndGame( "<center>Вы проиграли, козъёль съел капусту, а волк съел козла!</center>" );
			} 
			else 
			{
				person[1].style.visibility = 'hidden';
				openDialogEndGame( "<center>Вы проиграли, волк съел козла!</center>" );
			}
		} 
		else if ( person[1].attributes.alt.value == str && person[2].attributes.alt.value == str ) 
		{
			person[2].style.visibility = 'hidden';
			openDialogEndGame( "<center>Вы проиграли, козъёль съел капусту!</center>" );
		}
	}
	
	function openDialogEndGame( contentArgs ) {
		
		Metro.dialog.create({
			clsDialog: "border-radius-8",  // secondary 
			title: "Хотите начать заново?",
			content: contentArgs,
            actions: [
                {
                    caption: "Да",
                    cls: "success border-radius-8",
                    onclick: function() 
					{
						document.location.reload();
                    }
                },
                {
                    caption: "Нет",
                    cls: "alert js-dialog-close border-radius-8",
                    onclick: function() 
					{
						window.close();
                    }
                }
            ]
		});
	}

	
	function xhrExportData( person, forward ) 
	{
		  let formData = new FormData(); 
		  formData.append(person, forward);

		  // отправим данные
		  let xhr = new XMLHttpRequest();
		  xhr.open("POST", 'form.php');
		  xhr.send(formData);
		  xhr.onload = () => console.log(xhr.response);
	}