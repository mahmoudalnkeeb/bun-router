// Middleware type definition
interface UpdatebleRequest extends Request {
  data?: any;
}
type Mw = (req: UpdatebleRequest) => Response | Promise<Response> | void;

interface IRoute {
  path: string; // The URL path for the route
  handler: (req: UpdatebleRequest) => Response | Promise<Response>; // The handler function for the route
  middlewares: Mw[]; // Array of middleware functions to apply to the route
}

interface IRouter {
  readonly Req: UpdatebleRequest;
  Get: (routes: IRoute[]) => void;
  Post: (routes: IRoute[]) => void;
  Put: (routes: IRoute[]) => void;
  Delete: (routes: IRoute[]) => void;
}

// Router class implementation
class Router implements IRouter {
  public readonly Req: UpdatebleRequest; // The current request

  constructor(req: UpdatebleRequest) {
    this.Req = req; // Initialize the request
  }

  // Apply middleware functions to the request
  private applyMiddlewares(middlewares: Mw[]): Response | Promise<Response> | void {
    for (const middleware of middlewares) {
      const result = middleware(this.Req);
      if (result instanceof Response) {
        return result; // Return the response if middleware returns it
      }
    }
  }

  // Match the request with the appropriate route depending on the path
  private matchRoute(routes: IRoute[]): Response | Promise<Response> | void {
    const url = new URL(this.Req.url).pathname;
    const route = routes.find((r) => {
      // Regex to match only /path or /path/ not sure if it work as intended LMAO i'm dump in regex
      const regex = new RegExp(`^${r.path.replace(/\/$/, '')}(\/)?$`);
      return regex.test(url);
    });
    if (route) {
      const middlewareResult = this.applyMiddlewares(route.middlewares);
      if (middlewareResult) {
        return middlewareResult;
      }
      return route.handler(this.Req);
    }
  }

  // Handle GET requests
  Get(routes: IRoute[]) {
    if (this.Req.method === 'GET') {
      return this.matchRoute(routes);
    }
  }

  // Handle POST requests
  Post(routes: IRoute[]) {
    if (this.Req.method === 'POST') {
      return this.matchRoute(routes);
    }
  }

  // Handle PUT requests
  Put(routes: IRoute[]) {
    if (this.Req.method === 'PUT') {
      return this.matchRoute(routes);
    }
  }

  // Handle DELETE requests
  Delete(routes: IRoute[]) {
    if (this.Req.method === 'DELETE') {
      return this.matchRoute(routes);
    }
  }
}

// Example middleware for logging requests
const authorize: Mw = (req: UpdatebleRequest) => {
  // authorization logic here
  // .....
  // if authorized update req.data with the needed information
  req.data = {
    userId: 'id',
  };
};

const logger: Mw = (req: UpdatebleRequest) => {
  console.log(`Logger: ${req.method} request to ${new URL(req.url).pathname}`);
};

// Example middleware for protecting routes
const protect: Mw = (req: UpdatebleRequest) => new Response('Unauthorized', { status: 401 });

// Example route definitions
const getRoutes: IRoute[] = [
  {
    path: '/hello', // Route path
    handler: (req: UpdatebleRequest) => new Response('Hello World!'),
    middlewares: [logger],
  },
  {
    path: '/profile', // Require authorization route
    handler: (req: UpdatebleRequest) => Response.json(req.data, { status: 200 }),
    middlewares: [logger, authorize],
  },
  {
    path: '/protected', // Protected route path
    handler: (req: UpdatebleRequest) => new Response('This is protected'),
    middlewares: [logger, protect],
  },
];

// Start the Bun server
Bun.serve({
  fetch(req: UpdatebleRequest) {
    const updatebleReq: UpdatebleRequest = Object.assign(req, { data: {} });
    const router = new Router(updatebleReq); // Create a new router instance
    return router.Get(getRoutes) || new Response('Not Found', { status: 404 });
  },
  port: 3000,
});

console.log('Bun server is running on http://localhost:3000');
