body = document.querySelector("body")
panel = document.querySelector("#panel")
textarea = document.querySelector("#txt")
rendered = document.querySelector("#rendered")

//==================//
// SAVING/RESTORING //
// THE TEXT         //
//==================//

function restore_txt() {
	textarea.value = localStorage.getItem("txt")
}

function restore_color_mode() {
	color_mode = localStorage.getItem("color_mode") || "dark"
	toggle_color()
	toggle_color()
}

//========//
// COLORS //
//========//

colors_dark = {
	"txt_fg": "#ced3d3",
	"txt_bg": "#262522",
	"body_fg": "#ffffff",
	"body_bg": "#000000"
}

colors_light = {
	"txt_fg": "#0F1010",
	"txt_bg": "#E9E9E7",
	"body_fg": "#000000",
	"body_bg": "#ffffff"
}

root = document.querySelector(':root')

function toggle_color() {
	color_mode = color_mode === "light" ? "dark" : "light"
	let colors = window["colors_" + color_mode]
	for (let prop in colors) root.style.setProperty("--"+prop, colors[prop])
	document.querySelector("#color_switch").innerHTML = color_mode === "light" ? "🌚" : "🌞"
}

//==========//
// MARKDOWN //
//==========//

function toggle_view() {
	rendered.innerHTML = marked.parse(textarea.value)
	old_view = view === "textarea" ? textarea : rendered 
	new_view = view === "textarea" ? rendered : textarea
	body.insertBefore(new_view, panel)
	old_view.remove()
	
	view = view === "textarea" ? "rendered" : "textarea"
	
	document.querySelector("#view_switch").innerHTML = view === "textarea" ? "✨" : "📜"
}

//==============//
// INITIALIZING //
//==============//

view = "textarea"
restore_txt()
restore_color_mode()

window.onbeforeunload = function() {
	localStorage.setItem("txt", textarea.value)
	localStorage.setItem("color_mode", color_mode)
}

rendered.remove(rendered)
