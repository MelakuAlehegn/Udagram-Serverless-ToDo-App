import 'source-map-support/register'
import { createLogger } from "../../utils/logger";
import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {CreateTodoRequest} from '../../requests/CreateTodoRequest';
import {createToDo} from "../../businessLogic/ToDo";
import { getUserId } from '../utils';
const logger = createLogger('TodosAccess')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Implement creating a new TODO item
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const userId =getUserId(event);
    logger.info(userId);
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const toDoItem = await createToDo(newTodo, jwtToken);
    logger.info(JSON.stringify({"item": toDoItem}));
    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": toDoItem
        }),
    }
};
