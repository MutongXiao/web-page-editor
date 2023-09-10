import Component, { titleWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';

type InternalTitleWidgetType = typeof Component;
export type TitleWidgetConf = InternalTitleWidgetType & {
	title: string;
	widgetName: string;
	defaultProps: typeof titleWidgetDefaultProps;
	PropComponent: typeof PropComponent;
};

const TitleWidget = Component as TitleWidgetConf;
TitleWidget.title = '标题';
TitleWidget.widgetName = 'TitleWidget';
TitleWidget.defaultProps = titleWidgetDefaultProps;
TitleWidget.PropComponent = PropComponent;

export * from './interface';

// Title 组件的配置
export default TitleWidget;
