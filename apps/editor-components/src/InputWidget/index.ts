import Component, { inputWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';

type InternalInputWidgetType = typeof Component;
type ComponentConf = InternalInputWidgetType & {
	title: string;
	widgetName: string;
	defaultProps: typeof inputWidgetDefaultProps;
	PropComponent: typeof PropComponent;
};

const InputWidge = Component as ComponentConf;
InputWidge.title = '单行输入';
InputWidge.widgetName = 'InputWidge';
InputWidge.defaultProps = inputWidgetDefaultProps;
InputWidge.PropComponent = PropComponent;

export * from './interface';

// Input 组件的配置
export default InputWidge;
