import { hashHistory  } from 'react-router';
import { routerMiddleware } from 'react-router-redux'

export const baseHistory = hashHistory;
export const routingMiddleware = routerMiddleware(baseHistory);