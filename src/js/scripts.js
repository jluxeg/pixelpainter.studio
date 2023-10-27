//add the required files
/**
* @requires ../../node_modules/html-to-image/dist/html-to-image.js
* @requires ../../node_modules/downloadjs/download.js
* @requires ../../node_modules/jquery/dist/jquery.js
* @requires partials/colors.js
*/

//add globals to appease linting
/* global htmlToImage */
/* global download */
/* global jQuery */
/* global colors */


jQuery(document).ready(function($){
	//global vars
	const lsPrefix = 'pps_'; //prefix for localStorage items
	const $pps = $("#pixelpainterstudio");
	var color = $("#palette").attr("data-color"); //sets initial painting color
	var oldColor = ''; //used for checks before painting pixels
	var prevTool = ''; //used to switch to previous tool after eyedropper
	var doingAction = false; //used during check if mouse is outside canvas after a paint action
	var undoTemp = []; //holds individual pixel change data to add to undo states
	var undo = []; //holds completed undo states
	var redo = []; //holds undone states to redo
	var checkedPixels = []; //tracks pixels that have already been checked during a paintbucket action
	var saveFiles = []; //used to set list of user saveFiles
	const notices = {
		"deleteFile": {
			"message": "Are you sure you want to delete %file%?",
			"hidden": false
		},
		"clearCanvas": {
			"message": "Are you sure you want to clear the canvas?",
			"hidden": false
		},
		"loadFile": {
			"message": "Clear the current canvas and load %file%?",
			"hidden": false
		}
	};
	const callbacks = {
		deleteFile : function(file){
			localStorage.removeItem(file);
			saveFiles.splice( $.inArray(file, saveFiles), 1 );
			localStorage.setItem(lsPrefix+'saveFiles', saveFiles.join("|"));
			$("#save-files [data-file='"+file+"']").remove();
			$(".storage-error").remove();
		},
		clearCanvas : function(){
			undo = [];
			redo = [];
			$(".pixel").attr("data-color","");
			$("#save-name").val("");
			updateDisabledButtonStates();
		},
		loadFile : function(file){
			var progress = localStorage.getItem(file);
			callbacks.clearCanvas();
			$("#save-name").val(file.replace(lsPrefix, ''));
			progress = progress.split("|");
			$.each($(".pixel"), function(i){
				$(this).attr("data-color", progress[i]);
			});
			updateDisabledButtonStates();
		}
	};
	
	//functions
	function setPaintingColor(c){
		color = c;
		$("#palette").attr("data-color", c);
		$("#palette li").removeClass("active");
		$("#palette li[data-color='"+c+"']").addClass("active");
	}
	
	function doPaintingAction(elem){
		var tool = $("#canvas").attr("data-tool");
		redo = [];
		updateRedoDisplay();
		oldColor = elem.attr("data-color");
		
		switch(tool){
			case 'paintbrush':
				elem.paintPixel();
				break;
			case 'paintbucket':
				//the working class doesn't always apply on mobile
				$.when($(".canvas-frame").addClass("working")).then(function(){
					if(elem.paintPixel()){
						$.when(elem.paintbucketCheck()).then(function(){
							$(".canvas-frame").removeClass("working");
							checkedPixels = [];
						});
					} else {
						$(".canvas-frame").removeClass("working");
					}
				});
				break;
			case 'eraser':
				color = '';
				elem.paintPixel();
				color = $("#palette").attr("data-color");
				break;
			case 'colorreplace':
				$(".pixel[data-color='"+oldColor+"']").paintPixel();
				break;
			case 'eyedropper':
				setPaintingColor(elem.attr("data-color"));
				prevTool.click();
				break;
		}
	}
	
	function between(num, min, max) {
		return num >= min && num <= max;
	}
	
	//update the pixel color and push previous color to the undo state builder
	$.fn.paintPixel = function() {
		if(oldColor != color){
			$(this).attr("data-color", color);
			var state = {"pixel":$(this),"oldColor":oldColor,"newColor":color};
			undoTemp.push(state);
			return this;
		}
		return false;
	};
	
	//recursive, checks pixels on each side to see if they should be painted and paints them
	$.fn.paintbucketCheck = function() {
		var x = Number($(this).attr("data-x"));
		var y = Number($(this).attr("data-y"));
		var upCoor = [x,y - 1];
		var downCoor = [x,y + 1];
		var leftCoor = [x - 1,y];
		var rightCoor = [x + 1,y];
		var coorCheck = [upCoor,downCoor,leftCoor,rightCoor];
		
		$.each(coorCheck, function(i,v){
			if($.inArray(v, checkedPixels) !== -1 || !between(v[0], 1, 32) || !between(v[1], 1, 32)){
				return;
			}
			
			var pixel = $(".pixel[data-x='"+v[0]+"'][data-y='"+v[1]+"']");
			
			if(pixel.length > -1 && pixel.attr("data-color") == oldColor){
				if(pixel.paintPixel()){
					checkedPixels.push(v);
					pixel.paintbucketCheck();
				}
			}
		});
		return this;
	};
	
	function addUndoState(){
		if(undoTemp.length > 0){
			undo.push(undoTemp);
			if(undo.length > 20){ //20 actions are fine, let's not bog down the page
				undo.shift();
			}
			updateDisabledButtonStates();
			undoTemp = [];
		}
	}
	
	function updateUndoDisplay(){
		if(undo.length <= 0) {
			$("#undo").prop("disabled", true);
		} else {
			$("#undo").prop("disabled", false);
		}
		$("#undo-count").text(undo.length);
	}
	
	function updateRedoDisplay(){
		if(redo.length <= 0) {
			$("#redo").prop("disabled", true);
		} else {
			$("#redo").prop("disabled", false);
		}
	}
	
	function updateDownloadDisplay(){
		if(undo.length <= 0 && $(".pixel[data-color!='']").length <= 0) {
			$("#download-jpg, #download-png").prop("disabled", true);
		} else {
			$("#download-jpg, #download-png").prop("disabled", false);
		}
	}
	
	function updateClearCanvasDisplay(){
		if($(".pixel[data-color!='']").length <= 0) {
			$("#clear-canvas").prop("disabled", true);
		} else {
			$("#clear-canvas").prop("disabled", false);
		}
	}
	
	function updateDisabledButtonStates(){
		updateUndoDisplay();
		updateRedoDisplay();
		updateDownloadDisplay();
		updateClearCanvasDisplay();
	}
	
	function downloadError(error){
		console.log(error);
		$pps.addClass("error");
		setTimeout(function(){
			$pps.removeClass("downloading png jpg error");
		}, 3000);
	}
	
	function getSaveName(){
		var saveName = $("#save-name").val();
		if(!saveName){
			saveName = Date.now();
		} else {
			saveName = saveName.replace(/[^a-z0-9\s-]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
		}
		saveName = lsPrefix+saveName;
		return saveName;
	}
	
	function saveListItemMaker(file){
		var fileName = file.replace(lsPrefix, '');
		return "<li data-file='"+file+"'><button class='deletefile red' aria-label='delete "+fileName+"'>delete</button><span>"+fileName+"</span> <button class='loadfile' aria-label='load "+fileName+"'>load</button></li>";
	}
	
	function isQuotaExceededError(error){
		return (
			error instanceof DOMException &&
			// everything except firefox
			(error.code === 22 || error.name === "QuotaExceededError" ||
			// firefox
			error.code === 1014 || error.name === "NS_ERROR_DOM_QUOTA_REACHED")
		);
	}
	
	function isStorageSupported(){
		try {
			if(!localStorage){
				return false;
			}
			var x = '__storage_test__';
			localStorage.setItem(x, x);
			localStorage.removeItem(x);
			return true;
		} catch (error){
			var isValidQuotaExceededError = isQuotaExceededError(error) && localStorage.length > 0;
			return isValidQuotaExceededError;
		}
	}
	
	function displayStorageError(){
		$("#save-files").prepend("<li class='storage-error'>not enough storage space. <br/>try deleting older files first.</li>");
	}
	
	function openNotice(noticeType, param = undefined, messageReplace = undefined){
		var message = notices[noticeType].message;
		if(messageReplace !== undefined){
			message = message.replace(/%.*%/, messageReplace);
		}
		$("#notice .modal-message").text(message);
		$("#notice").attr("data-action", noticeType);
		if(param !== undefined){
			$("#notice").attr("data-param", param);
		}
		$pps.addClass("modal-open notice-open");
	}
	
	function closeNotice(){
		$("#notice").attr("data-action", "");
		$("#notice").attr("data-param", "");
		$("#opt-out").prop("checked", false);
		$pps.removeClass("modal-open notice-open");
	}
	
	//hide the notice type until the next visit/reload
	$("#opt-out").change(function(){
		var noticeType = $("#notice").attr("data-action");
		if($(this).is(":checked")){
			notices[noticeType].hidden = true;
		} else {
			notices[noticeType].hidden = false;
		}
	});
	
	//close the modal and take no action
	$("#notice button.red").click(function(){
		closeNotice();
	});
	
	//close the modal and do the action
	$("#notice button.green").click(function(){
		var cb = $("#notice").attr("data-action");
		var param = $("#notice").attr("data-param");
		
		callbacks[cb](param);
		closeNotice();
	});
	
	//catch history navigation and reload if there is unsaved changes --needs attention for ios
	$(window).bind('beforeunload', function(){
		if($(".pixel[data-color!='']").length > 0 && undo.length > 0){
			return "You have unsaved changes that will be lost. Continue?";
		}
	});

/*---Housekeeping----*/
	
	//apply palette colors
	$.each(colors, function(i, v){
		//add the colors to the palette
		$("#palette").append("<li data-color='"+v.hex+"' title='"+v.name+"'>"+v.name+"</li>");
		
		//add the background colors to the styles
		//this is ok for just a set palette, since changing colors is a little simpler
		//but is it still feasible if options for custom colors are added?
		$("#backgroundcolors").append("[data-color='"+v.hex+"']{background:#"+v.hex+";}");
	});
	
	$("#palette li[data-color='"+color+"']").addClass("active");
	
	//fill up the canvas with pixels
	for (let i = 0; i < 10; i++) { //chrome can save images at 12 recursions(64x64), firefox at 10(32x32)
		$("#canvas").append($(".pixel").clone());
	}
	
	//give each .pixel some coordinates
	$(".pixel").each(function(i){
		var gridSize = 32;
		var x = Math.floor(i%gridSize) + 1;
		var y = Math.floor(i/gridSize) + 1;
		
		$(this).attr("data-x", x);
		$(this).attr("data-y", y);
	});
	
	//make sure there is localStorage
	if(!isStorageSupported()){
		$pps.addClass("no-storage");
		return;
	} else {
		
		saveFiles = localStorage.getItem(lsPrefix+'saveFiles');
		
		//setup the saveFiles localStorage the first time a user visits
		if(saveFiles === null){
			localStorage.setItem(lsPrefix+'saveFiles', '');
			saveFiles = localStorage.getItem(lsPrefix+'saveFiles');
		}
		
		if(saveFiles !== ''){
			saveFiles = saveFiles.split("|");
		} else {
			saveFiles = [];
		}
		
		//display the previous save files
		if(saveFiles.length > 0){
			$.each(saveFiles, function(i, saveName){
				$("#save-files").append(saveListItemMaker(saveName));
			});
		}
		
	}

/*---End Housekeeping----*/


/*---Mobile Display Functions----*/
	
	//open/close the palette on mobile
	$("#palette").click(function(){
		$(this).toggleClass("show-drawer");
	});
	
	//open/close the file actions on mobile
	$("#file-actions").click(function(){
		if (!$(event.target).is(".deletefile") && !$(event.target).is("#save-name")){
			if($(event.target).is("#save-progress")){
				setTimeout(function(){ $("#file-actions").toggleClass("show-drawer");}, 500);
			} else {
				$(this).toggleClass("show-drawer");
			}
		}
	});
	
	
/*---End Mobile Display Functions----*/
	
	
/*---Painting Actions----*/
	
	//initiates action to be done on pixel based on current tool - touchscreen
	$("#canvas").on("touchstart touchmove", ".pixel", function(e){
		e.preventDefault();
		var touch = e.touches[0];
		var pixel = document.elementFromPoint(touch.clientX, touch.clientY);
		if($(pixel).hasClass("pixel") && !$(".canvas-frame").hasClass("working")){
			doPaintingAction($(pixel));
		}
	});
	
	//updates the undo states when a pixel action is complete - touchscreen
	$("#canvas").on("touchend", ".pixel", function(e){
		e.preventDefault();
		addUndoState();
	});
	
	//initiates action to be done on pixel based on current tool - desktop
	$(".pixel").on("mousedown mouseover", function(e){
		e.preventDefault();
		if ((e.buttons == 1 || e.buttons == 3) && !$(".canvas-frame").hasClass("working")) {
			doingAction = true;
			doPaintingAction($(this));
		}
	});
	
	//updates the undo states when a pixel action is complete - desktop
	//moved to the #pixelpainterstudio element incase mouse up happens off the canvas area
	$pps.on("mouseup", function(e){
		e.preventDefault();
		if(doingAction){
			addUndoState();
			doingAction = false;
		}
	});

/*---End Painting Actions----*/

	
/*---Toolbox----*/

	//sets the color to use for tools
	$("#palette li").click(function(){
		setPaintingColor($(this).attr("data-color"));
	});
	
	//sets the active tool
	$("#tools li").click(function(){
		prevTool = $("#tools .active");
		$("#tools li").removeClass("active");
		$(this).addClass("active");
		$("#canvas").attr("data-tool", $(this).attr("data-tool"));
	});
	
	//clears the canvas of colors and emptys undo/redo states
	$("#clear-canvas").click(function(){
		if($(".pixel[data-color!='']").length > 0){
			if(notices.clearCanvas.hidden){
				callbacks.clearCanvas();
			} else {
				openNotice("clearCanvas");
			}
		}
	});
	
	//sometimes you don't want to see the grid
	$("#toggle-grid").click(function(){
		$pps.toggleClass("no-grid");
	});
	
	//undoes previous action and adds it as a redo state
	$("#undo").click(function(){
		if(undo.length > 0){
			var lastAction = undo.pop();
			
			$.each(lastAction, function(i,v){
				v.pixel.attr("data-color", v.oldColor);
			});
			redo.push(lastAction);
			updateDisabledButtonStates();
		}
	});
	
	//two-finger tap to undo on mobile --roadmap
	/*$("#canvas").on("touchstart", function(e){
		e.preventDefault();
		if(e.touches.length > 1){
			$("#undo").click();
		}
	});*/
	
	//redoes last undo action and adds it back as an undo state
	$("#redo").click(function(){
		if(redo.length > 0) {
			var lastAction = redo.pop();
			
			$.each(lastAction, function(i,v){
				v.pixel.attr("data-color", v.newColor);
			});
			undo.push(lastAction);
			updateDisabledButtonStates();
		}
	});	
	
/*---End Toolbox----*/
	
	
/*---File Actions----*/
	
	//prevent the form from reloading the page
	$("form").submit(function(e){
		e.preventDefault();
	});
	
	//saves the current canvas as a string of codes referencing colors to localStorage. also updates the master saveFiles list in localStorage
	$("#save-progress").click(function(){
		var saveName = getSaveName();
		var progress = [];
		var saveListItem = $("#save-files li[data-file='"+saveName+"']");
		
		$.each($(".pixel"), function(){
			progress.push($(this).attr("data-color"));
		});
		progress = progress.join("|");
		try {
			localStorage.setItem(saveName, progress);
		} catch (error){
			displayStorageError();
			return false;
		}
		if($.inArray(saveName, saveFiles) !== -1){
			saveFiles.splice( $.inArray(saveName, saveFiles), 1 );
		}
		saveFiles.unshift(saveName);
		try {
			localStorage.setItem(lsPrefix+'saveFiles', saveFiles.join("|"));
		} catch (error){
			displayStorageError();
			return false;
		}
		
		if(!saveListItem.length){
			$("#save-files").prepend(saveListItemMaker(saveName));
			saveListItem = $("#save-files li[data-file='"+saveName+"']");
		}
		saveListItem.addClass("saved");
		setTimeout(function(){
			saveListItem.removeClass("saved");
		}, 1000);
		
		$("#save-name").blur();
	});
	
	//download the current canvas as a jpg
	$("#download-jpg").click(function(){
		$.when($pps.addClass("downloading jpg")).then(function(){
			var saveName = getSaveName();
			
			htmlToImage.toJpeg(document.getElementById("canvas"), { quality: 0.95}).then(function (dataUrl) {
				$.when(download(dataUrl, saveName+".jpg")).then(function(){
					$pps.removeClass("downloading jpg");
				});
				
			}).catch(function (error) {
				downloadError(error);
			});
		});
	});
	
	//download the current canvas as a png
	$("#download-png").click(function(){
		$.when($pps.addClass("downloading png")).then(function(){
			var saveName = getSaveName();
			
			htmlToImage.toPng(document.getElementById("canvas")).then(function (dataUrl) {
				$.when(download(dataUrl, saveName+".png")).then(function(){
					$pps.removeClass("downloading png");
				});
			}).catch(function (error) {
				downloadError(error);
			});
		});
	});
	
	//loads a previously saved file
	$pps.on("click", "#save-files li .loadfile", function() {
		var file = $(this).parent().attr("data-file");
		var fileName = file.replace(lsPrefix, '');
		
		//should a check for undo.length > 0 be added in the event a user loads a file, makes no changes, and chooses to load another file instead?
		if(!notices.loadFile.hidden && $(".pixel[data-color!='']").length > 0){
			openNotice("loadFile", file, fileName);
		} else {
			callbacks.loadFile(file);
		}
	});
	
	//deletes a previously saved file
	$pps.on("click", "#save-files li .deletefile", function() {
		var file = $(this).parent().attr("data-file");
		var fileName = file.replace(lsPrefix, '');
		
		if(notices.deleteFile.hidden){
			callbacks.deleteFile(file);
		} else {
			openNotice("deleteFile", file, fileName);
		}
	});
	
/*---End File Actions----*/
	
	
/*---Keyboard Shortcuts----*/

	//adds ability to use keyboard shortcuts to switch between tools, follows most photoshop standards
	$(document).keypress(function(e) {
		if(!$("input").is(":focus")){
			var charCode = e.which;
			
			if (charCode) {
				var letter = String.fromCharCode(charCode).toLowerCase();
				var tools = ['b','g','e','f','i','t'];
				
				if($.inArray(letter, tools)!== -1){
					$("[data-shortcut].active").blur();
					$("[data-shortcut='"+letter+"']").click();
				}
			}
		}
	});
	
	//adds ability to use keyboard shortcuts for undo, redo, and save
	$(document).keydown(function(e){
		if(!$("input").is(":focus")){
			if((e.metaKey || e.ctrlKey)){
				if(e.which === 90){ // z
					e.preventDefault();
					if(e.shiftKey){
						$("#redo").click(); // shift + ctrl/cmd + z
					} else {
						$("#undo").click(); // ctrl/cmd + z
					}
				} else if(e.which === 83){ // s
					e.preventDefault();
					$("#save-progress").click(); // ctrl/cmd + s
				}
			}
		}
	});
	
/*---End Keyboard Shortcuts----*/

});	