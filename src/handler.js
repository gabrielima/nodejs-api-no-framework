import { parse } from "node:url";
import { DEFAULT_HEADER } from "./utils/util.js";

const routes = {
  "/teste:get": async (req, res) => {
    res.write("GET");
    res.end();
  },
  default: async (req, res) => {
    res.writeHead(404, DEFAULT_HEADER);
    res.write("Ooops");
    res.end();
  },
};

function handler(req, res) {
  const { url, method } = req;
  const { pathname } = parse(url, true);

  const key = `${pathname}:${method.toLowerCase()}`;
  const chosen = routes[key] || routes.default;

  return Promise.resolve(chosen(req, res)).catch(handleError(res));
}

function handleError(res) {
  return (error) => {
    console.error("Error: ", error.stack);
    res.writeHead(500, DEFAULT_HEADER);
    res.write(
      JSON.stringify({
        error: error.stack,
      })
    );
    return res.end();
  };
}

export default handler;
