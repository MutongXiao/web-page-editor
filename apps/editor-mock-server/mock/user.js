const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = [
	{
		// 获取用户信息
		url: '/api/user/info',
		method: 'get',
		response() {
			return {
				errno: 0,
				data: {
					username: Random.cname(),
					nickname: Random.title(1, 2),
					routerPermissions: [
						'/manage',
						'/manage/list',
						'/manage/star',
						'/manage/trash',
						'/workspace'
					]
				}

				// errno: 100,
				// msg: '无效的用户令牌'
			};
		}
	},
	{
		// 注册
		url: '/api/user/register',
		method: 'post',
		response() {
			return {
				errno: 0,
				msg: '注册成功'
			};
		}
	},
	{
		// 登录
		url: '/api/user/login',
		method: 'post',
		response() {
			return {
				errno: 0,
				data: {
					token: Random.word(20),
					username: Random.cname(),
					nickname: Random.title(1, 2),
					routerPermissions: [
						'/manage',
						'/manage/list',
						'/manage/star',
						'/manage/trash',
						'/workspace'
					]
				}
			};
		}
	}
];
