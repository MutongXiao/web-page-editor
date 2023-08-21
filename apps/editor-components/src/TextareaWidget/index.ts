import Component, { textareaWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';

type InternalTextareaWidgettType = typeof Component;
type ComponentConf = InternalTextareaWidgettType & {
	title: string;
	widgetName: string;
	defaultProps: typeof textareaWidgetDefaultProps;
	PropComponent: typeof PropComponent;
};

const TextareaWidget = Component as ComponentConf;
TextareaWidget.title = '多行输入';
TextareaWidget.widgetName = 'TextareaWidget';
TextareaWidget.defaultProps = textareaWidgetDefaultProps;
TextareaWidget.PropComponent = PropComponent;

export * from './interface';

// Textarea 组件的配置
export default TextareaWidget;
