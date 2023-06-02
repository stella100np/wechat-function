import type { Handler, HandlerEvent, HandlerContext, HandlerCallback } from "@netlify/functions";
import axios from "axios";
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const { component_access_token, appid, js_code } = event.queryStringParameters
    // console.log("event.queryStringParameters",event.queryStringParameters)
    const domain = "https://api.weixin.qq.com/sns/component/jscode2session"
    const url = `${domain}?appid=${appid}&js_code=${js_code}&grant_type=authorization_code&component_appid=wxf4bdd6c7a6f01918&component_access_token=${component_access_token}`
    // console.log("链接：",url)
    const response = await axios.get(url)
    // console.log("响应：",response.data)
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
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
