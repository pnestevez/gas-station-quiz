export type HomeProps = {
  findStartingGasStation: (
    fuelDispenser: number[],
    fuelCost: number[]
  ) => number;
};

const Home = ({ findStartingGasStation }: HomeProps): JSX.Element => {
  return <div></div>;
};

export default Home;
