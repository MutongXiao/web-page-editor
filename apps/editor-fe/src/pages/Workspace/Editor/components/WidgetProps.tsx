import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import useGetLocalWorksWidgets from '@/hooks/useGetLocalWorksWidgets';
import {
	getEditorWidgetByName,
	type EditorWidgetProps
} from '@/utils/getEditorWidgets';
import { changeWidgetProps } from '@/store/worksWidgets';

const NoProp: FC = () => {
	return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const WidgetProps: FC = () => {
	const dispatch = useDispatch();

	const { selectedWidget } = useGetLocalWorksWidgets();
	if (selectedWidget == null) return <NoProp />;

	const { widgetName, props, isLocked, isHidden } = selectedWidget;
	const widgettConf = getEditorWidgetByName(widgetName);
	if (widgettConf == null) return <NoProp />;

	function changeProps(newProps: EditorWidgetProps) {
		if (selectedWidget == null) return;
		const { fe_id } = selectedWidget;
		dispatch(changeWidgetProps({ fe_id, newProps }));
	}

	const { PropComponent } = widgettConf;
	return (
		<PropComponent
			{...props}
			onChange={changeProps}
			disabled={isLocked || isHidden}
		/>
	);
};

export default WidgetProps;
