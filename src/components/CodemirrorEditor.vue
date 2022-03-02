<template>
	<textarea id="editor" placeholder="开始你的书写"></textarea>
</template>
<script lang="ts" setup>
import { onMounted } from "vue"

let HyperMD = require("hypermd")

// hypermd 模块会引入 codemirror 和一堆 css 文件


// 如果需要为特殊元素添加语法高亮，请载入对应的模式
require("codemirror/mode/htmlmixed/htmlmixed") // Markdown 内嵌HTML
require("codemirror/mode/stex/stex") // TeX 数学公式
require("codemirror/mode/yaml/yaml") // Front Matter

// 如果需要用第三方库增强 HyperMD 功能，请载入所需的 PowerPacks
require("hypermd/powerpack/fold-math-with-katex") // 将会自动引入 "katex"
require("hypermd/powerpack/hover-with-marked") // 将会自动引入 "marked"
// 你还可以再此添加其他 power packs...
// Power packs 需要第三方库，别忘记安装它们！
require("codemirror/theme/darcula.css");

require('codemirror/mode/clike/clike.js')
require('codemirror/mode/markdown/markdown.js')
require('codemirror/addon/edit/continuelist.js')
require('codemirror/addon/selection/active-line.js')
//滚动条
require('codemirror/addon/scroll/simplescrollbars.js')
require('codemirror/addon/scroll/simplescrollbars.css')

// 
let option = {
	/* 在此添加其他编辑器选项 */
	theme: 'hypermd-light',
	hmdModeLoader: true,
	highlightFormatting: true,
	// 高亮行功能
	styleActiveLine: true,

	//滚动条""
	// scrollbarStyle:'native'
}
onMounted(() => {
	let editor = document.getElementById("editor");
	let cm = HyperMD.fromTextArea(editor, option)

	HyperMD.switchToHyperMD(cm, option)
	// init_toc(cm)
})
function init_toc(cm) {
	var $toc = document.getElementById('toc')
	var lastTOC = ""

	var update = HyperMD.debounce(function () {
		var newTOC = ""
		cm.eachLine(function (line) {
			var tmp = /^(#+)\s+(.+)(?:\s+\1)?$/.exec(line.text)
			if (!tmp) return
			var lineNo = line.lineNo()
			if (!cm.getStateAfter(lineNo).header) return // double check but is not header
			var level = tmp[1].length

			var title = tmp[2]
			title = title.replace(/([*_]{1,2}|~~|`+)(.+?)\1/g, '$2') // em / bold / del / code
			title = title.replace(/\\(?=.)|\[\^.+?\]|\!\[((?:[^\\\]]+|\\.)+)\](\(.+?\)| ?\[.+?\])?/g, '') // images / escaping slashes / footref
			title = title.replace(/\[((?:[^\\\]]+|\\.)+)\](\(.+?\)| ?\[.+?\])/g, '$1') // links
			title = title.replace(/&/g, '&amp;')
			title = title.replace(/</g, '&lt;')
			newTOC += '<div data-line="' + lineNo + '" class="toc-item" style="padding-left:' + level + 'em">' + title + '</div>'
		})
		if (newTOC == lastTOC) return
		//@ts-ignore
		$toc.innerHTML = lastTOC = newTOC
	}, 300)

	cm.on('changes', update)
	//@ts-ignore
	$toc.addEventListener('click', function (ev) {
		var t = ev.target
		//@ts-ignore
		if (!/toc-item/.test(t.className)) return
		//@ts-ignore
		var lineNo = ~~t.getAttribute('data-line')
		cm.setCursor({ line: cm.lastLine(), ch: 0 })
		setTimeout(function () {
			cm.setCursor({ line: lineNo, ch: 0 })
		}, 10)
	}, true)
}
</script>

<style lang="scss">
.CodeMirror {
	font-family: "Fira Code", Consolas, Menlo, Monaco, "Lucida Console",
		"Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono",
		"Courier New", monospace, serif !important;
	height: 100% !important;

	
}

.editor-tool {
	line-height: 30px;
	widows: 100%;
	background-color: #0f0;
}
</style>