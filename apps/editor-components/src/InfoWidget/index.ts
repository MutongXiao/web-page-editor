import Component, { infoWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';

type InternalInfoWidgeType = typeof Component;
export type InfoWidgetConf = InternalInfoWidgeType & {
	title: string;
	widgetName: string;
	defaultProps: typeof infoWidgetDefaultProps;
	PropComponent: typeof PropComponent;
};

const InfoWidget = Component as InfoWidgetConf;
InfoWidget.title = '页面信息';
InfoWidget.widgetName = 'InfoWidget';
InfoWidget.defaultProps = infoWidgetDefaultProps;
InfoWidget.PropComponent = PropComponent;

export * from './interface';

export default InfoWidget;
