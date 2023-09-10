import { useSelector } from 'react-redux';
import type { GlobalReduxStateType } from '../store';
import type { WorksWidgetsStateType } from '../store/worksWidgets';

function useGetLocalWorksWidgets() {
	const widgets = useSelector<GlobalReduxStateType>(
		(state) => state.worksWidgets.present
	) as WorksWidgetsStateType;

	const { widgetsList = [], selectedId, copiedWidget } = widgets;

	const selectedWidget = widgetsList.find((c) => c.fe_id === selectedId);

	return {
		widgetsList,
		selectedId,
		selectedWidget,
		copiedWidget
	};
}

export default useGetLocalWorksWidgets;
