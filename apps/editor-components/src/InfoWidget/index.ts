import Component, { infoWidgetDefaultProps } from './Component';
import PropComponent from './PropComponent';

type InternalInfoWidgeType = typeof Component;
type ComponentConf = InternalInfoWidgeType & {
	title: string;
	widgetName: string;
	defaultProps: typeof infoWidgetDefaultProps;
	PropComponent: typeof PropComponent;
};

const InfoWidge = Component as ComponentConf;
InfoWidge.title = '页面信息';
InfoWidge.widgetName = 'InfoWidge';
InfoWidge.defaultProps = infoWidgetDefaultProps;
InfoWidge.PropComponent = PropComponent;

export * from './interface';

export default InfoWidge;
