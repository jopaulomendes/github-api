import { useState } from 'react';
import './styles.css';

import ResultCard from 'components/ResultCard';
import axios from 'axios';
import InputMask from "react-input-mask";

type FormData = {
  cep: string;
}

type Address = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ddd: string;
}

const CepSearch = () => {

  const [address, setAddress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    cep: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`)
      .then((response) => {
        setAddress(response.data);
        setFormData({
          cep: ''
        })
        console.log(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      });
  }

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <InputMask
              mask="99999-999"
              type="text"
              name='cep'
              value={formData.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>

        {address &&
          <>
            <ResultCard title="CEP" description={address.cep} />
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Complemento" description={address.complemento} />
            <ResultCard title="Bairro" description={address.bairro} />
            <ResultCard title="Localidade" description={address.localidade} />
            <ResultCard title="Estado" description={address.uf} />
            <ResultCard title="Código de área" description={address.ddd} />
          </>
        }

      </div>
    </div>
  );
};

export default CepSearch;
