const Mock = require('mockjs');
const getWorksWidgetList = require('./getWorksWidgetList');

const Random = Mock.Random;

module.exports = function getStatList(len = 10) {
	const worksWidgetList = getWorksWidgetList();

	const res = [];

	for (let i = 0; i < len; i++) {
		// 一个用户的答卷
		const stat = {
			_id: Random.id()
		};

		// 增加各个组件的 id value
		worksWidgetList.forEach((c) => {
			const { fe_id, widgetName, props } = c;

			switch (widgetName) {
				case 'InputWidge':
					stat[fe_id] = Random.ctitle();
					break;
				case 'TextareaWidget':
					stat[fe_id] = Random.ctitle();
					break;
				case 'RadioWidget':
					stat[fe_id] = props.options[0].text;
					break;
				case 'CheckboxWidget':
					stat[fe_id] = `${props.list[0].text},${props.list[1].text}`;
					break;
			}
		});

		res.push(stat);
	}

	return res;
};
