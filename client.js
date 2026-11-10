window.__ModuleLoader__.load({
  id: 'dsh-hide-new-session',
  factory() {
    const NAME = 'dsh-hide-new-session';
    const STYLE_ID = NAME + '/hide-new-session.css';

    /*
     * The sidebar shell (`@deepseek-ai/dsh-client-ui-sidebar`) hard-codes the
     * full-width New Session button and exposes no slot for it:
     *
     *   <button class="hHd-Xa_newSession" aria-label="新建会话">
     *
     * The `hHd-Xa_` prefix is a per-build CSS-module hash, but the local name
     * `newSession` is stable while the source keeps that class, so match on the
     * class substring instead of the hashed prefix or the localized aria-label
     * (the brand row button carries the same aria-label).
     *
     * `display:none` removes the box and its 10px bottom margin, so the panel
     * list moves up with no leftover gap; `!important` because stylesheet order
     * is not ours to control.
     */
    const CSS = 'button[class*="newSession"]{display:none !important}';

    function apply(ctx) {
      const style = document.createElement('style');
      style.dataset.plugin = NAME;
      style.dataset.pluginCss = STYLE_ID;
      style.textContent = CSS;
      document.head.appendChild(style);

      ctx.effect(() => () => style.remove(), NAME + ': hide the sidebar New Session button');
    }

    return { name: NAME, apply };
  },
});
