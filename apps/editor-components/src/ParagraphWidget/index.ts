import Component, { paragraphWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';

type InternalParagraphWidgetType = typeof Component;
type ComponentConf = InternalParagraphWidgetType & {
	title: string;
	widgetName: string;
	defaultProps: typeof paragraphWidgetDefaultProps;
	PropComponent: typeof PropComponent;
};

const ParagraphWidget = Component as ComponentConf;
ParagraphWidget.title = '段落';
ParagraphWidget.widgetName = 'ParagraphWidget';
ParagraphWidget.defaultProps = paragraphWidgetDefaultProps;
ParagraphWidget.PropComponent = PropComponent;

export * from './interface';

// Paragraph 组件的配置
export default ParagraphWidget;
