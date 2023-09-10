import Component, { checkboxWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

type InternalCheckboxWidgetType = typeof Component;
export type CheckboxWidgetConf = InternalCheckboxWidgetType & {
	title: string;
	widgetName: string;
	defaultProps: typeof checkboxWidgetDefaultProps;
	PropComponent: typeof PropComponent;
	StatComponent: typeof StatComponent;
};

const CheckboxWidget = Component as CheckboxWidgetConf;
CheckboxWidget.title = '多选';
CheckboxWidget.widgetName = 'CheckboxWidget';
CheckboxWidget.defaultProps = checkboxWidgetDefaultProps;
CheckboxWidget.PropComponent = PropComponent;
CheckboxWidget.StatComponent = StatComponent;

export * from './interface';

export default CheckboxWidget;
