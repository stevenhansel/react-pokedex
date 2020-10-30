import React from "react";

import Modal from "./Modal";
import PokemonGenerationCard from "./PokemonGenerationCard";
import PokemonIcon from "./PokemonIcon";

/** Generation 1 */
import BulbasaurImage from "../assets/pokemons/bulbasaur.png";
import CharmanderImage from "../assets/pokemons/charmander.png";
import SquirtleImage from "../assets/pokemons/squirtle.png";

/** Generation 2 */
import ChikoritaImage from "../assets/pokemons/chikorita.png";
import CyndaquilImage from "../assets/pokemons/cyndaquil.png";
import TotodileImage from "../assets/pokemons/totodile.png";

/** Generation 3 */
import TreeckoImage from "../assets/pokemons/treecko.png";
import TorchicImage from "../assets/pokemons/torchic.png";
import MudkipImage from "../assets/pokemons/mudkip.png";

/** Generation 4 */
import TurtwigImage from "../assets/pokemons/turtwig.png";
import ChimcarImage from "../assets/pokemons/chimcar.png";
import PiplupImage from "../assets/pokemons/piplup.png";

/** Generation 5 */
import SnivyImage from "../assets/pokemons/snivy.png";
import TepigImage from "../assets/pokemons/tepig.png";
import OshawottImage from "../assets/pokemons/oshawott.png";

/** Generation 6 */
import ChespinImage from "../assets/pokemons/chespin.png";
import FennekinImage from "../assets/pokemons/fennekin.png";
import FroakieImage from "../assets/pokemons/froakie.png";

/** Generation 7 */
import RowletImage from "../assets/pokemons/rowlet.png";
import LittenImage from "../assets/pokemons/litten.png";
import PopplioImage from "../assets/pokemons/popplio.png";

const generations = [
  [BulbasaurImage, CharmanderImage, SquirtleImage],
  [ChikoritaImage, CyndaquilImage, TotodileImage],
  [TreeckoImage, TorchicImage, MudkipImage],
  [TurtwigImage, ChimcarImage, PiplupImage],
  [SnivyImage, TepigImage, OshawottImage],
  [ChespinImage, FennekinImage, FroakieImage],
  [RowletImage, LittenImage, PopplioImage],
];

const PokemonGenerations = () => {
  return (
    <div>
      <Modal>
        <Modal.Button className="bg-primaryGray px-4 py-1 rounded-lg text-white hover:border-transparent focus:outline-none transform hover:-translate-y-1 hover:shadow transition-all duration-200 ease-in-out">
          <div className="flex justify-between">
            <PokemonIcon src={BulbasaurImage} alt="Bulbasaur" />
            <PokemonIcon src={CharmanderImage} alt="Charmander" />
            <PokemonIcon src={SquirtleImage} alt="Squirtle" />
          </div>
        </Modal.Button>
        <Modal.Content>
          <div className="mx-auto py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-6">
            {generations.map((images, index) => (
              <PokemonGenerationCard
                key={`generations-${index}`}
                images={images}
                generation={index + 1}
              />
            ))}
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};
export default PokemonGenerations;
