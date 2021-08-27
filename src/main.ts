import "@logseq/libs";
import "virtual:windi-base.css";
import "virtual:windi-components.css";

import "virtual:windi-utilities.css";
import "virtual:windi-devtools";

import { createApp } from 'vue'

import App from './App.vue';

import { logseq as PL } from "../package.json";

// @ts-expect-error
const css = (t, ...args) => String.raw(t, ...args);
const magicKey = `__${PL.id}__loaded__`;

function main() {
  const pluginId = logseq.baseInfo.id;
  console.info(`#${pluginId}: MAIN`);
  
  createApp(App).mount('#app');

  function createModel() {
    return {
      show() {
        logseq.showMainUI();
      },
    };
  }

  logseq.provideModel(createModel());
  logseq.setMainUIInlineStyle({
    zIndex: 11,
  });

  const openIconName = "template-plugin-open";

  // @ts-expect-error
  top[magicKey] = true;

  logseq.provideStyle(css`
    div[data-injected-ui=${openIconName}-${pluginId}] {
      display: inline-flex;
      align-items: center;
      opacity: 0.55;
      font-weight: 500;
      padding: 0 5px;
      position: relative;
    }

    div[data-injected-ui=${openIconName}-${pluginId}]:hover {
      opacity: 0.9;
    }
  `);

  logseq.provideUI({
    key: openIconName,
    path: "#search",
    template: `
      <a data-on-click="show"
         style="opacity: .6; display: inline-flex;">⚙️</a>
    `,
  });
}

// @ts-expect-error
if (top[magicKey]) {
  top.location.reload();
}

logseq.ready(main).catch(console.error);
