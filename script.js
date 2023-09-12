var iconSize; var iconHorSpace; var iconVrtSpace; var iconMarginSides; var iconMarginTop; var iconVrtBottomExtra; var iconHorSpaceMiddleExtra; var mod;
function loadPhoto() {
	document.getElementById("containBox").style.display = "block";
	var userPhoto = document.getElementById("userFile").files[0];
	var reader = new FileReader();
	var bgPhoto = document.getElementById("bgPhoto");

	reader.onload = (event) => {
		bgPhoto.src = reader.result;
	};
	if (userPhoto) {
		reader.readAsDataURL(userPhoto);
	}
}


function whichPhone() {
	var phoneDimesions = [727040,1000500,2742336,2740500,1483776,3338496];
	var photoElm = document.getElementById("bgPhoto");
	mod = photoElm.width / photoElm.naturalWidth;
	var x = photoElm.naturalHeight * photoElm.naturalWidth;
	document.getElementById("errorTXT").innerHTML = "";
	var xIndex = phoneDimesions.indexOf(x);
	switch (xIndex) {
	//min-height:90vh; max-height:120vh; 
		/* case 0:
			//5s=================================
			iconSize = 
			iconHorSpace = 
			iconHorSpaceMiddleExtra = 
			iconVrtSpace = 
			iconVrtBottomExtra = 
			iconMarginSides = 
			iconMarginTop =
			break; */
		case 1:
			//6, 6s, 7, 8 -----max
			iconSize = 120;
			iconHorSpace = 54;
			iconHorSpaceMiddleExtra = 0;
			iconVrtSpace = 56;
			iconVrtBottomExtra = 70; 
			iconMarginSides = 54;
			iconMarginTop = 56;
			break;
		/* case 2:
			//6+, 6s+, 7+, 8+=======================
			iconSize = 
			iconHorSpace = 
			iconHorSpaceMiddleExtra = 
			iconVrtSpace = 
			iconVrtBottomExtra = 
			iconMarginSides = 
			iconMarginTop =
			break;
		case 3:
			//11 Pro, X, Xs=========================
			iconSize = 
			iconHorSpace = 
			iconHorSpaceMiddleExtra = 
			iconVrtSpace = 
			iconVrtBottomExtra = 
			iconMarginSides = 
			iconMarginTop =
			break; */
		case 4:
			//11, XR
			iconSize = 128;
			iconHorSpace = 62;
			iconHorSpaceMiddleExtra = 2;
			iconVrtSpace = 82;
			iconVrtBottomExtra = 180;
			iconMarginSides = 64;
			iconMarginTop = 160;
			break;
		case 5:
			//11 Pro Max, XS Max
			iconSize = 192;
			iconHorSpace = 94;
			iconHorSpaceMiddleExtra = 0;
			iconVrtSpace = 145;
			iconVrtBottomExtra = 146;
			iconMarginSides = 96;
			iconMarginTop = 234;
			break;
		default:
			//not a recognized phone
			iconSize = 0;
			iconHorSpace = 0;
			iconHorSpaceMiddleExtra = 0;
			iconVrtSpace = 0;
			iconVrtBottomExtra = 0;
			iconMarginSides = 0;
			iconMarginTop = 0;
			photoElm.src = "";
			document.getElementById("containBox").style.display = "none";
			document.getElementById("errorTXT").innerHTML = "Error: Your phone is unsupported, contact me to fix it! (Make sure the screenshot is unedited)";
			return;
	}
	document.getElementById("canvas").height = iconSize;
	document.getElementById("canvas").width = iconSize;
	boxes();
}

function drawIcon(index) {
	coords = iconPos(index);
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var image = document.getElementById("bgPhoto");
	ctx.drawImage(image, coords[0], coords[1], iconSize, iconSize, 0, 0, iconSize, iconSize);
	var canvasLink = canvas.toDataURL("image/png");
	//document.getElementById("appleIcon").href = canvasLink;
	localStorage.setItem("imgData", canvasLink);
	window.open("bookmark/bookmark.html",'_blank');
}

function boxes() {
	document.getElementById("buttonContainer").innerHTML = "";
	var buttnCntr = document.getElementById("buttonContainer");
	buttnCntr.style.width = document.getElementById("bgPhoto").width + "px";
	buttnCntr.style.height = document.getElementById("bgPhoto").height + "px";
	var size = (iconSize * mod) + "px";
	for (var i = 0; i < 28; i++) {
		coords = iconPos(i);
		buttonHTML = "<button type='button' class='iconButton' onclick='drawIcon(" + i + ")' id='button" + i + "'>" + i + "</button>";
		buttnCntr.innerHTML += buttonHTML;
		buttn = "button" + i;
		buttn = document.getElementById(buttn);
		buttn.style.width = size;
		buttn.style.height = size;
		buttn.style.top = (coords[1] * mod) + "px";
		buttn.style.left = (coords[0] * mod) + "px";
	}
}

function iconPos(index) {
	var y = Math.floor(index/4);
	var x = index%4;
	var yCoord = iconMarginTop + (y * (iconSize + iconVrtSpace));
	var xCoord = iconMarginSides + (x * (iconSize + iconHorSpace));
	if (x > 1) {
		xCoord += iconHorSpaceMiddleExtra;
	}
	if (y > 5) {
		yCoord += iconVrtBottomExtra;
	}
	return [xCoord, yCoord];
}

