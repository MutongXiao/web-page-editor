import Component, { titleWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';

type InternalTitleWidgetType = typeof Component;
type ComponentConf = InternalTitleWidgetType & {
	title: string;
	widgetName: string;
	defaultProps: typeof titleWidgetDefaultProps;
	PropComponent: typeof PropComponent;
};

const TitleWidget = Component as ComponentConf;
TitleWidget.title = '标题';
TitleWidget.widgetName = 'TITLE_WIDGET';
TitleWidget.defaultProps = titleWidgetDefaultProps;
TitleWidget.PropComponent = PropComponent;

export * from './interface';
// export type {
// };

// Title 组件的配置
export default TitleWidget;
