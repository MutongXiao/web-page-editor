import {
	InputWidget,
	TitleWidget,
	TextareaWidget,
	CheckboxWidget,
	RadioWidget,
	ParagraphWidget,
	InfoWidget
} from '@mutongxiao/editor-components';

import type {
	InfoWidgetProps,
	InfoWidgetConf,
	TitleWidgetProps,
	TitleWidgetConf,
	TextareaWidgetProps,
	TextareaWidgetConf,
	CheckboxWidgetProps,
	CheckboxWidgetConf,
	CheckboxWidgetStatProps,
	RadioWidgetProps,
	RadioWidgetConf,
	RadioWidgetStatProps,
	ParagraphWidgetProps,
	ParagraphWidgetConf,
	InputWidgetProps,
	InputWidgeConf
} from '@mutongxiao/editor-components';

// // 统一，各个组件的 prop type
export type EditorWidgetProps = InfoWidgetProps &
	TitleWidgetProps &
	TextareaWidgetProps &
	CheckboxWidgetProps &
	RadioWidgetProps &
	ParagraphWidgetProps &
	InputWidgetProps;

// // 统一，各个组件的统计属性类型
export type EditorWidgetStatProps = CheckboxWidgetStatProps &
	RadioWidgetStatProps;

// 全部的组件配置的列表
export const editorWidgetsMap = {
	[InfoWidget.widgetName]: InfoWidget,
	[TitleWidget.widgetName]: TitleWidget,
	[ParagraphWidget.widgetName]: ParagraphWidget,
	[InputWidget.widgetName]: InputWidget,
	[TextareaWidget.widgetName]: TextareaWidget,
	[RadioWidget.widgetName]: RadioWidget,
	[CheckboxWidget.widgetName]: CheckboxWidget
};

export type EditorWidgetConfType = TitleWidgetConf &
	TextareaWidgetConf &
	InfoWidgetConf &
	ParagraphWidgetConf &
	InputWidgeConf &
	CheckboxWidgetConf &
	RadioWidgetConf;
// 组件分组
export const editorWidgetGroup = [
	{
		groupId: 'textGroup',
		groupName: '文本显示',
		widgets: [
			TitleWidget,
			InfoWidget,
			ParagraphWidget
		] as EditorWidgetConfType[]
	},
	{
		groupId: 'inputGroup',
		groupName: '用户输入',
		widgets: [InputWidget, TextareaWidget] as EditorWidgetConfType[]
	},
	{
		groupId: 'chooseGroup',
		groupName: '用户选择',
		widgets: [CheckboxWidget, RadioWidget] as EditorWidgetConfType[]
	}
];

export function getEditorWidgetByName(widgetName: string) {
	const Widget = editorWidgetsMap[widgetName];
	return Widget as EditorWidgetConfType | undefined;
}
