interface Props {
  titulo: string;
  parrafo: string;
}

const Tarjeta = ({ titulo, parrafo }: Props ) => {
  return (
    <div>
      <h3>{titulo}</h3>
      <p>{parrafo}</p>
    </div>
  );
};

export default Tarjeta;
