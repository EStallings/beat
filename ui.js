renderFuncs['bg_ui'] = function() {
	if(!state.ui || !state.ui.bg_changed) return;
	var surface = displayManager.surfaces['bg_ui'];
	surface.reset();
	state.ui.render_bg(surface.gfx);

}
renderFuncs['m_ui'] = function() {
	if(!state.ui || !state.ui.m_changed) return;
	var surface = displayManager.surfaces['m_ui'];
	surface.reset();
	state.ui.render_m(surface.gfx);

}
renderFuncs['p_ui'] = function() {
	if(!state.ui || !state.ui.p_changed) return;
	var surface = displayManager.surfaces['p_ui'];
	surface.reset();
	state.ui.render_p(surface.gfx);
}
renderFuncs['top_ui'] = function() {
	if(!state.ui || !state.ui.top_changed) return;
	var surface = displayManager.surfaces['top_ui'];
	surface.reset();
	state.ui.render_top(surface.gfx);
}