import Component, { inputWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';

type InternalInputWidgetType = typeof Component;
export type InputWidgeConf = InternalInputWidgetType & {
	title: string;
	widgetName: string;
	defaultProps: typeof inputWidgetDefaultProps;
	PropComponent: typeof PropComponent;
};

const InputWidget = Component as InputWidgeConf;
InputWidget.title = '单行输入';
InputWidget.widgetName = 'InputWidget';
InputWidget.defaultProps = inputWidgetDefaultProps;
InputWidget.PropComponent = PropComponent;

export * from './interface';

// Input 组件的配置
export default InputWidget;
