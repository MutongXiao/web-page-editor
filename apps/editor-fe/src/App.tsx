import React from 'react';
import {
	TitleWidget,
	TextareaWidget,
	RadioWidget,
	ParagraphWidget,
	CheckboxWidget,
	InfoWidge,
	InputWidget
} from '@mutongxiao/editor-components';
import styles from './app.module.less';

export default function App() {
	return (
		<>
			<TitleWidget />
			<TitleWidget.PropComponent />
			<div>
				---分割线 ParagraphWidget---
				<br />
			</div>
			<ParagraphWidget />
			<ParagraphWidget.PropComponent />
			<div>
				---分割线 InfoWidge---
				<br />
			</div>
			<InfoWidge />
			<InfoWidge.PropComponent />
			<div>
				---分割线 InputWidget---
				<br />
			</div>
			<InputWidget />
			<InputWidget.PropComponent />
			<div>
				---分割线 TextareaWidget---
				<br />
			</div>
			<TextareaWidget />
			<TextareaWidget.PropComponent />
			<div>
				---分割线 RadioWidget---
				<br />
			</div>
			<RadioWidget />
			<RadioWidget.PropComponent />
			<RadioWidget.StatComponent
				stat={[
					{ name: 'a', count: 12 },
					{ name: 'b', count: 24 }
				]}
			/>
			<div>
				---分割线 CheckboxWidget---
				<br />
			</div>
			<CheckboxWidget />
			<CheckboxWidget.PropComponent />
			<CheckboxWidget.StatComponent
				stat={[
					{ name: 'ccc', count: 34 },
					{ name: 'bbb', count: 47 }
				]}
			/>
			<div className={styles.modtitle}>TitleWidget.default.key</div>
			<h1 className="title">react-temp App hello world</h1>
			<h2 className="bg-red-500">react-temp App tailwindcss </h2>
		</>
	);
}
