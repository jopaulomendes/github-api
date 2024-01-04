import './styles.css';

type Props = {
    nome: string;
    localidade: string;
    seguidores: string;
    perfilUrl: string;
    imgUrl: string;
}

const ResultCard = ({ nome, localidade, imgUrl, perfilUrl, seguidores }: Props) => {

    return (
        <div className="result-container">
            <div className="img-container"><img src={imgUrl} alt={nome} /> </div>
            <div className="result-info-container">
                <h3 className="result-title">Informações</h3>
                <p className="result-perfilurl"><span style={{ fontWeight: 'bold' }}>Perfil: </span>{perfilUrl}</p>
                <p className="result-seguidores"><span style={{ fontWeight: 'bold' }}>Seguidores: </span>{seguidores}</p>
                <p className="result-local"><span style={{ fontWeight: 'bold' }}>Localidade: </span>{localidade}</p>
                <p className="result-nome"><span style={{ fontWeight: 'bold' }}>Nome: </span>{nome}</p>
            </div>
        </div>
    );
}

export default ResultCard;