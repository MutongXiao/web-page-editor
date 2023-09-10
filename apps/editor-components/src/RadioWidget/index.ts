import Component, { radioWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

type InternalRadioWidgetType = typeof Component;
export type RadioWidgetConf = InternalRadioWidgetType & {
	title: string;
	widgetName: string;
	defaultProps: typeof radioWidgetDefaultProps;
	PropComponent: typeof PropComponent;
	StatComponent: typeof StatComponent;
};

const RadioWidget = Component as RadioWidgetConf;
RadioWidget.title = '单选';
RadioWidget.widgetName = 'RadioWidget';
RadioWidget.defaultProps = radioWidgetDefaultProps;
RadioWidget.PropComponent = PropComponent;
RadioWidget.StatComponent = StatComponent;

export * from './interface';

export default RadioWidget;
