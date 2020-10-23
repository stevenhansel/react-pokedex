import { HTTP_METHODS } from "../globals";
import { createApiRequest } from "./axios";

class ApiCallCreator {
  getPokemons(limit: number, offset: number) {
    return createApiRequest(
      `/pokemon?limit=${limit}&offset=${offset}`,
      HTTP_METHODS.GET,
      {}
    );
  }

  getPokemonById(id: number) {
    return createApiRequest(`/pokemon/${id}/`, HTTP_METHODS.GET, {});
  }

  getPokemonByName(name: string) {
    return createApiRequest(`/pokemon/${name}`, HTTP_METHODS.GET, {});
  }
}

const fromApi = new ApiCallCreator();
export default fromApi;
