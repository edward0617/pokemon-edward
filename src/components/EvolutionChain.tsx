import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./EvolutionChain.scss";

interface EvolutionImageItemProps {
  type: string | undefined;
  id: number;
}

interface EvolutionChainType {
  id: number;
  level: number;
  name: string;
}

interface EvolutionChainProps {
  evolution: EvolutionChainType[];
  type: string | undefined;
}

const EvolutionImageItem: React.FC<EvolutionImageItemProps> = ({
  type,
  id,
}) => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const handleOnLoad = () => {
    setIsLoad(true);
  };

  return (
    <div className={`evolution-chain-image-container type-${type}`}>
      <img
        className="evolution-chain-image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
        onLoad={handleOnLoad}
        alt={`Pokemon ${id}`}
      />
    </div>
  );
};

const EvolutionChain: React.FC<EvolutionChainProps> = ({ evolution, type }) => {
  return (
    <div className={`evolution-chain-container type-${type}`}>
      <p className="evolution-chain-title">Evolution List</p>
      <div className="evolution-chain-content">
        {evolution.map((item) => (
          <Link to={`/details/${item.id}`} key={`evolution-${item.id}`}>
            <div className="evolution-chain-item">
              <EvolutionImageItem type={type} id={item.id} />
              <p className="evolution-chain-item-text">
                {item.name.toUpperCase()}
              </p>
              <p className="evolution-chain-item-text">
                Evolution: {item.level + 1}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
