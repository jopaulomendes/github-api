import { useState } from 'react';
import './styles.css';

import ResultCard from 'components/ResultCard';
import axios from 'axios';

type FormData = {
  github: string;
}

type Address = {
  url: string;
  followers: string;
  location: string;
  name: string;
  avatar_url: string;
}

const GithubSearch = () => {

  const [address, setAddress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    github: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.get(`https://api.github.com/users/${formData.github}`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
  }

  return (
    <div className="container search-container">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <h2>Encontre um perfil Github</h2>
          <input
            type="text"
            name="github"
            value={formData.github}
            className="search-input"
            placeholder="Usuário Github"
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary search-button">
            Encontrar
          </button>
        </div>
      </form>
      {address &&
        <ResultCard
          nome={address.name}
          seguidores={address.followers}
          imgUrl={address.avatar_url}
          perfilUrl={address.url}
          localidade={address.location} />
      }
    </div>
  );
};

export default GithubSearch;
