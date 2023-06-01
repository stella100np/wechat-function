import type { Handler, HandlerEvent, HandlerContext, HandlerCallback } from "@netlify/functions";
import axios from "axios";
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const { component_access_token, appid, js_code } = event.queryStringParameters
    const response = await axios.get(`https://api.weixin.qq.com/sns/component/jscode2session?appid=${appid}&js_code=${js_code}&grant_type=authorization_code&component_appid=${process.env.WECHAT_COMPONENT_APPID}&component_access_token=${component_access_token}`)
    return {
      statusCode: 200,
      body: JSON.stringify({ openid: response.data.openid })
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Error' })
    }
  }
};

export { handler };
