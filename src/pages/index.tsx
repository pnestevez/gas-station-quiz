import Home from "@/ui/Home";

const HomeContainer = (): JSX.Element => {
  const findStartingGasStation = (
    fuelDispenser: number[],
    fuelCost: number[]
  ): number => {
    let startingIndex = 0;
    let fuelTank = 0;

    const tankBalance = fuelDispenser.reduce((balance, fuel, i) => {
      const dif = fuel - fuelCost[i];
      fuelTank += dif;

      if (fuelTank < 0) {
        startingIndex = i + 1;
        fuelTank = 0;
      }

      return balance + dif;
    }, fuelTank);

    return tankBalance < 0 ? -1 : startingIndex;
  };

  const validateFields = (
    fuelDispenser: number[],
    fuelCost: number[]
  ): boolean => fuelDispenser.length === fuelCost.length;

  return <Home {...{ findStartingGasStation, validateFields }} />;
};

export default HomeContainer;
