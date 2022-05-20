import { createParamDecorator } from '@nestjs/common';
// Used to retrive current logged in user from the request context
export const CurrentUser = createParamDecorator((data, req) => req.user);
