renderFuncs['bg_ui'] = function() {
	if(!state.ui || !state.ui.bg_changed) return;
	displayManager.resetCanvas('bg_ui');
	var gfx = displayManager.gfxs['bg_ui'];
	state.ui.render_bg(gfx);

}
renderFuncs['m_ui'] = function() {
	if(!state.ui || !state.ui.m_changed) return;
	displayManager.resetCanvas('m_ui');
	var gfx = displayManager.gfxs['m_ui'];
	state.ui.render_m(gfx);

}
renderFuncs['p_ui'] = function() {
	if(!state.ui || !state.ui.p_changed) return;
	displayManager.resetCanvas('p_ui');
	var gfx = displayManager.gfxs['p_ui'];
	state.ui.render_p(gfx);
}
renderFuncs['top_ui'] = function() {
	if(!state.ui || !state.ui.top_changed) return;
	displayManager.resetCanvas('top_ui');
	var gfx = displayManager.gfxs['top_ui'];
	state.ui.render_top(gfx);
}